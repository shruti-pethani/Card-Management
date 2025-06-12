import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setAddCardModalOpen } from '../store/slices/cardsSlice';
import CreditCard from './CreditCard';
import AddCardModal from './AddCardModal';

const CardsSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cards } = useAppSelector(state => state.cards);
  const { activeTab } = useAppSelector(state => state.ui);

  const creditCards = cards.filter(card => card.type === 'credit');
  const debitCards = cards.filter(card => card.type === 'debit');

  const handleAddCard = () => {
    dispatch(setAddCardModalOpen(true));
  };

  return (
    <>
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Content */}
        <div className="p-6 space-y-6">
          {activeTab === 'saved-cards' && (
            <>
              {/* Credit Cards */}
              {creditCards.length > 0 && (
                <div className="space-y-4">
                  {creditCards.map(card => (
                    <CreditCard key={card.id} card={card} />
                  ))}
                </div>
              )}

              {/* Debit Cards */}
              {debitCards.length > 0 && (
                <div className="space-y-4">
                  {debitCards.map(card => (
                    <CreditCard key={card.id} card={card} />
                  ))}
                </div>
              )}

              {creditCards.length === 0 && debitCards.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No saved cards available</p>
                  <button 
                    onClick={handleAddCard}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Add your first card
                  </button>
                </div>
              )}
            </>
          )}

          {activeTab === 'cd-cards' && (
            <div className="text-center py-12">
              <p className="text-gray-500">No CD Cards available</p>
            </div>
          )}
        </div>
      </div>

      <AddCardModal />
    </>
  );
};

export default CardsSection;