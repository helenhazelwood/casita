const {expect} = require('chai')
const db = require('../index')
const Plant = db.model('plant')

describe('Plant model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('fields', () => {
    let testPlant
    beforeEach(async () => {
      testPlant = await Plant.create({
        name: 'Monstera',
        sunlight: 'indirect',
        soil: 'porous',
        temperature: [65, 90],
        humidity: 'high'
      })
    })
    it('has name, sunlight, soil, and humidity fields of type string', () => {
      expect(typeof testPlant.name).to.be.equal('string')
    })
  })
})
