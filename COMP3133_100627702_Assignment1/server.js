require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const graphqlHTTP = require('express-graphql').graphqlHTTP
const graphqlSchema =require('./schema/graphqlSchema')
const { queryHandlers } = require('./schema/graphqlSchema')


const app = express()


const DB_CONNECT = process.env.DB_CONNECT
const PORT = process.env.PORT || 8081

mongoose.connect(DB_CONNECT)
.then(() => console.log('--- MONGODB CONNECTED ---'))
.catch((error) => console.error(error.message))

app.use('/graphql', graphqlHTTP ({

    graphqlSchema,
    rootValue: queryHandlers,
    graphiql: true,

}));

app.listen(PORT, () => console.log( `--- SERVER RUNNING ON: http://localhost:${PORT}` ));