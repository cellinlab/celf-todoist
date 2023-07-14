import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaChevronDown, FaInbox, FaRegCalendarAlt, FaRegCalendar } from "react-icons/fa";

import Projects from "@/features/Projects";
import AddProject from "@/features/AddProject";
import { setSelectedProject } from "@/stores/projects/reducer";

import "./index.scss";

const Sidebar = () => {
  const [active, setActive] = useState("inbox");
  const [showProjects, setShowProjects] = useState(true);

  const dispatch = useDispatch();

  const handleChangeActive = (type) => {
    setActive(type);
    if (type === "inbox") {
      dispatch(setSelectedProject("INBOX"));
    } else if (type === "today") {
      dispatch(setSelectedProject("TODAY"));
    } else if (type === "next_7") {
      dispatch(setSelectedProject("NEXT_7"));
    }
  };

  const handleChangeShowProjects = () => {
    setShowProjects(!showProjects);
  };

  return (
    <div className="app-sidebar">
      <ul className="sidebar-generic">
        <li className={active === "inbox" ? "active" : ""}>
          <div
            tabIndex={0}
            role="button"
            onClick={() => handleChangeActive("inbox")}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleChangeActive("inbox");
              }
            }}
          >
            <span>
              <FaInbox />
            </span>
            <span>Inbox</span>
          </div>
        </li>
        <li className={active === "today" ? "active" : ""}>
          <div
            tabIndex={0}
            role="button"
            onClick={() => handleChangeActive("today")}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleChangeActive("today");
              }
            }}
          >
            <span>
              <FaRegCalendar />
            </span>
            <span>Today</span>
          </div>
        </li>
        <li className={active === "next_7" ? "active" : ""}>
          <div
            tabIndex={0}
            role="button"
            onClick={() => handleChangeActive("next_7")}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleChangeActive("next_7");
              }
            }}
          >
            <span>
              <FaRegCalendarAlt />
            </span>
            <span>Next 7 days</span>
          </div>
        </li>
      </ul>
      <div
        className="sidebar-middle"
        tabIndex={0}
        role="button"
        onClick={handleChangeShowProjects}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleChangeShowProjects();
          }
        }}
      >
        <span>
          <FaChevronDown className={showProjects ? "" : "hidden-projects"} />
        </span>
        <h2>Projects</h2>
      </div>
      <ul className="sidebar-projects">{showProjects && <Projects />}</ul>
      {showProjects && <AddProject />}
    </div>
  );
};

export default Sidebar;
