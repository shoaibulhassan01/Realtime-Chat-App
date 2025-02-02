// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage is localStorage
import { combineReducers } from 'redux';
import userReducer from './userSlice';
import messageReducer from './messageSlice';
import socketReducer from './socketSlice';

// Persist config
const persistConfig = {
    key: 'root', // Key to store persisted data in storage
    storage,     // Specify the storage engine
};

// Combine reducers
const rootReducer = combineReducers({
    user: userReducer,
    message: messageReducer,
    socket: socketReducer,
});

// Wrap the rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with persistedReducer
const store = configureStore({
    reducer: persistedReducer,
});

// Create a persistor to persist the store
export const persistor = persistStore(store);
export default store;
