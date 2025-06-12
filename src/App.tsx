import { store } from './store/index';
import { Provider } from "react-redux";
import Dashboard from './compontents/Dashboard';
import Sidebar from './compontents/Sidebar';


function App() {
  return (
    <Provider store={store}>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="w-[calc(100%-256px)] ml-auto">
          <Dashboard />
        </div>
      </div>
    </Provider>
  );
}



export default App;