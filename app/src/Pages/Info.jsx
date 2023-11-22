import { useState } from "react";
import { useOutletContext } from "react-router-dom";
// import { currentUserContext } from "../components/HomeLayout";

function Info() {
  const [currentUser, setCurrentUser] = useOutletContext();

  function handleChangeInfo() {}

  const renderUserDetail = (data, parentKey = "") => {
    return Object.keys(data).map((key) => {
      const item = data[key];
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof item === "object" && item !== null && !Array.isArray(item)) {
        return renderUserDetail(item, newKey);
      } else {
        return (
          <p key={newKey}>
            <strong>{newKey}:</strong>
            <span>{item}</span>
            <button onClick={handleChangeInfo}>Edit</button>
          </p>
        );
      }
    });
  };

  return (
    <div>
      <h1>User Details</h1>
      {renderUserDetail(currentUser)}
    </div>
  );
}

export default Info;
