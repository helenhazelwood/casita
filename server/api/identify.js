/* eslint-disable camelcase */
const router = require('express').Router()
const request = require('request')
const {key, generateUUID} = require('../../public/util')
const {Identification} = require('../db/models')

router.post('/', (req, res, next) => {
  try {
    let file = req.files.file

    let imageBuffer = Buffer.from(file.data)

    let image = imageBuffer.toString('base64')

    const customId = generateUUID()
    const callback = `/api/identify/result/${customId}`

    const params = {
      key: `${key}`,
      custom_id: `${customId}`,
      callback_url: `casita.herokuapp.com${customId}`,
      images: [`${image}`]
    }

    request.post({
      uri: 'https://api.plant.id/identify',
      json: true,
      body: JSON.stringify(params)
    })

    res.json(callback)
  } catch (error) {
    next(error)
  }
})

router.post('/result/:customId', async (req, res, next) => {
  try {
    await Identification.create({
      json: req.body,
      endpoint: req.params.customId
    })
    res.json(req.body)
  } catch (error) {
    next(error)
  }
})

router.get('/result/:customId', async (req, res, next) => {
  try {
    let finished = false
    let i = 0
    while (!finished && i < 100) {
      let search = await Identification.findAll({
        where: {
          endpoint: req.params.customId
        }
      })
      if (search.json !== null) {
        res.json(search)
        finished = true
      } else {
        i++
      }
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
