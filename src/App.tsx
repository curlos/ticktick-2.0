import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import TimerPage from './components/TimerPage';
import FocusRecordsPage from './components/FocusRecordsPage';
import TaskDetailsPage from './components/TaskDetailsPage';
import TaskListPage from './components/TaskListPage';
import useFetchTasks from './hooks/useFetchTasks';
import ModalAddTask from './components/ModalAddTask';

const App = () => {
  useFetchTasks(); // This will fetch tasks when the component mounts
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div>
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

      <ModalAddTask isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default App;
