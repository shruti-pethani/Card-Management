import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './slices/cardsSlice';
import transactionsReducer from './slices/transactionsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    transactions: transactionsReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;