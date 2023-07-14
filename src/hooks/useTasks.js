import { useState, useEffect } from "react";

import { getTasks } from "@/api";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks()
      .then((res) => {
        setTasks(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return {
    tasks,
    setTasks,
  };
}

export default useTasks;
