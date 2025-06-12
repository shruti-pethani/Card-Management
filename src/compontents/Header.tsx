import React from 'react';
import { ChevronRight, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Home</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Cards</span>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600" />
          </div>
          <span className="text-sm font-medium text-gray-900">John Watson</span>
        </div>
      </div>
    </div>
  );
};

export default Header;