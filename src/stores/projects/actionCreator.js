import { createAsyncThunk } from "@reduxjs/toolkit"

import { getProjects } from '@/api';

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
