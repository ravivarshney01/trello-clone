import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/pages/Dashboard";
import UserContext from "./context/userContext";
import "./App.css";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const userRes = await axios.get("/api/user", {
        headers: { Authorization: "Bearer " + token },
      });
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      setUserData({
        token,
        user: userRes.data,
      });
    };
    checkLoggedIn();
  }, []);
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/:board_id/dashboard" component={Dashboard} />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
export default App;
