import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import TimerPage from './components/TimerPage';
import IconsBar from './components/IconsBar';
import TaskList from './components/TaskList';
import FocusRecordsPage from './components/FocusRecordsPage';
import TaskDetailsPage from './components/TaskDetailsPage';
import TaskListPage from './components/TaskListPage';

interface OverlayProps {
  children: React.ReactNode;
}

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <TaskListPage />
        } />
        <Route path="/tasks" element={
          <TaskListPage />
        } />
        <Route path="/tasks/:taskId" element={
          <TaskDetailsPage />
        } />
        <Route path="/focus" element={
          <TimerPage />
        } />
        <Route path="/focus-records" element={
          <FocusRecordsPage />
        } />
        {/* Fallback route for 404 Not Found */}
        <Route path="*" element={
          <TaskListPage />
        } />
      </Routes>
    </Router>


  );
}

export default App;
