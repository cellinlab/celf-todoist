import { configureStore } from '@reduxjs/toolkit'

import themeReducer from './theme/reducer';
import projectsReducer from './projects/reducer';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    projects: projectsReducer,
  }
})

export default store;
