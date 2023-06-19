
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

//@ts-ignore
import {Helmet} from "react-helmet";




const App = () => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [superAccessToken, setSuperAccessToken] = useState<string>("");
  const [user, setUser] = useState<User>({} as User);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [checking,setChecking] = useState<boolean>(true);

  const [isSuperLoggedIn,setIsSuperLoggedIn] =  useState<boolean>(false);

  
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
            console.log(response.data);
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

  useEffect(() => {
    let tokens = localStorage.getItem("superTokens");
    try {
      if (tokens) {
        const tokensObj = JSON.parse(tokens);
        setIsSuperLoggedIn(true);
        setSuperAccessToken(tokensObj.accessToken);
      } 
    } catch (err) {
      localStorage.removeItem("superTokens");
      // window.location.href = "/loginSuper";
    }
  }, []);


  let jsx;
  if (isLoggedIn) {
    jsx =  (
      <Dashboard accessToken={accessToken} user={user} />
    );
  }

  else if(isSuperLoggedIn) {
    jsx =  <DashboardSuper  />
  }
  
  else {
    jsx =  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login checking={checking} />} />
      {/* <Route path="/about" element={<About />} /> */}
      {/* <Route path="/contact" element={<Contact />} /> */}
      {/* <Route path="/home" element={<Home />} /> */}
      <Route path="/loginSuper" element={<LoginSuper />} />

      <Route path="/register" element={<SignUp />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
  }


  return <div>
     <Helmet>
     <script type="text/javascript" defer src="//cdn.mouseflow.com/projects/c7854091-7e49-48fa-a4f6-3846521a9ac4.js"></script>
            </Helmet>

    {
      jsx
    }
  </div>;
};

export default App;
