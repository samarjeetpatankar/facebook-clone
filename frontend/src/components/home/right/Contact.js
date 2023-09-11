import React, { useEffect, useState } from "react";

export default function Contact({ user }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/getProfile`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Data is not an array: ", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching users: ", error);
      });
  }, []);

  return (
    <div>
      {users.map((user) => (
        <div className="contact hover3" key={user._id}>
          <div className="contact_img">
            <img src={user.picture} alt="" />
          </div>
          <span>
            {user.first_name} {user.last_name}
          </span>
        </div>
      ))}
    </div>
  );
}
