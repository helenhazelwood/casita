'use strict'

const db = require('../server/db')
const {User, Plant} = require('../server/db/models')
const Axios = require('axios')

const fetchPlants = async () => {
  const res = await Axios.get('https://www.thesill.com/products.json', {
    headers: {
      'Content-type': 'appliation/json',
      'cache-control': 'no-cache'
    },
    params: {
      limit: 250
    }
  })
  return res.data.products.filter(product => product.tags.includes('liveplant'))
}

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  const livePlants = await fetchPlants()

  const plants = await Promise.all(
    livePlants.map(plant => {
      let petFriendly = false
      let sunlight
      let size
      let name
      if (plant.tags.includes('petfriendly')) {
        petFriendly = true
      }
      if (plant.tags.includes('MEDIUM')) {
        size = 'medium'
      }
      if (plant.tags.includes('SMALL' || 'MINI')) {
        size = 'small'
      }
      if (plant.tags.includes('LARGE')) {
        size = 'large'
      }
      if (plant.tags.includes('light: low-medium')) {
        sunlight = 'indirect'
      } else if (plant.tags.includes('lowlight')) {
        sunlight = 'low'
      } else if (plant.tags.includes('brightlight')) {
        sunlight = 'bright'
      }
      Plant.create({
        name: 'holder',
        description: plant.body_html,
        sunlight: sunlight,
        size: size,
        petFriendly: petFriendly
      })
      //STOPPED HERE
    })
  )
  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${plants.length} plants`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
