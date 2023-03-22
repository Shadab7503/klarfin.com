import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Loading from "../Dashboard/Loading";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "../../utils/components";
import axios from "axios";
import { Admin, AdminColumn, StringDict } from "../../utils/interface";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SuperAdminLayout from "../Layout/superAdminLayout";
import Investment from "./Investment";
import Form from "./Form";
import Users from "./Users";

const DashboardSuper = (props:any) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>("");
 

  useEffect(() => {
    let tokens = localStorage.getItem("superTokens");
    try {
      if (tokens) {
        const tokensObj = JSON.parse(tokens);
        setAccessToken(tokensObj.accessToken);
      } else window.location.href = "/loginSuper";
    } catch (err) {
      localStorage.removeItem("superTokens");
      window.location.href = "/loginSuper";
    }
  }, []);


  return (
    <BrowserRouter>
    <Routes>
  

      <Route path="/dashboardSuper/users" element={<SuperAdminLayout 
      user={{}} >
          <Users accessToken={accessToken} setIsLoggedIn={setIsLoggedIn}  />
          </SuperAdminLayout>} />
      <Route path="/dashboardSuper/investment" element={<SuperAdminLayout 
      user={{}} >
          <Investment accessToken={accessToken} />
          </SuperAdminLayout>} />
      <Route path="/dashboardSuper/add-investment" element={<SuperAdminLayout 
      user={{}} >
          <Form accessToken={accessToken} />
          </SuperAdminLayout>} />

          <Route path="/dashboardSuper/add-investment/:id" element={<SuperAdminLayout 
      user={{}} >
          <Form accessToken={accessToken} />
          </SuperAdminLayout>} />

<Route path="*" element={<Navigate to="/dashboardSuper/users" replace />} />

    
    </Routes>

  </BrowserRouter>
  );
};

export default DashboardSuper;
