const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({

    address: {

        building: { type: String, default: null},
        street: { type: String, required: null},
        zipcode: { type: String, default: null}
    },

    city: { type: String, required: true},
    cuisine: { type: String, required: true},
    name: { type: String, required: true},
    restaurant_id: { type: String, required: true, unique: true}

});

// ---- [ MIDDLEWARE ] ----

RestaurantSchema.pre('save', (next) => {
    console.log(" --- Before Save ---")
    let now = Date.now()
    this.updatedate = now
    if(!this.created) {
        this.created = now
    }
    next();
});

RestaurantSchema.pre('findOneAndUpdate', (next) => {
    console.log("Before findOneAndUpdate")
    let now = Date.now()
    this.updatedate = now
    console.log(this.updatedate)
    next()
});


const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;