import React from "react";

const Popover = ({ color, popoverShow, popoverRef, children }) => {
  return (
    <>
      <div
        className={
          (popoverShow ? "" : "hidden ") +
          " bg-white border-0 mt-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg shadow-xl"
        }
        ref={popoverRef}
      >
        {children}
      </div>
    </>
  );
};

export default Popover;
