import {AsyncStorage} from 'react-native';
import {applyMiddleware, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from '.';

const persistReducers = persistReducer(
  {key: 'ROOT_KEY', storage: AsyncStorage},
  rootReducer,
);

export const store = createStore(persistReducers, {}, applyMiddleware(thunk));

export const persistor = persistStore(store);
