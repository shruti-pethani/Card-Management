import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Card } from '../../types/index';

interface CardsState {
  cards: Card[];
  selectedCard: Card | null;
  showCardNumber: string | null;
  isAddCardModalOpen: boolean;
  isLocked?: boolean;
  isArchived?: boolean;
}

const initialState: CardsState = {
  cards: [
    {
      id: '1',
      type: 'credit',
      bankName: 'HDFC',
      cardNumber: '5234567890123456',
      holderName: 'John Watson',
      expiryDate: '07/26',
      cvv: '123',
      isActive: true,
      isDefault: true,
      addedToGPay: false,
      creditLimit: 150000,
      balance: 50000,
      cardBrand: 'mastercard',
    },
    {
      id: '2',
      type: 'debit',
      bankName: 'HDFC',
      cardNumber: '4234567890123456',
      holderName: 'John Watson',
      expiryDate: '12/25',
      cvv: '456',
      isActive: true,
      isDefault: true,
      addedToGPay: true,
      balance: 25000,
      cardBrand: 'visa',
    }
  ],
  selectedCard: null,
  showCardNumber: null,
  isAddCardModalOpen: false,
  isLocked: false,
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<Card>) => {
      if (action.payload.isDefault) {
        state.cards.forEach(card => {
          if (card.type === action.payload.type) {
            card.isDefault = false;
          }
        });
      }
      state.cards.push(action.payload);
    },
    removeCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter(card => card.id !== action.payload);
    },
    toggleCardStatus: (state, action: PayloadAction<string>) => {
      const card = state.cards.find(card => card.id === action.payload);
      if (card) {
        card.isActive = !card.isActive;
      }
    },
    selectCard: (state, action: PayloadAction<Card | null>) => {
      state.selectedCard = action.payload;
    },
    toggleShowCardNumber: (state, action: PayloadAction<string>) => {
      state.showCardNumber = state.showCardNumber === action.payload ? null : action.payload;
    },
    setAddCardModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAddCardModalOpen = action.payload;
    },
    setCardAsDefault: (state, action: PayloadAction<{ cardId: string; cardType: 'credit' | 'debit' }>) => {
      state.cards.forEach(card => {
        if (card.type === action.payload.cardType) {
          card.isDefault = false;
        }
      });
      const card = state.cards.find(card => card.id === action.payload.cardId);
      if (card) {
        card.isDefault = true;
      }
    },
    toggleGPayStatus: (state, action: PayloadAction<string>) => {
      const card = state.cards.find(card => card.id === action.payload);
      if (card) {
        card.addedToGPay = !card.addedToGPay;
      }
      console.log(`Card with ID ${action.payload} GPay status toggled to ${card?.addedToGPay}`);
    },
    toggleArchiveStatus: (state, action: PayloadAction<string>) => {
  const card = state.cards.find(card => card.id === action.payload);
  if (card) {
    card.isArchived = !card.isArchived;
  }
},
    toggleLockCard: (state, action: PayloadAction<string>) => {
      const card = state.cards.find(card => card.id === action.payload);
      if (card) {
        card.isLocked = !card.isLocked;
      }
    },
  },
});

export const {
  addCard,
  removeCard,
  toggleCardStatus,
  selectCard,
  toggleShowCardNumber,
  setAddCardModalOpen,
  setCardAsDefault,
  toggleGPayStatus,
  toggleLockCard, 
  toggleArchiveStatus
} = cardsSlice.actions;

export default cardsSlice.reducer;
