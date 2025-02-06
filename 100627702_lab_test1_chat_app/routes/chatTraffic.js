const express = require('express');
const GroupMessage = require('../models/GroupMessage');
const PrivateMessage = require('../models/PrivateMessage');

const router = express.Router();

// --- [ POST GROUP MESSAGE ] --
router.post('/group/:room', async (req, res) => {
    try{
        const { from_user, message } = req.body;
        const room = req.params.room;

        if(!from_user || !message ) {
            return res.status(400).json({ error: '-- missing required fields --' });
        }

        // --- saving message to DB ---
        const newMessage = new GroupMessage({

            from_user,
            room,
            message

        });

        await newMessage.save();
        res.status(201).json({ message: 'sent', newMessage });

    }catch (err) {

        res.status(500).json({ error: '--- [ SERVER ERROR]: ', details: err.message });
    }
});

// --- [ POST PRIVATE MESSAGE ] --
router.post('/private', async (req, res) => {
    try{

        const { from_user, to_user, message } = req.body;
        

        if(!from_user || !to_user || !message) {
            return res.status(400).json({ error: '--- missing required fields ---' });
        }
        

        // --- saving message to DB ---
        const newMessage = new PrivateMessage({

            from_user,
            to_user,
            message

        });

        await newMessage.save();
        res.status(201).json({ message: 'sent', newMessage });

    }catch (err) {

        res.status(500).json({ error: '--- [ SERVER ERROR]: ', details: err.message });
    }
        
});

// --- [ GET GROUP MESSAGE ] --
router.get('/group/:room', async(req, res)=> {
    try{
        const messages = await GroupMessage.find({ room: req.params.room }).sort({ date_sent: 1 });
        res.json(messages);

    } catch (err) {
        res.status(500).json({ error: '--- [ SERVER ERROR] ---' });
    }
});

// --- [ GET:  PRIVATE MESSAGE ] --
router.get('/private/:from_user/:to_user', async (req, res) => {
    try{
        const messages = await PrivateMessage.find({

            $or: [

                {from_user: req.params.from_user, to_user: req.params.to_user},
                {from_user: req.params.from_user, to_user: req.params.from_user}
            ]

        }).sort({ date_sent: 1 });

        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: '--- [ SERVER ERROR] ---' });
    }
});

module.exports = router;