import React from 'react'

class IdentifyForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
      plant: {
        userId: this.user.id
      }
    }
  }
  handleSubmit() {}

  handleChange(event) {}

  render() {
    return (
      <div className="form">
        <h2>Identify a new plant</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="image">Upload Plant Image:</label>
          <input
            type="file"
            name="image"
            value={this.state.plant.image}
            onChange={this.handleChange}
          />
        </form>
      </div>
    )
  }
}
