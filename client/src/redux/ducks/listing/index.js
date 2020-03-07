import { useSelector, useDispatch } from "react-redux"
import axios from "axios"

const GET_DESCRIPT = "ex/GET_DESCRIPT"

const initialState = {
  description: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DESCRIPT:
      return { ...state, description: action.payload }
    default:
      return state
  }
}

function getDescription(id) {
  return dispatch => {
    axios.get("/api/listing/" + id).then(resp => {
      const data = resp.data
      dispatch({
        type: GET_DESCRIPT,
        payload: data
      })
    })
  }
}

export function useDescript() {
  const dispatch = useDispatch()
  const item = useSelector(appState => appState.descState.description)
  const fetchDescript = id => dispatch(getDescription(id))

  return { item, fetchDescript }
}
