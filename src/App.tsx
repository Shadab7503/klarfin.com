
import Login from "./components/UserEntry/Login";
import LoginSuper from "./components/SuperAdmin/LoginSuper";
import DashboardSuper from "./components/SuperAdmin/DashboardSuper";
import SignUp from "./components/UserEntry/SignUp";
import DashboardAdmin from "./components/Admin/DashboardAdmin";
import Verify from "./components/Verify/Verify";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/styles.css";

import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "./utils/interface";

//@ts-ignore
import {Helmet} from "react-helmet";
import ForgotPasswordAdmin from "./components/SuperAdmin/ForgotPassword";
import ForgotPasswordUser from "./components/Admin/ForgotPasswordAdmin";
import { useAppContext } from "./Store/AppContext";




const App = () => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [storeState,dispatch] = useAppContext();
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
        dispatch({type:"SET_ACCESSTOKEN",payload:tokensObj.accessToken})

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
            dispatch({type:"SET_USER" ,payload:response.data})
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
      <DashboardAdmin accessToken={accessToken} user={user} />
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
      <Route path="/loginSuper/forgot-password" element={<ForgotPasswordAdmin/>} />
      <Route path="/user/forgot-password"  element={<ForgotPasswordUser/>} />
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
