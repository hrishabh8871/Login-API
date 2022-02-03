require('dotenv').config()

const NODE_ENV = process.env.NODE_ENV
const PORT = process.env.PORT
const MONGODBURL = process.env.MONGODBURL
const BCRYPTSALT = process.env.BCRYPTSALT

module.exports = {
    NODE_ENV,
    PORT,
    MONGODBURL,
    BCRYPTSALT
}