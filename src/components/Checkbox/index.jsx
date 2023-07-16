import PropTypes from "prop-types";

import { updateTask } from "@/api";

import "./index.scss";

const Checkbox = (props) => {
  const { id, task, isArchived } = props;
  const { onUpdate } = props;
  const archiveTask = async () => {
    await updateTask(id, { archived: !isArchived });
    onUpdate();
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
      <span className={`checkbox ${isArchived ? "is-completed" : ""}`} />
    </div>
  );
};

Checkbox.propTypes = {
  id: PropTypes.number.isRequired,
  task: PropTypes.string.isRequired,
};

export default Checkbox;
