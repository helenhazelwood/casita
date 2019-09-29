import React from 'react'
import {connect} from 'react-redux'

class IdentifyResult extends React.Component {
  componentDidMount() {
    this.props.getIdentifyResult(identificator)
  }

  render() {
    const {identificator} = this.props.identificator

    return (
      <div className="identify-result">
        <p>IDENTIFY RESULT COMPONENT</p>
      </div>
    )
  }
}

export default IdentifyResult
