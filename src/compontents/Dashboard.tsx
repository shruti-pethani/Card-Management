import React from 'react';
import { useAppSelector } from '../hooks/redux';
import Header from './Header';
import CardsSection from './CardsSection';
import TransactionList from './TransactionList';
import CardDetails from './CardDetails';
import HeaderControls from './HeaderControls';

interface DashboardProps {
  onToggleSidebar?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onToggleSidebar }) => {
  const { activeMenuItem } = useAppSelector(state => state.ui);
  const breadcrumbMap: Record<string, string> = {
    home: 'Home',
    cards: 'Cards',
    transactions: 'Transactions',
    settings: 'Settings',
  };


  return (
    <div className="flex-1 bg-gray-50">
      <Header onToggleSidebar={onToggleSidebar} />
      <div className="px-6 pt-4 text-sm text-gray-600 flex items-center space-x-2">
        <span>Home</span>
        <span>{'>'}</span>
        <span className="text-gray-900 font-medium">
          {breadcrumbMap[activeMenuItem] || 'Dashboard'}
        </span>
      </div>

      <div className="p-6">
        {activeMenuItem === 'cards' && (
          <div className="space-y-6">
            <HeaderControls />
            <div className="flex gap-6">
              <div className="w-[40%] space-y-6">
                <CardDetails />
                <TransactionList />
              </div>
              <div className="flex-1 w-[60%]">
                <CardsSection />
              </div>
            </div>
          </div>
        )}

        {activeMenuItem === 'transactions' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Transactions</h2>
            <TransactionList />
          </div>
        )}

        {activeMenuItem === 'settings' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-gray-600">Settings panel will be implemented here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;