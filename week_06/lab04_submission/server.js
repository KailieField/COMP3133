require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const User = require('./models/User')

const app = express()

app.use(bodyparser.json())

const PORT = process.env.PORT || 8081
const DB_CONNECT = process.env.DB_CONNECT || 8081

mongoose.connect(DB_CONNECT).then(() => {

    console.log(`--- CONNECTED TO MONGODB ---`)

})
.catch((error) => {

    console.error('--- FAILURE CONNECTING TO MONGODV: ', error.message)

})

app.post('/users', async (req, res) => {

    try {

        const user =new User(req.body);
        await user.save()
        res.status(201).json({ message: 'USER ADDED TO DATABASE', user })

    } catch (error) {

        res.status(400).json({ error: error.message })

    }
});

app.listen(PORT, () => console.log(` SERVER RUNNIG ON ${PORT}: http://localhost:8081` ));