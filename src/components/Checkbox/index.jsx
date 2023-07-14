import PropTypes from "prop-types";

import { updateTask } from "@/api";

import "./index.scss";

const Checkbox = ({ id, task }) => {
  const archiveTask = () => {
    updateTask(id, { archived: true });
  };

  return (
    <div
      className="checkbox-holder"
      role="button"
      aria-label={`Mark ${task} as done?`}
      tabIndex={0}
      onClick={() => archiveTask()}
      onKeyDown={(e) => {
        if (e.key === "Enter") archiveTask();
      }}
    >
      <span className="checkbox" />
    </div>
  );
};

Checkbox.propTypes = {
  id: PropTypes.number.isRequired,
  task: PropTypes.string.isRequired,
};

export default Checkbox;
