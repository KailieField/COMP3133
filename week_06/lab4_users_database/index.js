require('dotenv').config()
const fs = require('fs');
const express = require('express')
const mongoose = require('mongoose')
const { buildSchema } = require('graphql')
const { graphqlHTTP, graphqlHTTP } = require('express-graphql')
const UserModel = require('./models/User')

const app = express()


// --- [ SCHEMA ] ---
const gqlSchema = buildSchema(

    `
    type Query {

       users: [User]
       user: (email, String): User

    }

    type Mutation {

        loadUserData: String

    }

    type Address {

        street: String
        suit: String
        city: String
        zipcode: String
        geo: Geo

    }
    
    type Geo {

        lat: String
        lng: String

    }
    
    type User {

        name: String
        username: String
        email: String
        address: String
        phone: String
        website: String
        company: String

    }


    `
);


// --- [ ROOT RESOLVER ] ---
const rootResolver = {

    //--- fetch single user
    user: async ({ email }) => {

        try {

            const user = await UserModel.findOne({ email });
            if(!user) throw new Error ("--- USER NOT FOUND ---");
            return users;

        } catch (error) {

            throw new Error(error.message);
        }
    },

    //--- fetch all users
    users: async () => {

        return await UserModel.findOne({});

    },

    //-- loading UserData.json file data into database
    loadUserData: async () => {

        const data = JSON.parse(fs.readFileSync("UserData.json", "utf8"));

        try {

            const userExists = await UserModel.findOne({});
            if (userExists.length === 0) {
                await UserModel.insertMany(data) //<--- only inser users if they database is empty
                return "--- Users Loaded Into Database ---";

            } else {

                return " --- Users Already Loaded into Database ---"
            }
        } catch (error) {

            console.error("--- Error Loading: ", error.message);
            throw new Error("---[ FAILURE LOADING USERS TO DATABASE ] ---");

        }
    },
};


// --- [ GRAPHQL OBJECT ] ---
const graphqlHttp = graphqlHTTP({

    schema: gqlSchema,
    rootValue: rootResolver,
    graphiql: true,

});

app.use("/graphql", graphqlHttp);
const PORT = process.env.PORT || 4000

// --- [ CONENCTION TO DB ] ---
const DB_CONNECTION = process.env.DB_CONNECTION;

const connectDB = async () => {

    try {
        mongoose.connect(DB_CONNECTION)

        .then(() => {

            console.log(`--- [ CONNECTED TO DB ] ---`)

        })
        .catch((error) => {

            console.error(`--- [ ERROR CONNECTING TO DB ]: ${JSON.stringify(error)}`)

        });
    } catch (error) {

        console.error(`--- [ UNABLE TO CONNECT TO DB ]: ${error.message}`)

    }
};

// --- [ SERVER CONNECTION ] ---
app.listen(PORT, () => {

    console.log(`---- [ SERVER RUNNING ON PORT : ${PORT} ] ----`)
    console.log("http://localhost:4000/graphql")
    connectDB()

});
