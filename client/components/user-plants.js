import React from 'react'
import PlantItem from './plant-item'
import {connect} from 'react-redux'
import {getPlants} from '../store/user-plants'
import {Link} from 'react-router-dom'

const NoPlants = () => {
  return (
    <div>
      <h2>You have not added any plants!</h2>
      <Link to="/identify">Identify some plants</Link>
    </div>
  )
}
class UserPlants extends React.Component {
  componentDidMount() {
    this.props.getPlants(this.props.user.id)
  }

  render() {
    return (
      <div>
        {!this.props.plants.length ? (
          <NoPlants />
        ) : (
          <div className="user-plants">
            <h2>Your Plants:</h2>
            {this.props.plants.map(plant => (
              <PlantItem plant={plant} key={plant.id} />
            ))}
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  plants: state.userPlants,
  user: state.user
})

const mapDispatch = dispatch => ({
  getPlants: userId => dispatch(getPlants(userId))
})

export default connect(mapState, mapDispatch)(UserPlants)
