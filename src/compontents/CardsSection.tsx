import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setAddCardModalOpen } from '../store/slices/cardsSlice';
import AddCardModal from './AddCardModal';
import CreditCardCarousel from './CreditCardCarousel';

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
      <div className="bg-white rounded-lg shadow-sm p-6">
        {activeTab === 'saved-cards' && (
          <div className="space-y-8">
            {creditCards.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Credit Cards</h2>
                {creditCards.length > 0 && (
                  <CreditCardCarousel cards={creditCards} />
                )}
              </div>
            )}

            {debitCards.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Debit Cards</h2>
                <CreditCardCarousel cards={debitCards} />
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
          </div>
        )}

        {activeTab === 'cd-cards' && (
          <div className="text-center py-12">
            <p className="text-gray-500">No CD Cards available</p>
          </div>
        )}
      </div>

      <AddCardModal />
    </>
  );
};

export default CardsSection;
