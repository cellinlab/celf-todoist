import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import AddTask from "../AddTask";
import Checkbox from "@/components/Checkbox";
import { fetchTasks } from "@/stores/projects/actionCreator";

import "./index.scss";

const Tasks = () => {
  const [projectName, setProjectName] = useState("");
  const { selectedProject, projects } = useSelector((state) => state.projects);
  const { tasks } = useSelector((state) => state.projects);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!["INBOX", "TODAY", "NEXT_7"].includes(selectedProject)) {
      const project = projects.find((project) => project.projectId === selectedProject);
      setProjectName(project.name);
    } else {
      setProjectName(selectedProject);
    }

    dispatch(fetchTasks(selectedProject));
  }, [selectedProject]);

  useEffect(() => {
    document.title = `${projectName}: Todoist`;
  }, [projectName]);

  return (
    <div className="tasks">
      <h2 className="project-name">{projectName}</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-list-item">
            <Checkbox id={task.id} task={task.task} />
            <span>{task.task}</span>
          </li>
        ))}
      </ul>
      <AddTask />
    </div>
  );
};

export default Tasks;
