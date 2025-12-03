import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authslice.js";
import jobSlice from "./jobslice.js";
import companySlice from './companySlice.js'
import applicationSlice from './applicantsSlice.js'

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("appState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.error("Load state error:", error);
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const stateToSave = {
      auth: state.auth, // Persist only auth slice
    };
    localStorage.setItem("appState", JSON.stringify(stateToSave));
  } catch (error) {
    console.error("Save state error:", error);
  }
};

// Configure the store
const store = configureStore({
  reducer: {
    auth: authSlice,
    job: jobSlice,
    company:companySlice,
    applicants:applicationSlice
  },
  preloadedState: loadState(), // Load persisted state on startup
});

// Subscribe to store changes and persist state
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
