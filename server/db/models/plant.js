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
