const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    name: {

        type: String, 
        required: [ true, 'NAME IS MANDATORY.' ],

    },

    username: {

        type: String,
        required: [ true, 'USERNAME IS MANDATORY 4 CHARCATERS.' ],
        minlength: [ 4, "MUST BE AT LEAST 4 CHARACTERS." ]

    },

    email: {

        type: String,
        required: [ true, 'EMAIL IS MANDATORY.' ],
        match: [ /^\S+@\S+\.\S+$/, 'INVALID EMAIL FORMAT' ],

    },

    address: {

        street: {
        type: String,
        required: [ true, 'STREET IS MANDATORY.' ],


        },


        suite: {

            type: String, 
            required: [ true, 'SUITE IS MANDATORY.' ],

        },

        city: {

            type: String,
            required: [ true, 'CITY IS MANDATORY.' ],
            match: [ /^[a-zA-Z\s]+$/, 'ONLY LETTERS AND SPACES.' ],

        },

        zipcode: {

            type: String, 
            required: [ true, 'ZIPCODE IS MANDATORY.' ],
            match: [ /^\d{5}-\d{4}$/, 'FORMAT DDDDD-DDDD'],

        },
        
        geo: {

            lat: {

                type: String,
                required: [ true, 'LATITUDE IS MANDATORY.'],
                match: [ /^-?\d+(\.\d+)?$/, 'MUST BE A VALID NUMBER' ],

            },
            lng: {

                type: String,
                required: [ true, 'LONGITUDE IS MANDATORY.'],
                match: [ /^-?\d+(\.\d+)?$/, 'MUST BE A VALID NUMBER.' ],

            },

        },

    },

    phone: {

        type: String,
        required: [ true, 'PHONE IS MANDATORY.' ],
        match: [ /^\d-\d{3}-\d{3}-\d{4}$/, 'FORMAT D-DDD-DDD-DDDD' ],

    },

    website: {

        type: String,
        required: [ true, 'URL IS MANDATORY.' ],
        match: [/^(https?:\/\/)[^\s$.?#].[^\s]*$/, ' INVALID URL.'],

    },

    company: {

        name: {

        type: String, 
        required: [ true, 'COMPANY IS MANDATORY.' ],

        },

        catchPhrase: {

            type: String,
            required: [ true, 'CATCH PHRASE IS MANDATORY.' ],
             
        },


        bs: {

            type: String,
            required: [ true, 'BS IS MANDATORY.' ],
        },

    },
    
});

module.exports = mongoose.model('User', UserSchema);