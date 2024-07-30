import { combineReducers} from 'redux';
import { legacy_createStore as createStore } from 'redux';
import userReducer from '../reducers/userReducer';
import {persistReducer, persistStore} from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
// import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  userData: persistReducer(persistConfig, userReducer),
});

export const store = createStore(rootReducer);
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;