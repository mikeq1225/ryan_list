import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"

const GET_ALL = "ex/GET_ALL"

const initialState = {
  cats: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL:
      return { ...state, cats: action.payload }
    default:
      return state
  }
}

function getAll() {
  return dispatch => {
    axios.get("/api/categories").then(resp => {
      const data = resp.data.cats
      dispatch({
        type: GET_ALL,
        payload: data
      })
    })
  }
}

export function useAllCats() {
  const dispatch = useDispatch()
  const cats = useSelector(appState => appState.catState.cats)

  useEffect(() => {
    dispatch(getAll())
  }, [dispatch])

  return { cats }
}
