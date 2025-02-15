const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    username: {
        
        type: String,
        required: true,
        unique: true,
        minlength: 4,

    },

    email: {

        type: String,
        required: true,
        match: [/^\S+@\S+\. \S+$/, "Enter a valid Email Adress."],

    },

    city: {

        type: String,
        required: true,
        match: [/^[A-Za-z\s]+$/, "City can only have alphabet letters and spaces when entered."],

    },

    website: {

        type: String,
        required: true,
        match: [ /^(http:\/\/|https:\/\/)(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}.*$/, "Enter a valid web URL must be http or https", ],

    },

    zip_code: {

        type: String,
        required: true,
        match: [ /^1-\d{3}-\d{3}-\{4}$/, "Phone Number must be entered as: 1-123-123-1234" ],

    },


});

module.exports = mongoose.model("User", UserSchema)