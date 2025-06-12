import React from 'react';
import { Home, CreditCard, ArrowLeftRight, Settings, LogOut } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setActiveMenuItem } from '../store/slices/uiSlice';
import logo from '../assets/logo.png';

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeMenuItem } = useAppSelector(state => state.ui);

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'cards', label: 'Cards', icon: CreditCard },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleMenuClick = (itemId: string) => {
    dispatch(setActiveMenuItem(itemId));
  };


  return (
    <div className="w-64 h-screen fixed top-0 left-0 bg-blue-900 text-white flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-blue-800">
        <div className="flex items-center space-x-3">
          {/* Logo */}
          <img src={logo} alt="Giriraj Digital" className="w-12 h-12 object-contain" />

          {/* Text */}
          <div>
            <h1 className="text-sm font-bold tracking-wide">GIRIRAJ DIGITAL</h1>
            
          </div>
        </div>
        <div className="text-xs text-blue-300 mt-2 content-center">
          <p>
            Software & Web Development
            Company - Umbraco Gold Partner
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeMenuItem === item.id
                      ? 'bg-blue-800 border-r-4 border-blue-400'
                      : 'hover:bg-blue-800'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-blue-800">
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-800 transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;