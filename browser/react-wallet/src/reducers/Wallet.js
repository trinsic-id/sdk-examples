import { GET_WALLET_ITEMS, INSERTING_WALLET_ITEM, INSERTED_WALLET_ITEM } from '../actions';
// initialState
export const wallet = {
  items: [],
  insertingItem: false
}

export default function walletReducer(state = wallet, action) {
  switch (action.type) {
    case GET_WALLET_ITEMS:
      return Object.assign({}, state, {
        items: action.items
      })
    case INSERTING_WALLET_ITEM:
      return Object.assign({}, state, {
        insertingItem: true
      })
    case INSERTED_WALLET_ITEM: 
      return Object.assign({}, state, {
        insertingItem: false
      })
    default:
      return state;
  }
}
