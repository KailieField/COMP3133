require('dotenv').config();
const cors = require("cors");
const express = require('express');
const mongoose = require('mongoose');
const restaurantRouter = require('./routes/RestaurantRoutes')


const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    console.log('---- [ MONGODB CONNECTED ] ----')
}).catch(err => {
    console.error('---- [ ERROR ]: ', err)
});

app.use('/api/restaurants', restaurantRouter);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`---- [ SERVER RUNNING: ${PORT} ] ---- `);
});