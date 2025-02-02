const express = require('express');
const router = express.Router();

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