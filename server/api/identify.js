const router = require('express').Router()
const key = require('../../public/util')
// const {User, Plant} = require('../db/models/')

router.post('/', async (req, res, next) => {
  try {
    const image = req.query.data
    const params = {
      //custom_id:
      //'callback_url' : "helenhisaac.github.io/casita/api/identify/result?id="
      images: image,
      key: key
    }
  } catch (error) {
    next(error)
  }
})

router.get('/result?id=id')

module.exports = router
