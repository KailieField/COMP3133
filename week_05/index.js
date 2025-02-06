const express = require('express')
const mongoose = require('mongoose')
const { buildSchema } = require('graphql')
const { graphqlHTTP }  = require('express-graphql')
const UserModel = require('./User')
const User = require('./User')


const app = express()
const SERVER_PORT = 4000

// --- SCHEMA ---
const gqlSchema = buildSchema(

    `type Query{
        welcome: String
        greet(name: String): String
        user: User
        users: [User]
    }
    
    type Mutation{
        addUser(uid: Int, fnm: String, lnm: String, salary: Float): User
    }

    type User{
        uid: Int
        firstname: String
        lastname: String
        salary: Float
    }
    `
)

// --- ROOT RESOLVER ---
const rootResolver = {
    welcome: () => {
        return "Welcome to GraphQL examples"
    },
    greet: ({name})=>{ //obj.name
        return `Hello, ${name}`
    },
    user: async () => {
        // const user = {
        //     uid: 1,
        //     fnm: "Pritesh",
        //     lnm: "Patel",
        //     salary: 500.50
        // }
        const user = await UserModel.findOne({})
        console.log(user)
        return user
    },
    users: async() => {
        // const users = [{
        //     uid: 1,
        //     fnm: "Pritesh",
        //     lnm: "Patel",
        //     salary: 500.50
        // },
        // {
        //     uid: 2,
        //     fnm: "Test",
        //     lnm: "Patel",
        //     salary: 1500.70
        // }]
        const users = await UserModel.find({})
        console.log(users)
        return users
    },
    addUser: async(user) => {
        console.log(user)
        //Insert to Database
        const {uid, fnm, lnm, salary} = user
        const newUser = UserModel({
            uid,
            firstname: fnm,
            lastname: lnm,
            salary
        })
        await newUser.save()
        return newUser
    }
}

 // --- GRAPHQL OBJECT ---
 const graphqlHttp = graphqlHTTP({
    schema: gqlSchema,
    rootValue: rootResolver,
    graphiql: true
 })

 app.use("/graphql", graphqlHttp)

// --- CONNECTING TO DB ---
const connectDB = async() => {
    try{
        console.log(`Attempting to connect to DB`);
        const DB_CONNECTION = `mongodb+srv://kailiefield:COMP3133@cluster0.fru65.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

        mongoose.connect(DB_CONNECTION) 
        .then( () => {
            console.log(`MONGODB CONNECTED`)
        })
        .catch( (err) => {
            console.log(`Error while connecting to MongoDB : ${JSON.stringify(err)}`)
        });
    }catch(error){
        console.log(`Unable to connect to DB : ${error.message}`);
        
    }
}

// --- CONNECTING TO SERVER ---
app.listen(SERVER_PORT, () => {

    console.log(`SERVER RUNNING ON ${SERVER_PORT}`)
    console.log('http://localhost:4000/graphql')
    connectDB()
})