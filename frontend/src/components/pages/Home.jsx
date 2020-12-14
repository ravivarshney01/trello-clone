import axios from "axios";
import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/userContext";
import Board from "../layout/Board";
import Popper from "popper.js";
import Popover from "../layout/Popover";
import ErrorNotice from "../../components/misc/ErrorNotice";

function Home() {
  const { userData } = useContext(UserContext);
  const [boards, setBoards] = useState([]);
  const [popoverShow, setPopoverShow] = useState(false);
  const btnRef = useRef();
  const popoverRef = useRef();
  const [name, setName] = useState("");
  const [error, setError] = useState();

  useEffect(() => {
    if (userData.user) {
      axios.get("/api/user/boards/" + userData.user._id).then(
        (res) => {
          setBoards(res.data);
        },
        (err) => {
          setError(err.response.data.error);
        }
      );
    }
  }, [userData]);

  const openPopover = () => {
    new Popper(btnRef.current, popoverRef.current, {
      placement: "bottom",
    });
    setPopoverShow(true);
  };
  const closePopover = () => {
    setPopoverShow(false);
  };
  const createBoard = () => {
    axios
      .post("/api/board/create/" + userData.user._id, {
        name: name,
      })
      .then(
        (res) => {
          closePopover();
          setName("");
          setBoards([...boards, res.data]);
        },
        (err) => {
          setError(err.response.data.error);
        }
      );
  };
  const children = (
    <>
      <div className="w-40 flex flex-col items-center ">
        <input
          type="text"
          name="name"
          id="name"
          className="m-2 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-10/12"
          placeholder="Board Name"
          style={{ transition: "all .15s ease" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* select */}
        <button
          className="bg-gray-800 text-gray-300 py-2 px-6 rounded-md my-4"
          onClick={() => createBoard()}
        >
          Create
        </button>
      </div>
    </>
  );
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      {userData.user ? (
        <div className="flex flex-col-reverse sm:flex-row">
          {/* left */}
          <div className="w-full sm:w-4/5">
            <p className="text-indigo-600 mb-3 text-4xl font-bold">Boards</p>

            <div
              className={`grid grid-flow-col grid-cols-3 grid-rows-${Math.ceil(
                boards.length / 3
              )}`}
            >
              {boards.length > 0 &&
                boards.map((board, i) => <Board board={board} key={i} />)}
            </div>
          </div>
          {/* right */}
          <div className="w-full sm:w-1/5">
            <button
              className="py-2 px-8 bg-indigo-600 rounded-lg text-white hover:bg-indigo-400 sm:float-right"
              ref={btnRef}
              onClick={() => {
                popoverShow ? closePopover() : openPopover();
              }}
            >
              Create Board
            </button>
            <Popover
              popoverRef={popoverRef}
              popoverShow={popoverShow}
              color="white"
              children={children}
            />
          </div>
        </div>
      ) : (
        <>
          <h2>You are not logged in</h2>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
}
export default Home;
