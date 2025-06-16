import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import formSlice from './auth/formSlice';
import storage from 'redux-persist/lib/storage';
import userSlice from './user/userSlice';
import countrySlice from './auth/countrySlice';
import quoteSlice from './auth/quoteSlice';
import quoteDataSlice from './auth/quoteDataSlice';
import bookingSlice from './booking/bookingSlice';
import addressSlice from './user/addressSlice';
const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  form: formSlice,
  country: countrySlice,
  user: userSlice,
  quote: quoteSlice,
  quoteData: quoteDataSlice,
  booking: bookingSlice,
  address: addressSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the type of makeStore
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
