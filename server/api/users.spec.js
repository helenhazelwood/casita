/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Plant = db.model('plant')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
  describe('single user routes', () => {
    let testPlant
    let testPlant2
    let testUser
    beforeEach(async () => {
      testPlant = await Plant.create({
        name: 'Monstera',
        sunlight: 'indirect',
        soil: 'porous',
        temperature: [65, 90],
        humidity: 'high'
      })
      testUser = await User.create({
        email: 'gardener@earth.edu',
        password: 'shmelon'
      })
      await testPlant.setUser(testUser)
      testPlant2 = await Plant.create({
        name: 'Pothos',
        sunlight: 'indirect',
        soil: 'dense',
        temperature: [65, 80],
        humidity: 'medium'
      })
    }) //end test seed hook
    it('GET /:userId sends a single user', async () => {
      const res = await request(app)
        .get(`/api/users/${testUser.id}`)
        .expect(200)
      expect(res.body.id).to.deep.equal(testUser.id)
    })
    it(`GET /:userId/plants eagerly loads all of a user's plants`, async () => {
      const res = await request(app)
        .get(`/api/users/${testUser.id}/plants`)
        .expect(200)

      expect(res.body[0].id).to.deep.equal(testPlant.id)
      expect(res.body[0].userId).to.deep.equal(testUser.id)
    })
    it(`GET /:userId/plants/:plantId serves a single one of a user's plants, and eagerly loads that user`, async () => {
      await testPlant2.setUser(testUser)
      const res = await request(app)
        .get(`/api/users/${testUser.id}/plants/${testPlant2.id}`)
        .expect(200)

      expect(res.body.id).to.deep.equal(testPlant2.id)
      expect(res.body.user.id).to.deep.equal(testUser.id)
    })
    it(`DELETE /:userId/plants deletes all of a user's plants`, async () => {
      await testPlant2.setUser(testUser)
      const res = await request(app)
        .delete(`/api/users/${testUser.id}/plants`)
        .expect(200)
      const search = await User.findByPk(testUser.id, {
        include: [{model: Plant}]
      })

      expect(res.text).to.deep.equal(`User's plants deleted`)
      expect(search.plants.length).to.be.equal(0)
    })
    xit('DELETE /:userId deletes a user', async () => {
      const res = await request(app)
        .delete(`/api/users/${testUser.id}`)
        .expect(200)
      const plantSearch = await Plant.findAll({
        where: {
          userId: testUser.id
        }
      })
      const userSearch = await User.findByPk(testUser.id)
      expect(res.text).to.deep.equal('User deleted')
      expect(plantSearch.length).to.be.equal(0)
      expect(userSearch).to.be.equal(null)
    })
  }) //end describe('Single User Routes')
}) // end describe('User routes')
