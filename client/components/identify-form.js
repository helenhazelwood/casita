import React from 'react'

const IdentifyForm = props => {
  const {plant} = props
  const {handleSubmit} = props
  const {readImage} = props

  return (
    <div className="form">
      <h2>Identify a new plant</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="image">Upload Plant Image:</label>
        <input
          type="file"
          name="image"
          value={plant.imageDataURL}
          onChange={readImage}
        />
      </form>
    </div>
  )
}

export default IdentifyForm
