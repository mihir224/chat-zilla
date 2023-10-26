import {configureStore,combineReducers} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = { //configuring persist
    key: 'root',
    version: 1,
    storage,
}

const rootReducer=combineReducers({user:userReducer});

const persistedReducer=persistReducer(persistConfig,rootReducer);

export const store=process.env.NODE_ENV==='production'?configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>  //middleware for persist
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
}):configureStore({
    reducer:rootReducer
})

export const persistor=persistStore(store)