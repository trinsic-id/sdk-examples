import { CREATE_ECOSYSTEM, GET_ECOSYSTEM_INFO } from '../actions';
// initialState
export const ecosystems = {
  currentEcosystem: { name: "" }
}

export interface EcosystemAction { type: string; ecosystem: any; }

export default function ecosystemReducer(state = ecosystems, action: EcosystemAction) {
  switch (action.type) {
    case CREATE_ECOSYSTEM:
      return Object.assign({}, state, {
        currentEcosystem: action.ecosystem
      });
    case GET_ECOSYSTEM_INFO:
      return Object.assign({}, state, {
        currentEcosystem: action.ecosystem
      });
    default:
      return state;
  }
}
