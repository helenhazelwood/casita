/* eslint-disable camelcase */
const router = require('express').Router()
const request = require('request')
const {key, generateUUID} = require('../../public/util')

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

// router.get('/result/:customId', async (req, res, next) => {
//   try {
//   } catch (error) {}
// })

module.exports = router
