require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const { buildSchema } = require('graphql')
const { graphqlHTTP, graphqlHTTP } = require('express-graphql')
const UserModel = require('./models/User')

const app = express()
const PORT = process.env.PORT || 4000

// --- [ SCHEMA ] ---
const gqlSchema = buildSchema(

    `
    type Query {

       user(email: String!): User
       users: [User]

    }

    type Mutation {
        addUser(

            username: String!,
            email: String!,
            city: String!,
            website: String!,
            zip_code: String!,
            phone: String!

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

// --- [ SERVER CONNECTION ] ---

