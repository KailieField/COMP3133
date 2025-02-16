const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({

    username: {

        type: String,
        required: [ true, 'USERNAME MANDATORY.' ],
        minlength: [ 4, 'Username must be at least 4 characters in length.' ]
    },

    email: {
        type: String,
        required: [ true, 'EMAIL MANDATORY.' ],
        validate: {

            validator: (v) => validator.isEmail(v),
            message: 'Invalid Email Address.'

        }
    },

    city: {

        type: String,
        required: [ true, 'CITY MANDATORY.' ],
        validate: {

            validator: (v) => /^[a-zA-Z\s]+$/.test(v),
            message: 'The CITY must contain letters and spaces only.'

        }
    },

    website: {

        type: String,
        required: [ true, 'URL MANDATORY -- HTTP OR HTTPS' ],
        validate: {

            validator: (v) => validator.isURL(v, { protocols: ['http', 'https'], require_protocol: true }),
            message: 'Invalid URL. Must include http or https.'

        }
    },

    zip: {

        type: String,
        required: [ true, 'ZIP CODE MANDATORY.'],
        validate: {

            validator: (v) => /^\d{5}-\d{4}$/.test(v),
            message: 'ZIP CODE must be in formate: DDDDD-DDDD'
        }
    },

    phone: {

        type: String,
        required: [ true, 'PHONE NUMBER MANDATORY.'],
        validate: {
            
            validator: (v) => /^\d-\d{3}-\d{3}-\d{4}$/.test(v),
            message: 'PHONE NUMBER must be in the format: D-DDD-DDD-DDDD'
        }
    }
});

module.exports = mongoose.model('User', UserSchema)