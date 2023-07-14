import { createAsyncThunk } from "@reduxjs/toolkit"
import moment from "moment";

import { getProjects, getTasksByProject, getTaskInbox, getTasksByDate, getTasksNext7Days } from '@/api';

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async () => {
    try {
      const res = await getProjects();
      if (res && res.success) {
        return res.data;
      }
      throw new Error(res.error);
    } catch (error) {
      console.error(error)
      throw error;
    }
  }
);

export const fetchTasks = createAsyncThunk(
  'projects/fetchTasks',
  async (selectedProject = 'INBOX') => {
    try {
      if (selectedProject === "INBOX") {
        const res = await getTaskInbox();
        if (res && res.success) {
          return res.data;
        }
        throw new Error(res.error);
      } else if (selectedProject === "TODAY") {
        const res = await getTasksByDate(moment().format("DD/MM/YYYY"));
        if (res && res.success) {
          return res.data;
        }
        throw new Error(res.error);
      } else if (selectedProject === "NEXT_7") {
        const res = await getTasksNext7Days();
        if (res && res.success) {
          return res.data;
        }
        throw new Error(res.error);
      } else {
        const res = await getTasksByProject(selectedProject);
        if (res && res.success) {
          return res.data;
        }
        throw new Error(res.error);
      }
    } catch (error) {
      console.error(error)
      throw error;
    }
  }
);
