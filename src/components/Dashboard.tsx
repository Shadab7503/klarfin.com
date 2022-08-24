import { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { host } from "../utils/variables";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
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
  if (isLoggedIn) return <h1>Dashboard</h1>;
  else
    return (
      <Backdrop sx={{ color: "white" }} open={true} onClick={() => {}}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
};

export default Dashboard;
