import React from 'react'
import {connect} from 'react-redux'

class UserPlants extends React.Component {
  componentDidMount() {
    this.props.getPlants(this.props.user.id)
  }

  render() {
    return (
      <div>
        {!this.props.plants ? (
          <NoPlants />
        ) : (
          <div className="user-plants">
            {this.props.plants.map(plant => (
              <PlantItem plant={plant} key={plant.id} />
            ))}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  plants: state.plants
})

const mapDispatchToProps = dispatch => ({
  getPlants: userId => dispatch(getPlants(userId))
})
