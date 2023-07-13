import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [
    {
      name: "📥 Inbox",
      projectId: "INBOX",
    },
    {
      name: "📚 Books",
      projectId: "BOOKS",
    },
  ],
  selectedProject: 'INBOX',
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setSelectedProject(state, action) {
      state.selectedProject = action.payload;
    },
  },
});

export default projectsSlice.reducer;
