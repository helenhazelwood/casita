import Axios from 'axios'

const defaultState = {
  plant: {}
}

//ACTION_TYPES
const IDENTIFIED_PLANT = 'IDENTIFIED_PLANT'

//ACTION CREATORS
const identifiedPlant = plant => ({type: IDENTIFIED_PLANT, plant})

//THUNK CREATORS

export const identifyNewPlant = plantURL => async dispatch => {
  try {
    const {data} = await Axios.post(`/api/identify?data=${plantURL}`)
    dispatch(identifiedPlant(data))
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
