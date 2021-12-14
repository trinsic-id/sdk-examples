import { combineReducers } from 'redux';
import templateReducer, { templates } from './Templates';
import authenticationReducer, { authentication} from './Authentication';

export const initialState = {
  templates,
  authentication
}


const rootReducer = combineReducers({
  templates: templateReducer,
  authentication: authenticationReducer
})

export default rootReducer;
