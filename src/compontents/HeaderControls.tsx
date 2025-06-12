// src/components/HeaderControls.tsx

import React from 'react';
import { Plus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setAddCardModalOpen } from '../store/slices/cardsSlice';
import { setActiveTab } from '../store/slices/uiSlice';

const HeaderControls: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeTab } = useAppSelector((state) => state.ui);

  const handleAddCard = () => {
    dispatch(setAddCardModalOpen(true));
  };

  return (
    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      {/* Tabs */}
      <div className="flex space-x-8">
        <button
          onClick={() => dispatch(setActiveTab('saved-cards'))}
          className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'saved-cards'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Saved Cards
        </button>
        <button
          onClick={() => dispatch(setActiveTab('cd-cards'))}
          className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'cd-cards'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          CD Cards
        </button>
      </div>

      {/* Add Card */}
      <button
        onClick={handleAddCard}
        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span className="text-sm font-medium">Add Card</span>
      </button>
    </div>
  );
};

export default HeaderControls;
