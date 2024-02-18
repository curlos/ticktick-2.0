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
import ModalAddTask from './components/modals/ModalAddTask';
import ModalDatePicker from './components/modals/ModalDatepicker';

const App = () => {
  useFetchTasks(); // This will fetch tasks when the component mounts
  const [isModalAddTaskOpen, setIsModalAddTaskOpen] = useState(true);
  // const [isModalDatePickerOpen, setIsModalDatePickerOpen] = useState(true);

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

      <ModalAddTask isModalOpen={isModalAddTaskOpen} setIsModalOpen={setIsModalAddTaskOpen} />
      {/* <ModalDatePicker isModalOpen={isModalDatePickerOpen} setIsModalOpen={setIsModalDatePickerOpen} /> */}
    </div>
  );
};

export default App;
