import Home from "./components/Main/Home/Home";
import About from "./components/Main/About/About";
import Contact from "./components/Main/Contact/Contact";
import Login from "./components/UserEntry/Login";
import LoginSuper from "./components/SuperAdmin/LoginSuper";
import DashboardSuper from "./components/SuperAdmin/DashboardSuper";
import SignUp from "./components/UserEntry/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import Verify from "./components/Verify/Verify";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/styles.css";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { User } from "./utils/interface";
import CashFlows from "./components/Dashboard/CashFlows";



const App = () => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [user, setUser] = useState<User>({} as User);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [checking,setChecking] = useState<boolean>(true);
  
  useEffect(() => {
    let tokens = localStorage.getItem("tokens");
    try {
      if (tokens) {
        const tokensObj = JSON.parse(tokens);
        setAccessToken(tokensObj.accessToken);
      }else {
        setChecking(false);
      }
    } catch (err) {
      localStorage.removeItem("tokens");
      // window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      axios
        .get(process.env.REACT_APP_BACKEND_HOST + "v1/admin/getAllDetails", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          if ("role" in response.data) {
            setUser(response.data);
            setIsLoggedIn(true);
            setChecking(false);

          } else {
            localStorage.removeItem("tokens");
            // window.location.href = "/";
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("tokens");
          // window.location.href = "/";
        });
    }
  }, [accessToken]);


  if (isLoggedIn) {
    return (
      <Dashboard accessToken={accessToken} user={user} />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login checking={checking} />} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/loginSuper" element={<LoginSuper />} />
        <Route path="/dashboardSuper" element={<DashboardSuper />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
