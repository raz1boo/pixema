import "./Settings.scss";
import cn from "classnames";
import { useState } from "react";
import Layout from "../../UI/Layout/Layout";

interface IUser {
  name: string;
  email: string;
}

interface ISettings {
  open: boolean;
  userData: IUser;
}

const Settings = ({ open, userData: { name, email } }: ISettings) => {
  const [value, setValue] = useState({ name: name, email: email });
  const [check, setCheck] = useState(true);
  return (
    <div className="main-block settings">
      <Layout>
        <div className={cn("profile", open && "open")}>
          <h2>Profile</h2>
          <div className={cn("changes-block", open && "open")}>
            <div className="profile-form">
              <p>Name</p>
              <input
                type="text"
                placeholder="Your name"
                value={value.name}
                onChange={(e) =>
                  setValue({ name: e.target.value, email: value.email })
                }
              />
            </div>
            <div className="profile-form">
              <p>Email</p>
              <input
                type="text"
                placeholder="Your email"
                value={value.email}
                onChange={(e) =>
                  setValue({ name: value.name, email: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="password">
          <h2>Password</h2>
          <div className="changes-block">
            <div className="old-password-block">
              <div className="password-form">
                <p>Password</p>
                <input type="text" placeholder="Your password" />
              </div>
            </div>
            <div className="new-password-block">
              <div className="password-form">
                <p>New password</p>
                <input type="text" placeholder="New password" />
              </div>
              <div className="password-form">
                <p>Confirm password</p>
                <input type="password" placeholder="Confirm password" />
              </div>
            </div>
          </div>
        </div>
        <div className="theme">
          <h2>Color mode</h2>
          <div className="changes-block">
            <div className="description">
              <p>Dark</p>
              <p>Use dark thema</p>
            </div>
            <div className="switch">
              <input
                id="toggle"
                className="toggle toggle-round"
                type="checkbox"
                checked={check}
                onChange={() => setCheck(!check)}
              />
              <label htmlFor="toggle"></label>
            </div>
          </div>
        </div>
        <div className="settings-footer">
          <button className="footer-button cancel">Cancel</button>
          <button className="footer-button save">Save</button>
        </div>
      </Layout>
    </div>
  );
};

export default Settings;
