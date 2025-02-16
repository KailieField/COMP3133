require('dotenv').config()
const fs = require('fs')
const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/User')

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 8081
const DB_CONNECT = process.env.DB_CONNECT

mongoose.connect(DB_CONNECT)
.then(() => console.log('MONGODB CONNECTED'))
.catch(error => console.error('CONNECTION ERROR: ', error.message))

// --- POST API

app.post('/users', async(req, res) => {

    console.log('Incoming Body: ', req.body)

    try {

        const user = new User(req.body)
        await user.save()
        res.status(201).json({ message: 'USER ADDED TO DB', user })

    }catch (error) {

        console.error('VALIDATION ERROR: ', error.message)
        res.status(400).json({ error: error.message })

    }
});

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON: http://localhost: ${PORT}`)
});