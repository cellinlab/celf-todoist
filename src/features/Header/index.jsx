import { FaPizzaSlice } from "react-icons/fa";

import "./index.scss";

const Header = () => {
  return (
    <header className="header">
      <nav>
        <div className="logo">
          <img src="/assets/logo-bg.png" alt="Todoist" />
        </div>
        <div className="settings">
          <ul>
            <li className="settings-add">
              <button type="button">+</button>
            </li>
            <li className="settings-darkmode">
              <button>
                <FaPizzaSlice />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
