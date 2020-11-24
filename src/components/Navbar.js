import { Avatar } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";
function Navbar() {
  const [{ user }, dispatch] = useStateValue();
  const handleAuth = () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <div className="navbar">
      <div class="navbar_left">
        <img
          src="https://softwareengineeringdaily.com/wp-content/uploads/2018/02/1200px-Box_Inc._logo.svg_.png"
          alt=""
          className="drive_logo"
        />
      </div>

      <div class="navbar_right">
        <div class="navbar_input">
          <input
            type="text"
            className="navbar_search"
            placeholder="Search Files"
          />
          <Search className="navbar_searchIcon" />
        </div>
        {!user ? (
          <Link to="/login">
            <Avatar className="navbar_avatar" src={user?.photoURL} />
          </Link>
        ) : (
          <Link to="/login">
            <Avatar
              className="navbar_avatar"
              src={user?.photoURL}
              onClick={handleAuth}
            />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
