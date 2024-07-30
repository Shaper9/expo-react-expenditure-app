import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../reducers/userReducer'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const persistConfig = {
  key: 'root',
  storage:AsyncStorage,
};
export const store = configureStore({
  reducer: {
    counter: persistReducer(persistConfig, counterReducer),
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch