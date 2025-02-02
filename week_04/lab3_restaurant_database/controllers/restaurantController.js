const Restaurant = require("../models/restaurant");


// ---- [ GET ALL ] ----
exports.getAllRestaurants = async(req, res) => {
    try{

        const restaurants = await Restaurant.find({});
        res.json(restaurants);

    }catch(error){

        res.status(500).json("----- [ ERROR ]: ", { message: error.message });
    }
};

// ---- [ GET BY CUISINE ] ----
exports.getByCuisine = async(req, res) => {
    try{

        const { cuisine } = req.params;
        const restaurants = await Restaurant.find({ cuisine });
        res.json(restaurants);

    }catch(error){

        res.status(500).json("----- [ ERROR ]: ", { message: error.message });
    }
};

// ---- [ GET SORTED (ASC || DESC)] ----
exports.getSortedRestaurants = async(req, res) => {
    try{

        const { sortBy } = req.query;

        if(!sortBy || (sortBy !=="ASC" && sortBy !== "DESC")){

            return res.status(400).json({ message: "--- USE ASC OR DESC ---"});
        }

        const sortOrder = sortBy === 'ASC' ? 1 : -1;
        const restaurants = await Restaurant.find({}, "restaurant_id name cuisine city").sort({ restaurantid : sortOrder });
        res.json(restaurants);

    }catch(error){

        res.status(500).json("----- [ ERROR ]: ", { message: error.message });
    }
};

// ---- [ GET DELICATESSEN RESTAURANTS ] ----
exports.getDessertRestuarants = async(req, res) => {
    try{

        const restaurants = await Restaurant.find({
            cuisine : "Delicatessen",
            city : { $ne : "Brooklyn" }

        }).select("cuisine name city").sort({ name : 1 });
        res.json(restaurants);

    }catch(error){

        res.status(500).json("----- [ ERROR ]: ", { message: error.message });
    }
};
