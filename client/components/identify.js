import React from 'react'
import {connect} from 'react-redux'
import {identifyNewPlant} from '../store/identify'

class Identify extends React.Component {
  constructor(props) {
    super(props)
    this.state = {file: '', imagePreviewURL: ''}
    this.handleImageChange = this.handleImageChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    let file = this.state.file
    this.props.history.push('/identify/result')
    this.props.identifyNewPlant(file)
  }
  handleImageChange(event) {
    event.preventDefault()
    let reader = new FileReader()
    let file = event.target.files[0]
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewURL: reader.result
      })
    }
    reader.readAsDataURL(file)
  }
  render() {
    let {imagePreviewURL} = this.state
    let $imagePreview = null
    if (imagePreviewURL) {
      $imagePreview = <img src={imagePreviewURL} />
    } else {
      $imagePreview = <p>Select an Image</p>
    }

    return (
      <div className="identify-form">
        <form>
          <input
            className="fileInput"
            type="file"
            onChange={this.handleImageChange}
          />
        </form>
        <div className="image-preview">{$imagePreview}</div>
        <button
          type="submit"
          onClick={this.handleSubmit}
          disabled={this.state.file.length < 1}
        >
          Identify!
        </button>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  identifyNewPlant: dataURL => dispatch(identifyNewPlant(dataURL))
})

export default connect(null, mapDispatch)(Identify)
