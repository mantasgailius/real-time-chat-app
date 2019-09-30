import React from 'react';
import './App.css';
import Dashboard from './Dashboard';
import Store from './Store';

const App: React.FC = () => {
  return (
    <div className="App">
        <Store>
        <Dashboard></Dashboard>
        </Store>
    </div>
  );
}

export default App;
