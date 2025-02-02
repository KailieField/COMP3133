require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const restaurantRoutes = require("./routes/RestaurantRoutes");

const app = express();

app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGO_URI;

if(!mongoURI) {

    console.error("--- MONGO_URI NOT DEFINED ---");
    process.exit(1);
}

mongoose.connect(mongoURI)
.then(() => console.log("---- [ MONGODB CONNECTED ] ----"))
.catch(err => console.error("---- [ ERROR ]: ", err));

app.use("/restaurants", restaurantRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`---- [ SERVER RUNNING ]:  ${PORT}`);
});