const router = require('express').Router()
const db = require('../db/db')
const Plant = db.model('plant')
const User = db.model('user')

router.get('/', async (req, res, next) => {
  try {
    const result = await Plant.findAll()
    res.json(result)
  } catch (err) {
    next(err)
  }
})

router.get('/:plantId', async (req, res, next) => {
  try {
    const selectedPlant = await Plant.findByPk(req.params.plantId)
    if (selectedPlant) {
      res.json(selectedPlant)
    } else {
      res.status(404).send('Plant not found')
    }
  } catch (error) {
    next(error)
  }
})

router.get(':/userId', async (req, res, next) => {
  try {
    const response = await User.findByPk(req.params.userId, {
      include: [{model: Plant}]
    })
    res.json(response)
  } catch (error) {
    next(error)
  }
})

module.exports = router
