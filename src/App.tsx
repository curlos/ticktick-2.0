import React, { useEffect, useState } from 'react';
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
import { arrayToObjectByKey } from './utils/Helpers';

interface OverlayProps {
  children: React.ReactNode;
}

function App() {

  const [allTasks, setAllTasks] = useState({});

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`http://localhost:8888/tasks`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const formattedTasksObj = arrayToObjectByKey(data, '_id');
      setAllTasks(formattedTasksObj);
    } catch (error) {
      console.error('There was a problem fetching tasks: ', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <TaskListPage tasks={allTasks} />
        } />
        <Route path="/tasks" element={
          <TaskListPage tasks={allTasks} />
        } />
        <Route path="/tasks/:taskId" element={
          <TaskDetailsPage tasks={allTasks} />
        } />
        <Route path="/focus" element={
          <TimerPage />
        } />
        <Route path="/focus-records" element={
          <FocusRecordsPage />
        } />
        {/* Fallback route for 404 Not Found */}
        <Route path="*" element={
          <TaskListPage tasks={allTasks} />
        } />
      </Routes>
    </Router>


  );
}

export default App;
