import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import  type { Transaction } from '../../types';

interface TransactionsState {
  transactions: Transaction[];
  todaysTransactions: Transaction[];
}

const initialState: TransactionsState = {
  transactions: [
    {
      id: '1',
      type: 'debit',
      description: 'Ordered Food',
      amount: 960.00,
      date: '30th May 2022',
      status: 'completed',
      category: 'Food & Dining',
    },
    {
      id: '2',
      type: 'credit',
      description: 'Ticket Refund',
      amount: 120.00,
      date: '30th May 2022',
      status: 'completed',
      category: 'Refund',
    },
    {
      id: '3',
      type: 'credit',
      description: 'Interest credited',
      amount: 8.50,
      date: '29th May 2022',
      status: 'completed',
      category: 'Interest',
    },
    {
      id: '4',
      type: 'debit',
      description: 'Electricity bill paid',
      amount: 1200.50,
      date: '28th May 2022',
      status: 'completed',
      category: 'Utilities',
    },
  ],
  todaysTransactions: [],
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
      const today = new Date().toDateString();
      if (new Date(action.payload.date).toDateString() === today) {
        state.todaysTransactions.unshift(action.payload);
      }
    },
    removeTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
      state.todaysTransactions = state.todaysTransactions.filter(t => t.id !== action.payload);
    },
  },
});

export const { addTransaction, removeTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;