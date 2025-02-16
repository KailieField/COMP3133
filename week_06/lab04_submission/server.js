require('dotenv').config()
const fs = require('fs')
const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const User = require('./models/User')

const app = express()


app.use(bodyParser.json())

const PORT = process.env.PORT || 8081
const DB_CONNECT = process.env.DB_CONNECT

mongoose.connect(DB_CONNECT)
.then(() => console.log('MONGODB CONNECTED'))
.catch(error => console.error('CONNECTION ERROR: ', error.message))

// --- POST API

app.post('/users', async(req, res) => {

    try {

        const userData = JSON.parse(fs.readFileSync('UserData.json', 'utf-8' ))
        const users = await User.insertMany(userData, { ordered: false })
        res.status(201).json({ message: 'USERS COLLECTED LOADED', users })

    }catch (error) {

        res.status(400).json({ error: error.message })
    }
});

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON: http://localhost: ${PORT}`)
});