// src/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Get the stored string
const cachedTasks = localStorage.getItem('allTasks') ? JSON.parse(localStorage.getItem('allTasks') || "{}") : {};

// Define an initial state
const initialState = {
    tasks: cachedTasks,
};

// Create a slice for tasks with reducers to handle updating state
const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks(state, action) {
            state.tasks = action.payload;
        },
    },
});

export const { setTasks } = tasksSlice.actions;

// Create and configure the store
const store = configureStore({
    reducer: {
        tasks: tasksSlice.reducer,
    },
});

export default store;
