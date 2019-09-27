import React from 'react'
import IdentifyForm from './identify-form'
import {identifyNewPlant} from '../store/identify'
import {connect} from 'react-redux'

const initialState = {
  user: {},
  plant: {
    userId: null,
    imageDataURL: ''
  }
}

class Identify extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.identifyPlant(this.state.imageDataURL, this.state.user.id)
    this.setState(initialState)
  }

  readImage(event) {
    let input = event.target.value

    let file = input.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      let b64 = reader.result.replace(/^data:.+;base64,/, '')
      console.log('b64', b64)
    }
    reader.readAsDataURL(file) //i'm not sure what the point of this is if the b64 dataUrl has already been generated above
  }

  render() {
    return (
      <IdentifyForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        user={this.state}
        plant={this.state}
      />
    )
  }
}

const mapDispatch = dispatch => ({
  identifyPlant: imageDataURL => dispatch(identifyNewPlant(imageDataURL))
})

const mapState = state => ({
  user: state.user
})

export default connect(mapState, mapDispatch)(Identify)

// export const Identify = (props) => {
//   const {user} = props
//   return (
//     <div className="identify">
//       <h2>Identify a new plant:</h2>
//       <IdentifyForm user={user} />
//     </div>
//   )
// }
