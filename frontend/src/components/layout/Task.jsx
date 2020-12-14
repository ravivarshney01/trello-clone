import React from "react";

function Task({ task: { name }, handleClick }) {
  return (
    <div
      className="bg-white rounded-lg overflow-hidden  h-24 shadow-md cursor-pointer hover:shadow-xl my-4"
      onClick={handleClick}
    >
      <p className="p-4">{name}</p>
    </div>
  );
}

export default Task;
