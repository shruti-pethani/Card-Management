export interface Transaction {
  id: string;
  type: 'debit' | 'credit';
  description: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending';
  category: string;
}

export interface Card {
  id: string;
  type: 'credit' | 'debit';
  bankName: string;
  cardNumber: string;
  holderName: string;
  expiryDate: string;
  cvv: string;
  isActive: boolean;
  isDefault?: boolean;
  addedToGPay?: boolean;
  balance?: number;
  creditLimit?: number;
  cardBrand: 'mastercard' | 'visa' | 'rupay';
}

export interface AddCardFormData {
  name: string;
  bankName: string;
  cardType: 'credit' | 'debit';
  cardNumber: string;
  validTill: string;
  cvv: string;
  setAsDefault: boolean;
  addToGPay: boolean;
}