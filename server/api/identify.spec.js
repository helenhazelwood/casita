const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Plant = db.model('plant')
const User = db.model('user')
const Identification = db.model('identification')

describe('Identify routes', () => {
  let jsonObject = {
    suggestions: [
      {
        id: 124,
        plant: {
          name: 'Rhododendron'
        }
      }
    ]
  }
  describe('POST /result/id', () => {
    it('res.jsons the req body to the request URL', async () => {
      const res = await request(app)
        .post(`/api/identify/result/abc123`)
        .send(JSON.stringify(jsonObject))
      const search = await Identification.findAll({
        where: {
          endpoint: 'abc123'
        }
      })

      expect(typeof res.body).to.be.equal('object')
      expect(search[0].id).to.be.equal(1)
    }) //end json test
  }) //end describe POST
  describe('GET /result/id', () => {
    it('looks for an instance in the Id table', async () => {
      await request(app)
        .post(`/api/identify/result/abc123`)
        .send(JSON.stringify(jsonObject))
      const res = await request(app).get('/api/identify/result/abc123')
      console.log(res.body[0].json)
      expect(typeof res.body[0].json).to.deep.equal('object')
    })
  })
}) //end test block
