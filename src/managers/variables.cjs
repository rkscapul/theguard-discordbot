const path = require('path')

require('dotenv').config({ 
  path: path.join(__dirname.slice(0, -12),`.env.${process.env.NODE_ENV}`) 
})