import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import PomodoroTimer from './components/PomodoroTimer';
import IconsBar from './components/IconsBar';
import TaskList from './components/TaskList';

interface OverlayProps {
  children: React.ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({ children }) => {
  return (
    <div className="w-100 min-h-screen flex flex-col bg-black">
      <div className="flex flex-1 justify-center items-center">
        {children}
      </div>

      <IconsBar />
    </div>
  );
};

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Overlay>
            <TaskList />
          </Overlay>
        } />
        <Route path="/tasks" element={
          <Overlay>
            <TaskList />
          </Overlay>
        } />
        <Route path="/focus" element={
          <Overlay>
            <PomodoroTimer />
          </Overlay>
        } />
        {/* Fallback route for 404 Not Found */}
        <Route path="*" element={
          <Overlay>
            <TaskList />
          </Overlay>
        } />
      </Routes>
    </Router>


  );
}

export default App;
