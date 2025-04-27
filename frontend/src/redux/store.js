import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import { combineReducers } from 'redux';

import authReducer from './auth/authSlice';
import registerReducer from './auth/registerSlice';
import profileReducer from './auth/profileSlice';
import patientReducer from  './client/patientSlice'
import getServiceProblems from './client/fetchProblemSlice'
import fetchTaskReducer from './client/fetchTaskSlice';

// Combine all your slices
const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  profile: profileReducer,
  patients: patientReducer,
  getServiceProblems: getServiceProblems,
  fetchTask: fetchTaskReducer,
});

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // only persist auth slice (you can add more if needed)
};

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

// Create persistor
export const persistor = persistStore(store);
