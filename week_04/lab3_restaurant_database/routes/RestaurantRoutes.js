const express = require('express');
const restaurantModel = require('../models/restaurant');
const router = express.Router();


const app = express();


const {

    getAllRestaurants,
    getByCuisine,
    getSortedRestaurants,
    getDessertRestuarants

} = require("../controllers/restaurantController");

router.get("/", getAllRestaurants);
router.get("/cuisine", getByCuisine);
router.get("/sorted", getSortedRestaurants);
router.get("/delicatessen", getDessertRestuarants);


module.exports = router;