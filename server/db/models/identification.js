const Sequelize = require('sequelize')
const db = require('../db')

const Identification = db.define('identification', {
  json: {
    type: Sequelize.JSON
  },
  endpoint: {
    type: Sequelize.STRING
  }
})

module.exports = Identification
