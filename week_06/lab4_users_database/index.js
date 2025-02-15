require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const { buildSchema } = require('graphql')
const { graphqlHTTP, graphqlHTTP } = require('express-graphql')
const UserModel = require('./models/User')
const User = require('./models/User')

const app = express()
const PORT = process.env.PORT || 4000

// --- [ SCHEMA ] ---



// --- [ ROOT RESOLVER ] ---

// --- [ GRAPHQL OBJECT ] ---

// --- [ SERVER CONNECTION ] ---

