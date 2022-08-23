import { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    const val = localStorage.getItem("tokens");
    if (!val) window.location.href = "/login";
    else setIsLoggedIn(true);
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
