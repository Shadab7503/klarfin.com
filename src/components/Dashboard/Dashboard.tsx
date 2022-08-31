import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import SideBar from "./SideBar";
import CashFlows from "./CashFlows";
import axios from "axios";
import { host } from "../../utils/variables";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>("Cash Flows");

  useEffect(() => {
    let tokens = localStorage.getItem("tokens");
    try {
      if (tokens) {
        const tokensObj = JSON.parse(tokens);
        const acccess_expiry = new Date(tokensObj.access.expires);
        const currentTime = new Date().getTime();
        if (acccess_expiry.getTime() < currentTime) {
          const refresh_expiry = new Date(tokensObj.refresh.expires);
          if (refresh_expiry.getTime() < currentTime) {
            localStorage.removeItem("tokens");
            window.location.href = "/login";
          } else {
            axios
              .post(host + "v1/admin/refresh-tokens", {
                refreshToken: tokensObj.refresh.token,
              })
              .then((response) => {
                localStorage.setItem("tokens", JSON.stringify(response.data));
                setIsLoggedIn(true);
              })
              .catch((err) => {
                localStorage.removeItem("tokens");
                window.location.href = "/login";
              });
          }
        } else {
          setIsLoggedIn(true);
        }
      } else window.location.href = "/login";
    } catch (err) {
      localStorage.removeItem("tokens");
      window.location.href = "/login";
    }
  }, []);
  if (isLoggedIn)
    return (
      <div className="dashboard">
        <Grid container className="dashboard-container">
          <SideBar
            selectedItem={selectedItem}
            drawerOpen={drawerOpen}
            setSelectedItem={setSelectedItem}
            setDrawerOpen={setDrawerOpen}
          />
          <CashFlows setDrawerOpen={setDrawerOpen} />
        </Grid>
      </div>
    );
  else
    return (
      <Backdrop sx={{ color: "white" }} open={true} onClick={() => {}}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
};

export default Dashboard;
