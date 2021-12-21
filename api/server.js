const express = require("express")
const server = express()
const CarRouter = require('./cars/cars-router')

server.use(express.json())
server.use('/api/cars', CarRouter)

// DO YOUR MAGIC

module.exports = server
