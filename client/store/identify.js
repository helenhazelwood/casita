import Axios from 'axios'

const defaultState = {
  plant: ''
}

//ACTION_TYPES
const IDENTIFIED_PLANT = 'IDENTIFIED_PLANT'

//ACTION CREATORS
const identifiedNewPlant = plant => ({type: IDENTIFIED_PLANT, plant})

//THUNK CREATORS

export const identifyNewPlant = dataURL => async dispatch => {
  try {
    const {data} = await Axios.post(`/api/identify?data=${dataURL}`)
    dispatch(identifiedNewPlant(data))
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
