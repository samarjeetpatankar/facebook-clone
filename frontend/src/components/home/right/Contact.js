import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios
import "./style.css";

export default function Contact() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/getallUsers`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="user-list-container">
      <h3>Start by adding these users</h3>
      <div className="user-list">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <Link to={`/profile/${user.username}`}>
              <img
                src={user.picture}
                alt={user.username}
                className="user-picture"
              />
              <p className="username">{user.username}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
