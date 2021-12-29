import { GET_WALLET_ITEMS } from '../actions';
// initialState
export const wallet = {
  items: []
}

export default function walletReducer(state = wallet, action) {
  switch (action.type) {
    case GET_WALLET_ITEMS:
      return Object.assign({}, state, {
        items: action.items
      })
    default:
      return state;
  }
}
