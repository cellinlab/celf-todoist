import { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { addProject } from "@/api";
import { generateId } from "@/helpers";
import { fetchProjects } from "@/stores/projects/actionCreator";

const AddProject = ({ isShow = false }) => {
  const [show, setShow] = useState(isShow);
  const [projectName, setProjectName] = useState("");

  const dispatch = useDispatch();

  const toogleShow = () => {
    setShow(!show);
  };

  const handleAddProject = async () => {
    if (projectName) {
      const res = await addProject({
        projectId: generateId(),
        name: projectName,
      });
      if (res && res.success) {
        dispatch(fetchProjects());
        setProjectName("");
        toogleShow();
      }
    }
  };

  return (
    <div className="add-project">
      {show && (
        <div className="add-project-input">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project name"
            className="add-project-name"
          />
          <button type="button" className="add-project-submit" onClick={handleAddProject}>
            Add Project
          </button>
          <span
            className="add-project-cancel"
            onClick={toogleShow}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                toogleShow();
              }
            }}
            role="button"
            tabIndex={0}
          >
            Cancel
          </span>
        </div>
      )}
      <span className="add-project-plus">+</span>
      <span
        className="add-project-text"
        onClick={toogleShow}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            toogleShow();
          }
        }}
        role="button"
        tabIndex={0}
      >
        Add Project
      </span>
    </div>
  );
};

AddProject.propTypes = {
  isShow: PropTypes.bool,
};

export default AddProject;
