// Import React and any other necessary libraries
import React, { useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import * as image from "../assats";
import "./UserSearch.scss";

const UserSearch = () => {
  const initialUsers = [
    { id: 1, name: "Arpan", email: "arpan@example.com", image: image.image2 },
    {
      id: 2,
      name: "Upendra",
      email: "upendra@example.com",
      image: image.image1,
    },
    { id: 3, name: "Chetan", email: "chetan@example.com", image: image.image3 },
    {
      id: 4,
      name: "Himanshu",
      email: "himanshu@example.com",
      image: image.image2,
    },
    { id: 5, name: "Sahil", email: "sahil@example.com", image: image.image3 },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [searchInput, setSearchInput] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleUserClick = (user) => {
    const updatedUsers = users.filter((u) => u !== user);
    const updatedSelectedUsers = [...selectedUsers, user];

    setUsers(updatedUsers);
    setSelectedUsers(updatedSelectedUsers);
    setSearchInput("");
  };

  const handleChipRemove = (user) => {
    const updatedUsers = [...users, user];
    const updatedSelectedUsers = selectedUsers.filter((u) => u !== user);

    setUsers(updatedUsers);
    setSelectedUsers(updatedSelectedUsers);
  };

  const handleBackspace = (event) => {
    if (event.key === "Backspace" && searchInput === "") {
      const lastSelectedUser = selectedUsers[selectedUsers.length - 1];

      if (lastSelectedUser) {
        handleChipRemove(lastSelectedUser);
      }
    }
  };

  return (
    <div className="user-container">
      <h1 className="user-heading">Pick Users</h1>
      <div className="searchBar">
        <div className="chips">
          {selectedUsers.map((user) => (
            <div key={user.id} className="chip">
              {user.image ? (
                <img src={user.image} alt={user.name} />
              ) : (
                <BsPersonFill />
              )}
              {user.name}{" "}
              <span onClick={() => handleChipRemove(user)}>
                <IoCloseSharp />
              </span>
            </div>
          ))}
        </div>{" "}
        <input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          onKeyDown={handleBackspace}
          placeholder="Search users..."
        />
      </div>

      {searchInput && (
        <ul className="users-list">
          {users
            .filter((user) =>
              user.name.toLowerCase().includes(searchInput.toLowerCase())
            )
            .map((user) => (
              <li key={user.id} onClick={() => handleUserClick(user)}>
                {user.image ? (
                  <img src={user.image} alt={user.name} />
                ) : (
                  <BsPersonFill />
                )}
                {user.name} ({user.email})
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default UserSearch;
