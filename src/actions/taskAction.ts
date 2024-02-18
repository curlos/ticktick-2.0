import { TaskObj } from "../types";

// In your actions file
export const addTaskAction = (task: TaskObj) => ({
    type: 'ADD_TASK',
    payload: task,
});
