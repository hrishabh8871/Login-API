const mongoose = require('mongoose')
const { Schema } = require('mongoose')


const collection = 'UserData'

// Schema
const schema = new Schema({  
    name: {
      type: String
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      index: true
    },

    mobile: {
      type: String,
      unique: true,
      required: true,
      index: true     
    },

    password: {
      type: String,
    },

    image: {
      type: String,      
    },

    role: {
      type: String,      
    },

    DOB: {
      type: Number
    },

    PAN: {
      type: String,
      unique: true,
      index: true
    },

    fatherName: {
      type: String
    },

    registrationSteps: {
      type: Number,
      default: 1
    },

    activeSession: {
      type: Number,
      default: 0
    },

    loggedInDeviceInfo: {
      type: Object
    },

    gender: {
      type: String
    },



}, {timestamps: true})

// Model
module.exports = mongoose.model(collection, schema, collection)
