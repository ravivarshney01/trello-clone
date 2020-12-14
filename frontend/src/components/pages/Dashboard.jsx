import React, { useEffect, useContext, useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";
import Task from "../layout/Task";
import Modal from "../layout/Modal";
import ErrorNotice from "../../components/misc/ErrorNotice";
import Popper from "popper.js";
import Popover from "../layout/Popover";
import { Multiselect } from "multiselect-react-dropdown";
import { Link } from "react-router-dom";

function Dashboard({ match }) {
  const { userData } = useContext(UserContext);
  const [board, setBoard] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [error, setError] = useState();
  const [popoverShow, setPopoverShow] = useState(false);
  const btnRef = useRef();
  const popoverRef = useRef();
  const [usersOptions, setUsersOptions] = useState([]);
  const [inputUser, setInputUser] = useState([]);
  const multiRef = useRef();

  useEffect(() => {
    if (userData.user) {
      axios
        .get("/api/board/" + match.params.board_id + "/" + userData.user._id)
        .then(
          (res) => {
            setBoard(res.data);
          },
          (err) => {
            setError(err.response.data.error);
          }
        );
      axios.get("/api/user/all/" + userData.user._id).then(
        (res) => {
          setUsersOptions(res.data);
        },
        (err) => {
          setError(err.response.data.error);
        }
      );
    }
  }, [userData, match]);

  useEffect(() => {
    setInputUser(board.members);
  }, [board]);

  const createTask = (stage) => {
    const new_task = {
      name: "New Task",
      description: "",
      assigned_members: [],
      stage: stage,
      board: match.params.board_id,
    };
    axios
      .post(
        "/api/board/" +
          match.params.board_id +
          "/" +
          userData.user._id +
          "/taskadd",
        new_task
      )
      .then(
        (res) => {
          setBoard({ ...board, tasks: [...board.tasks, res.data] });
        },
        (err) => {
          setError(err.response.data.error);
        }
      );
  };

  const editTask = (task) => {
    setShowModal(true);
    setModalContent(task);
  };

  const saveTask = (task) => {
    axios
      .post(
        "/api/board/" +
          match.params.board_id +
          "/" +
          userData.user._id +
          "/updatetask",
        { ...task, task_id: task._id }
      )
      .then(
        (res) => {
          const tasks = board.tasks;
          tasks[tasks.findIndex((t) => t._id === task._id)] = task;
          setBoard({ ...board, tasks: tasks });
          setShowModal(false);
          setModalContent({});
        },
        (err) => {
          setError(err.response.data.error);
        }
      );
  };

  const deleteTask = (task) => {
    axios
      .delete(
        "/api/board/" +
          match.params.board_id +
          "/" +
          userData.user._id +
          "/deletetask/" +
          task._id
      )
      .then(
        (res) => {
          console.log(res);
          const tasks = board.tasks;
          setBoard({
            ...board,
            tasks: tasks.filter((t) => t._id !== task._id),
          });
          setShowModal(false);
          setModalContent({});
        },
        (err) => {
          setError(err.response.data.error);
        }
      );
  };

  const openPopover = () => {
    new Popper(btnRef.current, popoverRef.current, {
      placement: "bottom",
    });
    setPopoverShow(true);
  };
  const closePopover = () => {
    setPopoverShow(false);
  };

  const addUsers = () => {
    if (inputUser.length > 0) {
      axios
        .post(
          "/api/board/" + match.params.board_id + "/add/" + userData.user._id,
          { ...board, members: multiRef.current.getSelectedItems() }
        )
        .then(
          (res) => {
            closePopover();
            setBoard({
              ...board,
              members: multiRef.current.getSelectedItems(),
            });
          },
          (err) => {
            setError(err.response.data.error);
          }
        );
    }
  };

  const children = (
    <div className="w-48 flex flex-col items-center">
      <Multiselect
        id="members"
        options={usersOptions}
        selectedValues={inputUser}
        displayValue="name"
        showCheckbox={true}
        closeIcon="close"
        ref={multiRef}
      />
      <button
        className="bg-gray-800 text-gray-300 py-2 px-6 rounded-md my-4"
        onClick={() => addUsers()}
      >
        Update
      </button>
    </div>
  );
  return (
    <>
      {userData.user ? (
        <div className="min-h-screen bg-gray-50">
          <div className="flex border-b-2 p-4 items-center">
            <p className="text-lg">{board.name}</p>
            <button
              className="py-2 px-8 bg-indigo-600 rounded-lg text-white hover:bg-indigo-400 ml-auto"
              ref={btnRef}
              onClick={() => {
                popoverShow ? closePopover() : openPopover();
              }}
            >
              Update Members
            </button>
            <Popover
              popoverRef={popoverRef}
              popoverShow={popoverShow}
              color="indigo"
              children={children}
            />
          </div>
          {error && (
            <ErrorNotice
              message={error}
              clearError={() => setError(undefined)}
            />
          )}
          <div className="flex">
            <div className="w-1/4  m-8">
              <p
                className="text-center bg-gray-800 text-gray-300 rounded-md py-2 px-4 hover:bg-gray-700 cursor-pointer"
                onClick={() => createTask("TODO")}
              >
                TODO
                <br />
                Click to add task
              </p>

              {board.tasks &&
                board.tasks
                  .filter((task) => task.stage === "TODO")
                  .map((task, i) => (
                    <Task
                      task={task}
                      handleClick={(e) => editTask(task)}
                      key={`todo-${i}`}
                    />
                  ))}
            </div>
            <div className="w-1/4 text-center mr-8 my-8">
              <p
                className="bg-gray-800 text-gray-300 rounded-md py-2 px-4 hover:bg-gray-700 cursor-pointer"
                onClick={(e) => createTask("INDEV")}
              >
                In Development
                <br />
                Click to add task
              </p>
              {board.tasks &&
                board.tasks
                  .filter((task) => task.stage === "INDEV")
                  .map((task, i) => (
                    <Task
                      task={task}
                      handleClick={(e) => editTask(task)}
                      key={`indev-${i}`}
                    />
                  ))}
            </div>
            <div className="w-1/4 text-center mr-8 my-8">
              <p
                className="bg-gray-800 text-gray-300 rounded-md py-2 px-4 hover:bg-gray-700 cursor-pointer"
                onClick={(e) => createTask("TOBEREVIEWD")}
              >
                To be review
                <br />
                Click to add task
              </p>
              {board.tasks &&
                board.tasks
                  .filter((task) => task.stage === "TOBEREVIEWD")
                  .map((task, i) => (
                    <Task
                      task={task}
                      handleClick={(e) => editTask(task)}
                      key={`tbr-${i}`}
                    />
                  ))}
            </div>
            <div className="w-1/4 text-center mr-8 my-8">
              <p
                className="bg-gray-800 text-gray-300 rounded-md py-2 px-4 hover:bg-gray-700 cursor-pointer"
                onClick={(e) => createTask("FINISHED")}
              >
                Finished
                <br />
                Click to add task
              </p>
              {board.tasks &&
                board.tasks
                  .filter((task) => task.stage === "FINISHED")
                  .map((task, i) => (
                    <Task
                      task={task}
                      handleClick={(e) => editTask(task)}
                      key={`finish-${i}`}
                    />
                  ))}
            </div>
          </div>
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            modalContent={modalContent}
            saveTask={saveTask}
            deleteTask={deleteTask}
            members={board.members}
          />
        </div>
      ) : (
        <>
          <h2>You are not logged in</h2>
          <Link to="/login">Login</Link>
        </>
      )}
    </>
  );
}

export default withRouter(Dashboard);
