import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPizzaSlice } from "react-icons/fa";

import AddTask from "../AddTask";
import { toggleTheme } from "@/stores/theme/reducer";

import "./index.scss";

const Header = () => {
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);

  const { theme } = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  return (
    <header className="app-header">
      <nav>
        <div className="logo">
          <img src={theme === "dark" ? "/assets/logo.png" : "/assets/logo-bg.png"} alt="Todoist" />
        </div>
        <div className="settings">
          <ul>
            <li className="settings-add">
              <button
                type="button"
                onClick={() => {
                  setShouldShowMain(true);
                  setShowQuickAddTask(true);
                }}
              >
                +
              </button>
            </li>
            <li className="settings-darkmode">
              <button
                type="button"
                onClick={() => {
                  dispatch(toggleTheme());
                }}
              >
                <FaPizzaSlice />
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <AddTask
        showAddTaskMain={false}
        shouldShowMain={shouldShowMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    </header>
  );
};

export default Header;
