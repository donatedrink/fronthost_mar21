import { configureStore } from '@reduxjs/toolkit';
import customerSlice from './customerAuthSlice';
import settingSlice from './settingSlice';
import systemLookups from './systemLookups';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'

let persistConfig = {
  key: 'root',
  storage: storage,
};

let combined_Reducers = combineReducers({
  customer: customerSlice,
  allsettings: settingSlice,
  systemLookups: systemLookups,
});

const persistedReducer = persistReducer(persistConfig, combined_Reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(),
});

export default store;
