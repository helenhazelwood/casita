const User = require('./user')
const Plant = require('./plant')
const Identification = require('./identification')

Plant.belongsTo(User)
User.hasMany(Plant)

module.exports = {
  User,
  Plant,
  Identification
}
