import React from "react";

import Header from "@/features/Header";
import Sidebar from "@/features/Sidebar";
import Tasks from "@/features/Tasks";

import "./App.scss";

const App = () => {
  return (
    <main>
      <Header />
      <section className="content">
        <Sidebar />
        <Tasks />
      </section>
    </main>
  );
};

export default App;
