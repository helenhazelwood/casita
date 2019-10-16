import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="navbar">
    <h1>casita</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* Navbar links after log in */}
          <Link to="/home">home</Link>
          <Link to="/identify">identify</Link>
          <a href="#" onClick={handleClick}>
            logout
          </a>
        </div>
      ) : (
        <div>
          {/* Navbar links before log in */}
          <Link to="/login">login</Link>
          <Link to="/signup">sign up</Link>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
