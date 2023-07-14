import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Header from "@/features/Header";
import Sidebar from "@/features/Sidebar";
import Tasks from "@/features/Tasks";

import { fetchProjects, fetchTasks } from "@/stores/projects/actionCreator";

import "./App.scss";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchTasks());
  }, [dispatch]);

  const { theme } = useSelector((state) => state.theme);
  return (
    <main className={`app-page ${theme === "dark" ? "dark-mode" : ""}`}>
      <Header />
      <section className="app-content">
        <Sidebar />
        <Tasks />
      </section>
    </main>
  );
};

export default App;
