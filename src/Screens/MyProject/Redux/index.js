import {combineReducers} from 'redux';
import userReducer from './Reducer/userReducer';
import storage from 'redux-persist/lib/storage';

const appReducer = combineReducers({
  user: userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'DELETE_ALL_DATA') {
    storage.removeItem('persist: ROOT_KEY');
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
