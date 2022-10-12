import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import CashFlows from "./CashFlows";
import Settings from "./Settings";
import Loading from "./Loading";
import axios from "axios";
import { host } from "../../utils/variables";
import { User } from "../../utils/interface";

const selectedItemComponents: {
  [key: string]: JSX.Element;
} = {
  "Cash Flows": <CashFlows />,
  Settings: <Settings />,
};

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>("Settings");
  const [user, setUser] = useState<User>({} as User);

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
                setAccessToken(response.data.access.token);
              })
              .catch(() => {
                localStorage.removeItem("tokens");
                window.location.href = "/login";
              });
          }
        } else {
          setAccessToken(JSON.parse(tokens).access.token);
        }
      } else window.location.href = "/login";
    } catch (err) {
      localStorage.removeItem("tokens");
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      axios
        .get(host + "v1/admin/getAllDetails", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          setUser(response.data);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("tokens");
          window.location.href = "/login";
        });
    }
  }, [accessToken]);

  if (isLoggedIn)
    return (
      <div className="dashboard">
        <Grid container className="dashboard-container">
          <Grid item lg="auto" md={2.5}>
            <SideBar
              selectedItem={selectedItem}
              drawerOpen={drawerOpen}
              setSelectedItem={setSelectedItem}
              setDrawerOpen={setDrawerOpen}
            />
          </Grid>
          <Grid
            item
            lg={true}
            md={9.5}
            xs={12}
            style={{ maxHeight: "100vh", overflow: "auto" }}
          >
            <Grid container>
              <Grid item xs={12}>
                <TopBar
                  setDrawerOpen={setDrawerOpen}
                  setSelectedItem={setSelectedItem}
                  companyName={user.companyName}
                />
              </Grid>
              <Grid item xs={12}>
                {selectedItemComponents[selectedItem]}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  else return <Loading />;
};

export default Dashboard;
