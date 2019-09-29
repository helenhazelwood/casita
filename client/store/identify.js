import Axios from 'axios'

const defaultState = {
  plant: ''
}

//ACTION_TYPES
const IDENTIFIED_PLANT = 'IDENTIFIED_PLANT'

//ACTION CREATORS
const requestedIdentification = plant => ({type: IDENTIFIED_PLANT, plant})

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
    case IDENTIFIED_PLANT:
      return action.plant
    default:
      return state
  }
}

export default identifyReducer
