import { CREATE_ECOSYSTEM, GET_ECOSYSTEM_INFO } from '../actions';
// initialState
export const ecosystems: EcosystemState = {
  currentEcosystem: { name: "" }
}

export interface EcosystemAction { type: string; ecosystem: any; }
export interface EcosystemState { currentEcosystem: {name: string } }

export default function ecosystemReducer(state = ecosystems, action: EcosystemAction) : EcosystemState {
  switch (action.type) {
    case CREATE_ECOSYSTEM:
      return {...state, currentEcosystem: action.ecosystem};
    case GET_ECOSYSTEM_INFO:
      return {...state, currentEcosystem: action.ecosystem};
    default:
      return state;
  }
}
