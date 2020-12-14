import React from "react";
import { useHistory } from "react-router-dom";

function Board({ board }) {
  const history = useHistory();
  const handleClick = () => {
    history.push("/" + board._id + "/dashboard");
  };
  return (
    <div
      className="bg-white rounded-lg overflow-hidden w-64 h-40 shadow-md cursor-pointer hover:shadow-xl m-4"
      onClick={handleClick}
    >
      <p className="p-4">{board.name}</p>
    </div>
  );
}

export default Board;
