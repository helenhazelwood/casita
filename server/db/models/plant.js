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
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: 'https://cdn.pixabay.com/photo/2017/10/11/17/08/plant-2841719_960_720.jpg'
  },
  sunlight: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['direct', 'indirect', 'low']]
    }
  },
  soil: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['porous', 'dense']]
    }
  },
  temperature: {
    type: Sequelize.RANGE(Sequelize.DECIMAL(4, 1))
  },
  humidity: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['high', 'medium', 'low']]
    }
  }
})

module.exports = Plant
