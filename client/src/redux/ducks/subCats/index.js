import { useSelector, useDispatch } from "react-redux"
import axios from "axios"

const GET_LISTINGS = "ex/GET_LISTINGS"

const initialState = {
  listings: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LISTINGS:
      return { ...state, listings: action.payload }
    default:
      return state
  }
}

function getListings(slug) {
  return dispatch => {
    axios.get("/api/subs/" + slug).then(resp => {
      const data = resp.data
      dispatch({
        type: GET_LISTINGS,
        payload: data
      })
    })
  }
}

export function useListings() {
  const dispatch = useDispatch()
  const list = useSelector(appState => appState.listState.listings)
  const fetchListings = slug => dispatch(getListings(slug))

  return { list, fetchListings }
}
