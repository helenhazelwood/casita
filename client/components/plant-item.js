import React from 'react'
import {Link} from 'react-router-dom'

const PlantItem = props => {
  const {plant} = props

  return (
    <div className="item-container">
      <Link to={`/${plant.id}`}>{plant.name}</Link>
      <div>
        <img src={plant.imageURL} />
      </div>
    </div>
  )
}

export default PlantItem
