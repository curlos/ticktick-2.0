import { useState } from 'react';
import './App.css';
import PomodoroTimer from './components/PomodoroTimer';
import Sidebar from './components/Sidebar';

function App() {

  return (
    <>
      <div className="w-100 min-h-screen bg-gray-950">
        <Sidebar />

        <div className="flex justify-center items-center">
          <PomodoroTimer />
        </div>
      </div>
    </>
  );
}

export default App;
