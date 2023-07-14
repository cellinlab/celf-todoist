import { createSlice } from "@reduxjs/toolkit";

import { fetchProjects, fetchTasks } from "./actionCreator";

const initialState = {
  projects: [],
  selectedProject: 'INBOX',
  tasks: [],
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setSelectedProject(state, action) {
      state.selectedProject = action.payload;
    },
    setProjects(state, action) {
      state.projects = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      });
  }
});

export const { setSelectedProject, setProjects } = projectsSlice.actions;

export default projectsSlice.reducer;
