import React from 'react';
import { Eye, EyeOff, Lock, Archive, Check, Smartphone } from 'lucide-react';
import type { Card } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  toggleShowCardNumber,
  setCardAsDefault,
  toggleGPayStatus,
  toggleLockCard,
} from '../store/slices/cardsSlice';

interface CreditCardProps {
  card: Card;
}

const CreditCard: React.FC<CreditCardProps> = ({ card }) => {
  const dispatch = useAppDispatch();
  const { showCardNumber, lockedCardId } = useAppSelector(state => state.cards);
  const isNumberVisible = showCardNumber === card.id;
  const isLocked = lockedCardId === card.id;

  const maskCardNumber = (number: string) => {
    return number.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '•••• •••• •••• $4');
  };

  const formatCardNumber = (number: string) => {
    return number.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const handleToggleCardNumber = () => {
    dispatch(toggleShowCardNumber(card.id));
  };

  const handleSetAsDefault = () => {
    dispatch(setCardAsDefault({ cardId: card.id, cardType: card.type }));
  };

  const handleToggleGPay = () => {
    dispatch(toggleGPayStatus(card.id));
  };

  const handleToggleLock = () => {
    dispatch(toggleLockCard(card.id));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {card.type === 'credit' ? 'Credit Cards' : 'Debit Cards'}
        </h3>
        <button
          onClick={handleToggleCardNumber}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          {isNumberVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>{isNumberVisible ? 'Hide' : 'Show'} Card Number</span>
        </button>
      </div>

      <div className="flex items-start space-x-6">
        {/* Card Visual */}
        <div
          className={`w-80 h-48 rounded-xl shadow-lg p-6 text-white relative overflow-hidden ${
            card.type === 'credit'
              ? 'bg-gradient-to-br from-blue-900 to-blue-700'
              : 'bg-gradient-to-br from-gray-800 to-gray-600'
          } ${isLocked ? 'opacity-40 grayscale pointer-events-none' : ''}`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 border border-white/20 rounded-full"></div>
          </div>

          {/* Bank Logo */}
          <div className="absolute top-4 right-4">
            <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-xs font-bold text-gray-800">{card.bankName}</span>
            </div>
          </div>

          {/* Card Brand */}
          <div className="absolute top-4 left-4">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">
                {card.cardBrand === 'mastercard' ? 'MC' : card.cardBrand === 'visa' ? 'V' : 'R'}
              </span>
            </div>
          </div>

          {/* Card Number */}
          <div className="absolute bottom-16 left-6 right-6">
            <p className="text-lg font-mono tracking-wider">
              {isNumberVisible ? formatCardNumber(card.cardNumber) : maskCardNumber(card.cardNumber)}
            </p>
          </div>

          {/* Cardholder Name and Expiry */}
          <div className="absolute bottom-6 left-6 right-6 flex justify-between">
            <div>
              <p className="text-xs opacity-80">CARDHOLDER NAME</p>
              <p className="text-sm font-semibold">{card.holderName}</p>
            </div>
            <div>
              <p className="text-xs opacity-80">VALID TILL</p>
              <p className="text-sm font-semibold">{card.expiryDate}</p>
            </div>
          </div>

          {/* CVV */}
          <div className="absolute bottom-6 right-20">
            <p className="text-xs opacity-80">CVV</p>
            <p className="text-sm font-semibold">•••</p>
          </div>
        </div>

        {/* Card Actions */}
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Lock Card */}
            <button
              onClick={handleToggleLock}
              className="flex flex-col items-center justify-center space-y-2 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isLocked ? 'bg-red-600' : 'bg-gray-600'}`}>
                <Lock className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {isLocked ? 'Locked' : 'Lock Card'}
              </span>
            </button>

            {/* Archive */}
            <button className="flex flex-col items-center justify-center space-y-2 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Archive className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Archive</span>
            </button>

            {/* Set As Default */}
            <button
              onClick={handleSetAsDefault}
              className={`flex flex-col items-center justify-center space-y-2 p-4 rounded-lg transition-colors ${
                card.isDefault ? 'bg-green-100 hover:bg-green-200' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  card.isDefault ? 'bg-green-500' : 'bg-blue-400'
                }`}
              >
                <Check className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {card.isDefault ? 'Default' : 'Set As Default'}
              </span>
            </button>

            {/* Add to GPay */}
            <button
              onClick={handleToggleGPay}
              className={`flex flex-col items-center justify-center space-y-2 p-4 rounded-lg transition-colors ${
                card.addedToGPay ? 'bg-green-100 hover:bg-green-200' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  card.addedToGPay ? 'bg-green-500' : 'bg-gradient-to-r from-red-500 to-yellow-500'
                }`}
              >
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {card.addedToGPay ? 'Added to GPay' : 'Add to GPay'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
