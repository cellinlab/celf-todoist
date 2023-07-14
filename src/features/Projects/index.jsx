import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import IndividualProject from "./components/IndividualProject";
import { setSelectedProject } from "@/stores/projects/reducer";

const Projects = ({ activeValue }) => {
  const [active, setActive] = useState(activeValue);

  const { projects } = useSelector((state) => state.projects);

  const dispatch = useDispatch();

  const handleChangeActive = (projectId) => {
    setActive(projectId);
    dispatch(setSelectedProject(projectId));
  };

  return (
    projects &&
    projects.map((project) => (
      <li
        key={project.projectId}
        className={`sidebar-project ${active === project.projectId ? "active" : ""}`}
      >
        <div
          tabIndex={0}
          role="button"
          onClick={() => handleChangeActive(project.projectId)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleChangeActive(project.projectId);
            }
          }}
        >
          <IndividualProject project={project} />
        </div>
      </li>
    ))
  );
};

Projects.propTypes = {
  activeValue: PropTypes.string,
};

export default Projects;
