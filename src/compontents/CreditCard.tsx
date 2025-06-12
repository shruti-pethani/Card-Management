import React from 'react';
import { Eye, EyeOff, Lock, Archive, Check, Smartphone } from 'lucide-react';
import type { Card } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  toggleShowCardNumber,
  setCardAsDefault,
  toggleGPayStatus,
  toggleLockCard,
  toggleArchiveStatus,
} from '../store/slices/cardsSlice';
import logo from '../assets/mc.png';
import gpayLogo from '../assets/gpay.png';

interface CreditCardProps {
  card: Card;
}

const CreditCard: React.FC<CreditCardProps> = ({ card }) => {
  const dispatch = useAppDispatch();
  const { showCardNumber } = useAppSelector(state => state.cards);
  const isNumberVisible = showCardNumber === card.id;
  const isLocked = card.isLocked;
  const isArchived = card.isArchived;
  const addedToGPay = card.addedToGPay;
  const isDefault = card.isDefault;

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
    <div className="flex flex-col items-center">
      {/* Show/Hide Button */}
      <div className="mb-2 item-center">
        <button
          onClick={handleToggleCardNumber}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          {isNumberVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>{isNumberVisible ? 'Hide' : 'Show'} Card Number</span>
        </button>
      </div>

      {/* Card & Right Menu */}
      <div className="flex w-full items-start gap-4">
        {/* Card Visual */}
        <div
          className={`w-96 h-56 rounded-lg shadow-md p-6 text-white relative overflow-hidden flex-shrink-0 ${isLocked || isArchived ? 'opacity-40 grayscale pointer-events-none' : ''
            }`}
          style={{ backgroundColor: '#0D4060' }}
        >
          {/* Bank Logo */}
          <div className="absolute top-4 right-4">
            <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-xs font-bold text-gray-800">{card.bankName}</span>
            </div>
          </div>
          <div className="absolute top-4 left-4">
            {isLocked ? (
              <Lock className="w-5 h-5 text-white" />
            ) : isArchived ? (
              <Archive className="w-5 h-5 text-white" />
            ) : addedToGPay ? (
              <img src={gpayLogo} alt="GPay" className="w-5 h-5 rounded-full bg-white p-0.5" />
            ) : isDefault ? (
              <Check className="w-5 h-5 text-white" />
            )
              : null}
          </div>

          {/* Cardholder Name */}
          <div className="absolute top-16 left-6">
            <p className="text-lg font-semibold">{card.holderName}</p>
          </div>

          {/* Card Number */}
          <div className="absolute top-24 left-6">
            <p className="tracking-widest font-mono text-xl">
              {isNumberVisible ? formatCardNumber(card.cardNumber) : maskCardNumber(card.cardNumber)}
            </p>
          </div>

          {/* Valid Till & CVV */}
          <div className="absolute bottom-6 left-6 text-sm font-medium">
            <p>
              <span className="font-semibold">Valid Till :</span> {card.expiryDate}
            </p>
          </div>
          <div className="absolute bottom-6 left-48 text-sm font-medium">
            <p>
              <span className="font-semibold">CVV :</span> •••
            </p>
          </div>

          {/* Card Brand Logo */}
          <div className="absolute bottom-4 right-7 ">
            <img src={logo} alt="Card Brand" className="h-15 w-14 object-contain" />
          </div>
        </div>

        {/* Right Side Menu */}
        <div className="h-56 ml-5 flex flex-col justify-center bg-[#E4F3F9] rounded-lg p-6 gap-4 flex-shrink-0">
          <div className="grid grid-cols-2 gap-7">
            {/* Lock Card */}
            <button
              onClick={handleToggleLock}
              className="flex flex-col items-center space-y-1"
            >
              <div className={`w-10 h-10 rounded-full ${card.isLocked ? 'bg-gray-600' : 'bg-blue-500'} flex items-center justify-center`}>
                <Lock className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs">{card.isLocked ? 'Unlock Card' : 'Lock Card'}</span>
            </button>

            {/* Archive */}
            <button
              onClick={() => dispatch(toggleArchiveStatus(card.id))}
              className="flex flex-col items-center space-y-1"
            >
              <div className={`w-10 h-10 rounded-full ${card.isArchived ? 'bg-gray-600' : 'bg-blue-500'} flex items-center justify-center`}>
                <Archive className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs">{card.isArchived ? 'Archived' : 'Archive'}</span>
            </button>

            {/* Set As Default */}
            <button
              onClick={handleSetAsDefault}
              className="flex flex-col items-center space-y-1"
            >
              <div
                className={`w-10 h-10 rounded-full ${card.isDefault ? 'bg-gray-600' : 'bg-blue-500'
                  } flex items-center justify-center`}
              >
                <Check className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs">
                {card.isDefault ? 'Default' : 'Set As Default'}
              </span>
            </button>

            {/* Add to GPay */}
            <button
              onClick={handleToggleGPay}
              className="flex flex-col items-center space-y-1"
            >
              <div className="relative w-10 h-10">
                <img
                  src={gpayLogo}
                  alt="GPay"
                  className={`w-10 h-10 rounded-full object-cover transition duration-300`}
                />
                {addedToGPay && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white bg-opacity-30">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
              <span className="text-xs">
                {'Add to GPay'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
