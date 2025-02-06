require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const User = require('../models/User');

const router = express.Router();


// --- [ SIGN UP ROUTE ] ---
router.post('/signup', async (req, res) => {
    try{

        const { username, firstname, lastname, password } = req.body;
        const userExists = await User.findOne({ username });

        if(userExists) {
            return res.status(400).json({ error: '-- USERNAME IN USE --' });
        }

        // --- hashing password ---
        const hashPass = await bcrypt.hash(password, 10);
        const newUser = new User ({ username, firstname, lastname, password: hashPass });

        await newUser.save();
        res.status(201).json({ message: ' -- REGISTERED NEW USER --' });

    }catch (err) {
        console.error("--- [ SIGN UP ERROR ] ---");
        res.status(500).json({ error: '--- [ SERVER ERROR ]: ', err });

    }
});

// --- [ LOGIN ROUTE ] ---
router.post('/login', async(req, res) => {
    try{

        const { username, password } = req.body;

        // -- finding user in MongoDB --
        const user = await User.findOne({ username });
        if(!user) {
            res.status(400).json({ error: ' -- USER DOESNT EXIST --' });
        }

        //-- checking password --
        const passwordMatched = await bcrypt.compare(password, user.password);
        if(!passwordMatched) {
            res.status(400).json({ error: '-- PASSWORD IS INVALID --' });
        }

        // -- JWT --
        if(!process.env.JWT_SECRET){
            return res.status(500).json({ error: "--- [ SERVER ERROR ]: JWT_SECRET MISSING "});
        }

        // --- generating token ---
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h' });
        res.json({ token, username: user.username });
    }catch (err) {
        res.status(500).json({ error: '--- [ SERVER ERROR ]: ', details: err.message});
    }
});

module.exports = router;