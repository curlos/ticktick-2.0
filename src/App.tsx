import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import TimerPage from './pages/TimerPage';
import FocusRecordsPage from './pages/FocusRecordsPage';
import TaskDetailsPage from './pages/TaskDetailsPage';
import TaskListPage from './pages/TaskListPage';
import useFetchTasks from './hooks/useFetchTasks';
import FocusStatsPage from './pages/FocusStatsPage';

const App = () => {
  useFetchTasks(); // This will fetch tasks when the component mounts

  return (
    <div className="select-none">
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
          <Route path="/focus-stats" element={
            <FocusStatsPage />
          } />
          {/* Fallback route for 404 Not Found */}
          <Route path="*" element={
            <TaskListPage />
          } />
        </Routes>
      </Router>

      {/* <ModalAddTask isModalOpen={isModalAddTaskOpen} setIsModalOpen={setIsModalAddTaskOpen} /> */}
    </div>
  );
};

export default App;
