import { store } from './store/index';
import { Provider } from 'react-redux';
import Dashboard from './compontents/Dashboard';
import Sidebar from './compontents/Sidebar';
import { useState } from 'react';

function App() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Provider store={store}>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar collapsed={isSidebarCollapsed} />
        <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-16 w-[calc(100%-64px)]' : 'ml-64 w-[calc(100%-256px)]'}`}>
          <Dashboard onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)} />
        </div>
      </div>
    </Provider>
  );
}



export default App;