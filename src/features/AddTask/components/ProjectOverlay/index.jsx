import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import "./index.scss";

const ProjectOverlay = (props) => {
  const { setProject, showProjectOverlay, setShowProjectOverlay } = props;

  const { projects } = useSelector((state) => state.projects);

  const handleSetProject = (projectId) => {
    setProject(projectId);
    setShowProjectOverlay(false);
  };

  return (
    projects &&
    showProjectOverlay && (
      <div className="project-overlay">
        <ul className="project-overlay-list">
          {projects.map((project) => (
            <li key={project.projectId}>
              <div
                role="button"
                tabIndex={0}
                aria-label="Select the task project"
                onClick={() => handleSetProject(project.projectId)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSetProject(project.projectId);
                }}
              >
                {project.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

ProjectOverlay.propTypes = {
  setProject: PropTypes.func.isRequired,
  showProjectOverlay: PropTypes.bool.isRequired,
  setShowProjectOverlay: PropTypes.func.isRequired,
};

export default ProjectOverlay;
