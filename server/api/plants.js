const router = require('express').Router()

const {User, Plant} = require('../db/models/')

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

router.post('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    const newPlant = await Plant.create(req.body)
    await newPlant.setUser(user)

    const response = await Plant.findByPk(newPlant.id, {
      include: [{model: User}]
    })

    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
})

module.exports = router
