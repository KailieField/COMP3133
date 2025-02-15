require('dotenv').config()
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

       user(email: String!): User
       users: [User]

    }

    type Mutation {
        addUser(

            username: String,
            email: String,
            city: String,
            website: String,
            zip_code: String,
            phone: String

        ): User
    }

    type User {

        username: String
        email: String
        city: String
        website: String
        zip_code: String
        phone: String

    }
    `
);


// --- [ ROOT RESOLVER ] ---
const rootResolver = {

    // -- single user fetch
    user: async ({ email }) => {

        const user = await UserModel.findOne({ email });
        return user;

    },

    // -- fetch all users
    users: async () => {

        const users = await UserModel.findOne({});
        return users;
    },
    // -- add new user
    addUser: async (args) => {

        const { username, email, city, website, zip_code, phone } = args;
        const newUser = new UserModel({

            username,
            email,
            city,
            website,
            zip_code,
            phone,

        });

        try {

            await newUser.save();
            return newUser;

        }catch (error) {

            throw new Error(error.message);

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

            console.log(`--- [ CONNECTED TO MONGODB ] ---`)

        })
        .catch((error) => {

            console.error(`--- [ ERROR CONNECTIN TO DB ]: ${JSON.stringify(error)}`)

        });
    } catch (error) {

        console.error(`--- UNABLE TO CONNECT TO DB: ${error.message}`)

    }
};

// --- [ SERVER CONNECTION ] ---
app.listen(PORT, () => {

    console.log(`---- [ SERVER RUNNING ON PORT : ${PORT} ] ----`)
    console.log("http://localhost:4000/graphql")
    connectDB()

});
