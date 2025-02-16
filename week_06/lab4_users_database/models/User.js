const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({

    name: {

        type: String,
        required: true

    },

    username: {

        type: String,
        required: true,
        unique: true,
        minLength: 4,

    },

    email: {

        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, "Enter a valid Email Address."],

    },

    address: {

        street: {
            
            type: String,
            required: true,

        },

        suite: {

            type: String,
            required: true,

        },

        city: {

            type: String,
            required: true,
            match: [/^[A-Za-z\s]+$/, "City should only have letters and spaces"],

        },

        zipcode: {

            type: String,
            required: true,
            match: [/^\d{5}-\d{4}s/, "Zip Code must be inserted as 12345-1234"],

        },

        geo: {

            lat: {

                type: String, 
                required: true,
            },
            lng: {
                
                type: String,
                required: true,
            },
        },
    },

    phone: {

        type: String,
        required: true,
        match: [/^1-\d{3}-\d{3}-\d{4}$/, "Phone Number must be entered as: 1-123-123-1234"],

    },

    website: {

        type: String,
        required: true,
        match: [/^(http:\/\/|https:\/\/)(www.\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}.*$/, "Enter Web URL with HTTP or HTTPS"],

    },

    company: {

        name: {
            
            type: String,
            required: true,

        },
        catchPhrase: {

            type: String,
            required: true,
    
        },

        bs: {

        type: String,
        required: true,

        },


    },


});

module.exports = mongoose.model("User", UserSchema);