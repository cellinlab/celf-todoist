import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import { FaRegListAlt, FaRegCalendarAlt } from "react-icons/fa";

import TaskDate from "./components/TaskDate";
import ProjectOverlay from "./components/ProjectOverlay";
import { addTask } from "@/api";
import { fetchTasks } from "@/stores/projects/actionCreator";

import "./index.scss";

const AddTask = (props) => {
  const { showAddTaskMain = true, shouldShowMain = false, showQuickAddTask } = props;
  const { setShowQuickAddTask } = props;

  const [task, setTask] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [project, setProject] = useState("");
  const [showMain, setShowMain] = useState(shouldShowMain);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);

  const { selectedProject } = useSelector((state) => state.projects);

  const dispatch = useDispatch();

  useEffect(() => {
    setTask("");
    setTaskDate("");
    setProject("");
    setShowMain(false);
    setShowProjectOverlay(false);
    setShowTaskDate(false);
  }, [showAddTaskMain]);

  const handleAddTask = async () => {
    const projectId = project || selectedProject;
    let collatedDate = "";

    if (projectId === "TODAY") {
      collatedDate = moment().format("DD/MM/YYYY");
    } else if (projectId === "NEXT_7") {
      collatedDate = moment().add(7, "days").format("DD/MM/YYYY");
    }

    if (task && projectId) {
      const newTask = {
        archived: false,
        projectId,
        task,
        date: collatedDate || taskDate,
      };

      await addTask(newTask);

      setTask("");
      setProject("");
      setShowMain(false);
      setShowProjectOverlay(false);

      dispatch(fetchTasks(projectId));
    }
  };

  const handleCancelQuickAddTask = () => {
    setShowMain(false);
    setShowProjectOverlay(false);
    setShowQuickAddTask(false);
  };

  const handleCancelAddTask = () => {
    setShowMain(false);
    setShowProjectOverlay(false);
  };

  const handleSubmitQuickAddTask = () => {
    handleAddTask();
    if (showQuickAddTask) {
      setShowQuickAddTask(false);
    }
  };

  const toggleShowProjectOverlay = () => {
    if (showTaskDate) {
      setShowTaskDate(false);
    }
    setShowProjectOverlay(!showProjectOverlay);
  };

  const toggleShowTaskDate = () => {
    if (showProjectOverlay) {
      setShowProjectOverlay(false);
    }
    setShowTaskDate(!showTaskDate);
  };

  return (
    <div className={`add-task ${showQuickAddTask ? "add-task-overlay" : ""}`}>
      {showAddTaskMain && (
        <div
          className="add-task-shallow"
          tabIndex={0}
          role="button"
          onClick={() => setShowMain(!showMain)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setShowMain(!showMain);
          }}
        >
          <span className="add-task-plus">+</span>
          <span className="add-task-text">Add Task</span>
        </div>
      )}
      {(showMain || showQuickAddTask) && (
        <div className="add-task-main">
          {showQuickAddTask && (
            <div>
              <h2 className="header">Quick Add Task</h2>
              <span
                className="add-task-cancel-x"
                aria-label="Cancel adding task"
                onClick={handleCancelQuickAddTask}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCancelQuickAddTask();
                  }
                }}
                tabIndex={0}
                role="button"
              >
                X
              </span>
            </div>
          )}
          <ProjectOverlay
            setProject={setProject}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
          />
          <TaskDate
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
          />
          <input
            className="add-task-content"
            aria-label="Enter your task"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button type="button" className="add-task-submit" onClick={handleSubmitQuickAddTask}>
            Add Task
          </button>
          {!showQuickAddTask && (
            <span
              className="add-task-cancel"
              onClick={handleCancelAddTask}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCancelAddTask();
                }
              }}
              aria-label="Cancel adding a task"
              tabIndex={0}
              role="button"
            >
              Cancel
            </span>
          )}
          <span
            className="add-task-project"
            onClick={toggleShowProjectOverlay}
            onKeyDown={(e) => {
              if (e.key === "Enter") toggleShowProjectOverlay();
            }}
            tabIndex={0}
            role="button"
          >
            <FaRegListAlt />
          </span>
          <span
            className="add-task-date"
            onClick={toggleShowTaskDate}
            onKeyDown={(e) => {
              if (e.key === "Enter") toggleShowTaskDate();
            }}
            tabIndex={0}
            role="button"
          >
            <FaRegCalendarAlt />
          </span>
        </div>
      )}
    </div>
  );
};

AddTask.propTypes = {
  showAddTaskMain: PropTypes.bool,
  shouldShowMain: PropTypes.bool,
  showQuickAddTask: PropTypes.bool,
  setShowQuickAddTask: PropTypes.func,
};

export default AddTask;
