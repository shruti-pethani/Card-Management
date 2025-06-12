import React, { useState } from 'react';
import { X, CreditCard } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { addCard, setAddCardModalOpen } from '../store/slices/cardsSlice';
import  type { AddCardFormData, Card } from '../types/index';

const AddCardModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAddCardModalOpen, cards } = useAppSelector(state => state.cards);
  
  const [formData, setFormData] = useState<AddCardFormData>({
    name: '',
    bankName: '',
    cardType: 'credit',
    cardNumber: '',
    validTill: '',
    cvv: '',
    setAsDefault: false,
    addToGPay: false,
  });

  const [errors, setErrors] = useState<Partial<AddCardFormData & { general: string }>>({});

  const validateCardNumber = (cardNumber: string): boolean => {
    // Remove spaces and check if it's 16 digits
    const cleanNumber = cardNumber.replace(/\s/g, '');
    if (!/^\d{16}$/.test(cleanNumber)) return false;
    
    // Luhn algorithm for card validation
    let sum = 0;
    let isEven = false;
    
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber[i]);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  };

  const validateExpiryDate = (date: string): boolean => {
    const regex = /^(0[1-9]|1[0-2])\/\d{4}$/;
    if (!regex.test(date)) return false;
    
    const [month, year] = date.split('/');
    const expiryDate = new Date(parseInt(year), parseInt(month) - 1);
    const currentDate = new Date();
    
    return expiryDate > currentDate;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<AddCardFormData & { general: string }> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length > 35) {
      newErrors.name = 'Name must be 35 characters or less';
    }

    // Bank name validation
    if (!formData.bankName.trim()) {
      newErrors.bankName = 'Bank name is required';
    }

    // Card type validation
    if (!formData.cardType) {
      newErrors.cardType = 'Card type is required';
    }

    // Card number validation
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!validateCardNumber(formData.cardNumber)) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }

    // Valid till validation
    if (!formData.validTill.trim()) {
      newErrors.validTill = 'Valid till is required';
    } else if (!validateExpiryDate(formData.validTill)) {
      newErrors.validTill = 'Please enter a valid future date (MM/YYYY)';
    }

    // CVV validation
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }

    // Default card validation
    if (formData.setAsDefault) {
      const hasDefaultCard = cards.some(card => card.type === formData.cardType && card.isDefault);
      if (hasDefaultCard) {
        newErrors.general = 'The selected card type already has a default card.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const cardBrand = formData.cardNumber.startsWith('4') ? 'visa' : 
                     formData.cardNumber.startsWith('5') ? 'mastercard' : 'rupay';

    const newCard: Card = {
      id: Date.now().toString(),
      type: formData.cardType,
      bankName: formData.bankName,
      cardNumber: formData.cardNumber.replace(/\s/g, ''),
      holderName: formData.name,
      expiryDate: formData.validTill,
      cvv: formData.cvv,
      isActive: true,
      isDefault: formData.setAsDefault,
      addedToGPay: formData.addToGPay,
      cardBrand,
    };

    dispatch(addCard(newCard));
    handleClose();
  };

  const handleClose = () => {
    dispatch(setAddCardModalOpen(false));
    setFormData({
      name: '',
      bankName: '',
      cardType: 'credit',
      cardNumber: '',
      validTill: '',
      cvv: '',
      setAsDefault: false,
      addToGPay: false,
    });
    setErrors({});
  };

  const handleCardNumberChange = (value: string) => {
    // Format card number with spaces
    const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    if (formatted.replace(/\s/g, '').length <= 16) {
      setFormData({ ...formData, cardNumber: formatted });
    }
  };

  const handleExpiryChange = (value: string) => {
    // Format MM/YYYY
    let formatted = value.replace(/\D/g, '');
    if (formatted.length >= 2) {
      formatted = formatted.substring(0, 2) + '/' + formatted.substring(2, 6);
    }
    setFormData({ ...formData, validTill: formatted });
  };

  if (!isAddCardModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Add New Card</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{errors.general}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter cardholder name"
              maxLength={35}
            />
            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bank Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.bankName}
              onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.bankName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter bank name"
            />
            {errors.bankName && <p className="text-sm text-red-600 mt-1">{errors.bankName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.cardType}
              onChange={(e) => setFormData({ ...formData, cardType: e.target.value as 'credit' | 'debit' })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.cardType ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
            {errors.cardType && <p className="text-sm text-red-600 mt-1">{errors.cardType}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.cardNumber}
              onChange={(e) => handleCardNumberChange(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.cardNumber ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="1234 5678 9012 3456"
            />
            {errors.cardNumber && <p className="text-sm text-red-600 mt-1">{errors.cardNumber}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Valid Till <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.validTill}
              onChange={(e) => handleExpiryChange(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.validTill ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="MM/YYYY"
              maxLength={7}
            />
            {errors.validTill && <p className="text-sm text-red-600 mt-1">{errors.validTill}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CVV <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={formData.cvv}
              onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.cvv ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="123"
              maxLength={4}
            />
            {errors.cvv && <p className="text-sm text-red-600 mt-1">{errors.cvv}</p>}
          </div>

          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.setAsDefault}
                onChange={(e) => setFormData({ ...formData, setAsDefault: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Set Card as Default</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.addToGPay}
                onChange={(e) => setFormData({ ...formData, addToGPay: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Add this card to GPay</span>
            </label>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCardModal;