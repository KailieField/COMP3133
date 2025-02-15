const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    name: {

        type: String,
        required: true

    },

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

    address: {

        street: {

            type: String,
            required: true

        },

        suit: {

            type: String,
            required: true

        },

        city: {

            type: String,
            required: true,
            match: [/^[A-Za-z\s]+$/, "City can only have alphabet letters and spaces when entered."],

        },

        zip_code: {

            type: String,
            required: true,
            match: [ /^\d{5}-\d{4}$/, "Zip Code must be formatted as 12345-1234"],
    
        },

        geo: {

            lat: {

                type: String,
                required: true

            },

            lng: {

                type: String,
                required: true

            },

        },

    phone: {

            type: String,
            required: true,
            match: [ /^1-\d{3}-\d{3}-\{4}$/, "Phone Number must be entered as: 1-123-123-1234" ],

    },
    
    website: {

        type: String,
        required: true,
        match: [ /^(http:\/\/|https:\/\/)(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}.*$/, "Enter a valid web URL must be http or https", ],

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
            required: true

        },

    },
}



});

module.exports = mongoose.model("User", UserSchema)