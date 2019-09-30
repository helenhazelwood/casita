import Axios from 'axios'

const defaultState = {
  plant: '',
  URL: ''
}

//ACTION_TYPES
const REQUESTED_IDENTIFICAITON = 'REQUESTED_IDENTIFICATION'

//ACTION CREATORS
const requestedIdentification = url => ({type: IDENTIFIED_PLANT, url})

//THUNK CREATORS

export const requestIdentification = file => async dispatch => {
  try {
    const data = new FormData()
    data.append('file', file, 'plantImage')
    const response = await Axios.post(`/api/identify`, data, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data.boundary}`
      },
      timout: 30000
    })
    console.log('THUNK RESPONSE', response.data)
    dispatch(requestedIdentification(response))
  } catch (error) {
    console.log(error)
  }
}

//REDUCER
const identifyReducer = (state = defaultState, action) => {
  switch (action.type) {
    case REQUESTED_IDENTIFICAITON:
      return {...state, URL: action.url}
    default:
      return state
  }
}

export default identifyReducer
