/* eslint-disable camelcase */
const router = require('express').Router()
const request = require('request')
const {key, generateUUID} = require('../../public/util')
// const {User, Plant} = require('../db/models/')

// const readImage = file => {
//   reader.onloadend = () => {
//     return reader.result
//   }
//   reader.readAsDataURL(file)
// }
router.post('/', async (req, res, next) => {
  try {
    let file = req.files.file
    console.log(file.data)
    let imageBuffer = Buffer.from(file.data)
    console.log('BEFORE BUFFER METHOD', imageBuffer)
    let image = imageBuffer.toString('base64')

    const customId = generateUUID()
    console.log(customId)

    const params = {
      key: `${key}`,
      custom_id: `${customId}`,
      callback_url: `casita.herokuapp.com/api/identify/result/${customId}`,
      images: [`${image}`]
    }

    request.post({
      uri: 'https://api.plant.id/identify',
      json: true,
      body: JSON.stringify(params)
    })
  } catch (error) {
    next(error)
  }
})

router.get('/result?id=id')

module.exports = router
