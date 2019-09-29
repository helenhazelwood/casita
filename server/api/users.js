const router = require('express').Router()
const {User, Plant} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const selectedUser = await User.findByPk(req.params.userId)
    res.json(selectedUser)
  } catch (error) {
    next(error)
  }
})
router.get('/:userId/plants', async (req, res, next) => {
  try {
    const response = await Plant.findAll({
      where: {
        userId: req.params.userId
      }
    })

    res.json(response)
  } catch (error) {
    next(error)
  }
})

router.get('/:userId/plants/:plantId', async (req, res, next) => {
  try {
    const response = await Plant.findByPk(req.params.plantId, {
      include: [{model: User}]
    })
    res.json(response)
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId/plants/', async (req, res, next) => {
  try {
    await Plant.destroy({
      where: {
        userId: req.params.userId
      }
    })
    res.send(`User's plants deleted`)
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.userId
      }
    })

    await Plant.destroy({
      where: {
        userId: req.params.userId
      }
    })
    res.send('User deleted')
  } catch (error) {
    next(error)
  }
})
