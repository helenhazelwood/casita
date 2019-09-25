const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Plant = db.model('plant')
const User = db.model('user')

describe('Plant routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('GET /api/plants', () => {
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
    it('GET / responds with all plants', async () => {
      const res = await request(app)
        .get('/api/plants')
        .expect(200)

      expect(res.body.length).to.be.equal(2)
      expect(res.body[0].name).to.deep.equal(testPlant.name)
      expect(res.body[1].soil).to.deep.equal(testPlant2.soil)
    })
    it('GET /:plantId responds with a single plant', async () => {
      const res = await request(app)
        .get(`/api/plants/${testPlant.id}`)
        .expect(200)

      expect(res.body.name).to.deep.equal(testPlant.name)
      expect(res.body.userId).to.deep.equal(testPlant.userId)
    }) //end GET single plant
  }) //end GET routes
  describe('POST /:userId', () => {
    let testPlant
    let testUser
    let testUser2
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
      testUser2 = await User.create({
        email: 'iloveplants@garden.com',
        password: 'shmelon'
      })
      await testPlant.setUser(testUser)
    }) //end test seed hook
    it('creates a new plant instance and associates it with the specified user', async () => {
      const res = await request(app)
        .post(`/api/plants/${testUser2.id}`)
        .send({
          name: 'Pothos',
          sunlight: 'indirect',
          soil: 'dense',
          temperature: [65, 80],
          humidity: 'medium'
        })
        .expect(201)

      expect(res.body.name).to.deep.equal('Pothos')
      expect(res.body.user.id).to.deep.equal(testUser2.id)
    })
  })
})
