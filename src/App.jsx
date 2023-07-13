import { useSelector } from "react-redux";

import Header from "@/features/Header";
import Sidebar from "@/features/Sidebar";
import Tasks from "@/features/Tasks";

import "./App.scss";

const App = () => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <main className={`${theme === "dark" ? "dark-mode" : ""}`}>
      <Header />
      <section className="app-content">
        <Sidebar />
        <Tasks />
      </section>
    </main>
  );
};

export default App;
