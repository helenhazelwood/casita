import Axios from 'axios'

const defaultState = {
  plant: ''
}

//ACTION_TYPES
const IDENTIFIED_PLANT = 'IDENTIFIED_PLANT'

//ACTION CREATORS
const identifiedNewPlant = plant => ({type: IDENTIFIED_PLANT, plant})

//THUNK CREATORS

export const identifyNewPlant = file => async dispatch => {
  try {
    console.log('THUNK FILE', file)
    const data = new FormData()
    data.append('file', file, 'plantImage')
    for (let value of data.values()) {
      console.log('THUNK DATA', value)
    }
    const {response} = await Axios.post(`/api/identify`, data, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data.boundary}`
      },
      timout: 30000
    })
    dispatch(identifiedNewPlant(response))
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
