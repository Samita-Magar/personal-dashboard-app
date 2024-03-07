import React from 'react';
import WeatherWidget from './components/WeatherWidget';
import NewsWidget from './components/NewsWidget';
import TaskManager from './components/TaskManager';

import './App.css';

const App = () => {
  return (
    <div>
      <header className="dashboard-header">
        <h1>My Personal Dashboard</h1>
      </header>
      <div className="dashboard">
          <WeatherWidget apiKey="2b4ef22c307ee4526a4bb46699a964a8" location="sydney" />
        <TaskManager />
        <NewsWidget apiKey="ae936b8c1b6f4246b4897cb9f284f8a2" country="au" />
        
      </div>
    </div>
  );
};

export default App;
