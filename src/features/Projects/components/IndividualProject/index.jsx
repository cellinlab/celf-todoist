import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import PropTypes from "prop-types";

import { setSelectedProject } from "@/stores/projects/reducer";
import { deleteProject } from "@/api";
import { fetchProjects } from "@/stores/projects/actionCreator";

const IndividualProject = ({ project }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const { projects } = useSelector((state) => state.projects);

  const dispatch = useDispatch();

  const handleDeleteProject = async (projectId) => {
    const res = await deleteProject(projectId);
    if (res && res.success) {
      dispatch(fetchProjects());
      dispatch(setSelectedProject("INBOX"));
    }
  };

  const toogleShowConfirm = () => {
    setShowConfirm(!showConfirm);
  };

  return (
    <>
      <span className="sidebar-dot">•</span>
      <span className="sidebar-project-name">{project.name}</span>
      <span
        className="sidebar-project-delete"
        onClick={toogleShowConfirm}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            toogleShowConfirm();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label="Confirm deletion of project"
      >
        <FaTrashAlt />
        {showConfirm && (
          <div className="project-delete-modal">
            <div className="project-delete-modal__inner">
              <p>Are you sure you want to delete this project?</p>
              <button type="button" onClick={() => handleDeleteProject(project.projectId)}>
                Delete
              </button>
              <span
                onClick={toogleShowConfirm}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    toogleShowConfirm();
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label="Cancel adding project, do not delete"
              >
                Cancel
              </span>
            </div>
          </div>
        )}
      </span>
    </>
  );
};

IndividualProject.propTypes = {
  project: PropTypes.object.isRequired,
};

export default IndividualProject;
