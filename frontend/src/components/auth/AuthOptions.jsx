import axios from "axios";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();
  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = async () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    await axios.get("/api/logout");
    localStorage.setItem("auth-token", "");
  };
  return (
    <nav className="auth-options">
      {userData.user ? (
        <button
          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          onClick={logout}
        >
          Logout
        </button>
      ) : (
        <>
          <button
            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            onClick={register}
          >
            Sign Up
          </button>
          <button
            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            onClick={login}
          >
            Login
          </button>
        </>
      )}
    </nav>
  );
}
export default AuthOptions;
