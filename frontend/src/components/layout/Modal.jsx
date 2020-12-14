import React, { useEffect, useState, useRef } from "react";
// import Select from "react-select";
import { Multiselect } from "multiselect-react-dropdown";

function Modal({
  showModal,
  setShowModal,
  modalContent,
  saveTask,
  deleteTask,
  members,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stage, setStage] = useState("");
  const [options, setOptions] = useState();
  const [assignedMembers, setAssignedMembers] = useState([]);
  const multiRef = useRef();

  const stages = [
    { name: "Todo", code: "TODO" },
    { name: "In development", code: "INDEV" },
    { name: "To be review", code: "TOBEREVIEWD" },
    { name: "Finished", code: "FINISHED" },
  ];

  useEffect(() => {
    setName(modalContent.name || "");
    setDescription(modalContent.description || "");
    setStage(modalContent.stage);
    if (members && modalContent.assigned_members) {
      setAssignedMembers(modalContent.assigned_members);
      setOptions(members);
    }
  }, [modalContent, members]);

  const changeStage = (code) => {
    setStage(code);
    saveTask({
      ...modalContent,
      name: name,
      description: description,
      stage: code,
    });
  };

  return (
    <div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col  bg-white outline-none focus:outline-none p-4">
                <div className="flex flex-row">
                  <div className="w-9/12">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="name"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                        placeholder="Name of task"
                        style={{ transition: "all .15s ease" }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="members"
                    >
                      Assigned Members
                    </label>
                    <Multiselect
                      id="members"
                      options={options}
                      selectedValues={assignedMembers}
                      displayValue="name"
                      showCheckbox={true}
                      closeIcon="close"
                      ref={multiRef}
                    />
                    <div className="relative w-full my-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="description"
                      >
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows="4"
                        cols="80"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full resize-none"
                        placeholder="Description here..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-3/12 p-4 ml-2 flex flex-col items-start">
                    <p className="text-indigo-600 mt-1">Move To</p>
                    {stages.map((s, i) => (
                      <div key={i}>
                        {s.code === stage ? null : (
                          <button
                            className="w-32 py-1 my-2  bg-indigo-600 rounded-lg text-white hover:bg-indigo-400"
                            onClick={() => changeStage(s.code)}
                          >
                            {s.name}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="text-black-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => deleteTask({ ...modalContent })}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() =>
                      saveTask({
                        ...modalContent,
                        name: name,
                        description: description,
                        stage: stage,
                        assigned_members: multiRef.current.getSelectedItems(),
                      })
                    }
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default Modal;
