import React from 'react'

class Identify extends React.Component {
  constructor(props) {
    super(props)
    this.state = {file: '', imagePreviewURL: ''}
    this.handleImageChange = this.handleImageChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    let dataURL = this.state.imagePreviewURL.replace(
      /^data:image\/[a-z]+;base64,/,
      ''
    )
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
      $imagePreview = <p>Please Select An Image for Preview</p>
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
      </div>
    )
  }
}

export default Identify
