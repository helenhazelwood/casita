import Axios from 'axios'

const defaultState = {
  plants: [],
  selectedPlant: null
}
//ACTION TYPES
const GOT_PLANTS = 'GOT_PLANTS'

//ACTION CREATORS
const gotPlants = plants => ({type: GOT_PLANTS, plants})

//THUNK CREATORS

export const getPlants = userId => async dispatch => {
  try {
    const {data} = await Axios.get(`/api/${userId}/plants`)
    dispatch(gotPlants(data))
  } catch (error) {
    console.error(error)
  }
}

//REDUCER
const userPlants = (state = defaultState, action) => {
  switch (action.type) {
    case GOT_PLANTS:
      return {...state, plants: action.plants}
    default:
      return state
  }
}

export default userPlants
