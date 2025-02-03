const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant')

// ---- [ GET ALL RESTAURANTS ] ----
router.get('/restaurants', async (req, res) => {
    try{
        const restaurants = await Restaurant.find();
        res.status(200).send(restaurants);
    }catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// ---- [ GET BY CUISINE ] ----
router.get('/restaurants/cuisine/:cuisine', async(req, res) => {
    try{
        const { cuisine } = req.params;
        const restaurants = await Restaurant.find({ cuisine: cuisine });

        if (restaurants.length !== 0) {
            res.send(restaurants);
        }else{
            res.send({ status: false, message: "--- NO DATA FOUND ---"});
        } 
    }catch (err) {
        res.status(500).send(err);
    }
});


// ---- [ GET BY RESTAURANT SORTED BY ID ] ----
router.get('/restaurants', async (req, res) => {
    try{
        let sortOrder = 1;
        if(req.query.sortBy) {
            if(req.query.sortBy.toUpperCase() === 'DESC'){
                sortOrder = -1;
            }else if (req.query.sortBy.toUpperCase() === 'ASC'){
                sortOrder = 1;
            }else {
                return res.status(400).json({ error: "--- USE 'ASC' || 'DESC' "})
            }
        }
        const restaurants = await Restaurant.find()
        .select('restaurant_id name cuisine city')
        .sort({ restaurant_id: sortOrder });

        res.status(200).json(restaurants);
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---- [ GET BY DELICATESSEN RESTAURANT BUT NOT IN BROOKLYN ] ----
router.get('/restaurants/Delicatessen', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({
            cuisine: "Delicatessen",
            city: { $ne: "Brooklyn" }
        })
        .select('cuisine name city -_id')
        .sort({ name: 1 });

        res.status(200).send(restaurants);
    }catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;