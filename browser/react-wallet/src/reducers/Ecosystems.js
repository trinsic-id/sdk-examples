import { CREATE_ECOSYSTEM, GET_ECOSYSTEM_INFO } from '../actions';
// initialState
export const ecosystems = {
  currentEcosytem: { name: "" }
}

export default function ecosystemReducer(state = ecosystems, action) {
  switch (action.type) {
    case CREATE_ECOSYSTEM:
      return Object.assign({}, state, {
        currentEcosytem: action.ecosystem
      });
    case GET_ECOSYSTEM_INFO:
      return Object.assign({}, state, {
        currentEcosytem: action.ecosystem
      });
    default:
      return state;
  }
}
