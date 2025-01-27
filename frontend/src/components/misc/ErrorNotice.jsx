import React from "react";
function ErrorNotice(props) {
  return (
    <div className="text-white px-6 py-4 my-2 border-0 rounded relative mb-4 bg-red-600">
      <span className="text-xl inline-block mr-5 align-middle">
        <i className="fas fa-bell" />
      </span>
      <span className="inline-block align-middle mr-8">{props.message}</span>
      <button className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none">
        <span onClick={props.clearError}>×</span>
      </button>
    </div>
  );
}
export default ErrorNotice;
