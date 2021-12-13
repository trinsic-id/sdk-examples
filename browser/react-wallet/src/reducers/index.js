import templateReducer, { templates } from './Templates';
import { combineReducers } from 'redux';

export const initialState = {
  templates
}


const rootReducer = combineReducers({
  templates: templateReducer
})

export default rootReducer;
