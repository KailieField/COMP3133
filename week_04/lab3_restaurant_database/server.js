require('dotenv').config();
const cors = require("cors");
const express = require('express');
const mongoose = require('mongoose');
const restaurantRouter = require('./routes/RestaurantRoutes')
const fs = require('fs');


const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const DB_CONNECTION = process.env.DB_CONNECTION;

mongoose.connect(DB_CONNECTION)
.then(() => console.log('---- [ MONGODB CONNECTED ] ----'))
.catch(err => console.error('---- [ ERROR ]: ', err));

const Restaurant = require('./models/restaurant');
const jsonData = JSON.parse(fs.readFileSync('./Restaurant_Seed_Data.json', 'utf8'));

const seedData = async () => {
    const count = await Restaurant.countDocuments();
    if(count === 0) {
        await Restaurant.insertMany(jsonData);
        console.log("---- [ RESTAURANT DATA IMPORTED ] ----");
    }
};

seedData();

app.use(restaurantRouter);


app.listen(PORT, () => {
    console.log(`---- [ SERVER RUNNING: ${PORT} ] ---- `);
});