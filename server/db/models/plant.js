const Sequelize = require('sequelize')
const db = require('../db')

const Plant = db.define('plant', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue:
      'https://cdn.pixabay.com/photo/2017/10/11/17/08/plant-2841719_960_720.jpg'
  },
  sunlight: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['bright', 'medium-bright', 'indirect', 'low']]
    }
  },
  size: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['small', 'medium', 'big']]
    }
  },
  temperature: {
    type: Sequelize.RANGE(Sequelize.DECIMAL(4, 1))
  },
  petFriendly: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Plant
