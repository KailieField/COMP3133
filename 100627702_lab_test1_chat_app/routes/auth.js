const express = require('express');
const bcrypt = require('bcryptjs');
const webToken = require('jsonwebtoken')

const User = require('../models/User');

const router = express.Router();

router.post('/signup', async(req, res) => {

    const { username, firstname, lastname, password } = req.body;
    const hashPass = await bcrypt.hash(password, 10);

    try{

        const newUser = new User({ username, firstname, lastname, password: hashPass });
            await newUser.save();
            res.status(201).json({ message: '--- Registered ---'});
        
    }catch (err) {

        res.status(400),json({ error: err.message });
    }
});

router.post('/login', async(req, res) => {

    const { username, password } = req.body;

    const user = await User.findOne({username});
    if(!user) return res.status(400).json({ error: 'User Not Found or Doesnt Exist'});

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

    const token = webToken.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, username: user.username });
});

module.exports = router;