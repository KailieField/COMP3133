require('dotenv').config()
const fs = require('fs')
const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const User = require('./models/User')

