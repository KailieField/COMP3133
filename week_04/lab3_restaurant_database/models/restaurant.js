const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({

    address: {

        type: String
    },

    city: {

        type: String
    },

    cuisine: {

        type: String
    },

    name: {

        type: String
    },

    restaurant_id: {

        type: String
    },

    
});

// ---- [ DECLARING VIRTUAL FIELDS ] ----



// ---- [ CUSTOME SCHEMA METHODS ] ----

// -- 1. Instance Method Declaration

// -- 2. Static Method Declaration

// ---- [ QUERY HELPERS ] ----

RestaurantSchema.pre('save', (next) => {
    console.log(" --- Before Save ---")
    let now = Date.now()
    this.updatedate = now
    if(!this.created) {
        this.created = now
    }
    next()
});

RestaurantSchema.pre('findOneAndUpdate', (next) => {
    console.log("Before findOneAndUpdate")
    let now = Date.now()
    this.updatedate = now
    console.log(this.updatedate)
    next()
});

RestaurantSchema.post('init', (doc) => {
    console.log(' --- %s initialized from DB --- ', doc._id);
});

RestaurantSchema.post('validate', (doc) => {
    console.log(' --- %s validated (not saved) --- ', doc._id);
});

RestaurantSchema.post('save', (doc) => {
    console.log(' --- %s has been saved --- ', doc._id);
});

RestaurantSchema.post('remove', (doc) => {
    console.log(' --- %s has been removed --- ', doc._id);
});


const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;