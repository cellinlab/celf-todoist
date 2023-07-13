import moment from "moment";
import { FaSpaceShuttle, FaSun, FaRegPaperPlane } from "react-icons/fa";
import PropTypes from "prop-types";

import "./index.scss";

const TaskDate = (props) => {
  const { setTaskDate, showTaskDate, setShowTaskDate } = props;

  const handleSelectDate = (type) => {
    setShowTaskDate(false);
    switch (type) {
      case "today":
        setTaskDate(moment().format("DD/MM/YYYY"));
        break;
      case "tomorrow":
        setTaskDate(moment().add(1, "day").format("DD/MM/YYYY"));
        break;
      case "next_week":
        setTaskDate(moment().add(7, "days").format("DD/MM/YYYY"));
        break;
      default:
        break;
    }
  };

  return (
    showTaskDate && (
      <div className="task-date">
        <ul className="task-date-list">
          <li>
            <div
              role="button"
              tabIndex={0}
              aria-label="Select today as the task date"
              onClick={() => handleSelectDate("today")}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSelectDate("today");
              }}
            >
              <span>
                <FaSpaceShuttle />
              </span>
              <span>Today</span>
            </div>
          </li>
          <li>
            <div
              role="button"
              tabIndex={0}
              aria-label="Select tomorrow as the task date"
              onClick={() => handleSelectDate("tomorrow")}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSelectDate("tomorrow");
              }}
            >
              <span>
                <FaSun />
              </span>
              <span>Tomorrow</span>
            </div>
          </li>
          <li>
            <div
              role="button"
              tabIndex={0}
              aria-label="Select next week as the task date"
              onClick={() => handleSelectDate("next_week")}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSelectDate("next_week");
              }}
            >
              <span>
                <FaRegPaperPlane />
              </span>
              <span>Next week</span>
            </div>
          </li>
        </ul>
      </div>
    )
  );
};

TaskDate.propTypes = {
  setTaskDate: PropTypes.func.isRequired,
  showTaskDate: PropTypes.bool.isRequired,
  setShowTaskDate: PropTypes.func.isRequired,
};

export default TaskDate;
