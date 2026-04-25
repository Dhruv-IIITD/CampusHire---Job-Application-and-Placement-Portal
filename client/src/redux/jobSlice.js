import { createSlice } from "@reduxjs/toolkit";

const storedSavedJobs = localStorage.getItem("savedJobs")
  ? JSON.parse(localStorage.getItem("savedJobs"))
  : [];

const initialState = {
  savedJobs: storedSavedJobs,
  currentJob: null,
};

const persistSavedJobs = (savedJobs) => {
  localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobDetails(state, action) {
      state.currentJob = action.payload;
    },
    saveJob(state, action) {
      const jobToSave = action.payload;
      if (!state.savedJobs.find((job) => job.id === jobToSave.id)) {
        state.savedJobs.push(jobToSave);
        persistSavedJobs(state.savedJobs);
      }
    },
    removeSavedJob(state, action) {
      state.savedJobs = state.savedJobs.filter((job) => job.id !== action.payload);
      persistSavedJobs(state.savedJobs);
    },
    clearSavedJobs(state) {
      state.savedJobs = [];
      persistSavedJobs([]);
    },
  },
});

export const { setJobDetails, saveJob, removeSavedJob, clearSavedJobs } = jobSlice.actions;
export default jobSlice.reducer;
