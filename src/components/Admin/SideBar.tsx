import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Drawer from "@mui/material/Drawer";
import cashflows from "../../images/cashflows.png";
import insights from "../../images/insights.png";
import receivables from "../../images/receivables.png";
import bills from "../../images/bills.png";
import banking from "../../images/banking.png";
import { AccountBalance, PowerSettingsNew, Receipt, Call, AccountBalanceWallet } from '@mui/icons-material';
import logout from "../../images/logout.png";
import { sidebarUtils } from "../../utils/interface";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../Store/AppContext";

const SideBar = (props: sidebarUtils) => {
  const navigate = useNavigate();
  const [storeState, dispatch] = useAppContext()
  const sidebarData = {
    sections: [
      {
        name: "",
        items: [
          { icon: AccountBalance, text: "Home", isClickable: true, url: "/dashboardAdmin/investing" },
          { icon: AccountBalanceWallet, text: "Invest", isClickable: true, url: `/dashboardAdmin/nse/order/${storeState.ACTIVEINVETOR?.folio.Folio}` },
          { icon: Receipt, text: "Transaction History", isClickable: true, url: `/dashboardAdmin/investment/nse/details/${storeState.ACTIVEINVETOR?.folio.Folio}` },
          { icon: Call, text: "Contact Support", isClickable: true, url: "/dashboardAdmin/contact" },
        ],
      },
    ],
  };

  const url = window.location.href;
  const lastSegment = url.split("/").pop();
  useEffect(() => {
    const sections = sidebarData.sections;
    sections.forEach(each => {
      each.items.forEach(each => {
        if (each.url == lastSegment) {
          props.setSelectedItem(each.text);
        }
      });
    });
  }, [lastSegment]);
  const Logout = () => {
    if (localStorage.getItem("tokens")) {
      const tokensObj = JSON.parse(localStorage.getItem("tokens")!);
      axios.post(process.env.REACT_APP_BACKEND_HOST + "v1/admin/logout", {
        refreshToken: tokensObj.refreshToken,
      });
    }
    localStorage.removeItem("tokens");
    window.location.href = "/";
  };

  const sidebar = (
    <Grid item xs={12} className="dashboard-sidebar">
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item className="dashboard-sidebar-section">
          <Grid container alignItems="center" sx={{ display: "flex", height: "100vh", justifyContent: "space-between", alignItems: 'flex-start' }}>
            <Grid sx={{ minHeight: "80vh" }}>
              <Grid className="sidebar-logo logo">KLARFIN</Grid>
              {sidebarData.sections.map((section) => {
                return (
                  <React.Fragment key={section.name}>
                    <Grid
                      container
                      px={1}
                      py={1}
                      className="dashboard-section-heading"
                      style={{
                        cursor: "pointer",
                        borderRadius: "4px",
                        background:
                          section.name === props.selectedItem
                            ? "white"
                            : "inherit",
                        color:
                          section.name === props.selectedItem
                            ? "#3594d4"
                            : "white",
                        boxShadow:
                          section.name === props.selectedItem
                            ? "inset 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)"
                            : "0px 0px",
                      }}
                      onClick={() =>
                        section.name === "Credit Management"
                          ? (props.setSelectedItem(section.name),
                            props.setDrawerOpen(false))
                          : null
                      }
                    >
                      {section.name}
                    </Grid>
                    <Grid container pl={1}>
                      <List className="section-items" >

                        {section.items.map(item => {
                          return (
                            <React.Fragment key={item.text}>
                              {item.isClickable ?
                                <ListItem
                                  style={{
                                    padding: "0rem",
                                    cursor: "pointer",
                                    textDecoration: 'none',
                                    height: "50px",
                                    gap: "10px"
                                  }}
                                  onClick={() => {
                                    navigate(item.url)
                                    props.setSelectedItem(item.text);
                                    props.setDrawerOpen(false);
                                  }}
                                >
                                  <item.icon
                                    style={{ color: "white" }}
                                  />
                                  <Grid
                                    className="section-item-text"
                                    style={{
                                      textDecoration: 'none',
                                      padding: "10px",
                                      fontWeight: "600",
                                      width: "100%",
                                      borderRadius: "5px",
                                      fontSize: "17px",
                                      background:
                                        item.text === props.selectedItem
                                          ? "white"
                                          : "inherit",
                                      color:
                                        item.text === props.selectedItem
                                          ? "#3594d4"
                                          : "white",
                                      boxShadow:
                                        item.text === props.selectedItem
                                          ? "inset 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)"
                                          : "0px 0px",
                                    }}

                                  >
                                    {item.text}
                                  </Grid>
                                </ListItem>

                                : <ListItem

                                  style={{
                                    padding: "0rem",
                                  }}
                                  onClick={() => {
                                    props.setSelectedItem(item.text);
                                    props.setDrawerOpen(false);
                                  }}
                                >
                                  <item.icon />
                                  <Paper
                                    elevation={0}
                                    className="section-item-text"
                                    style={{
                                      textDecoration: 'none',
                                      background:
                                        item.text === props.selectedItem
                                          ? "white"
                                          : "inherit",
                                      color:
                                        item.text === props.selectedItem
                                          ? "#3594d4"
                                          : "white",
                                      boxShadow:
                                        item.text === props.selectedItem
                                          ? "inset 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)"
                                          : "0px 0px",
                                    }}

                                  >
                                    {item.text}
                                  </Paper>
                                </ListItem>
                              }
                            </React.Fragment>
                          );
                        })}
                      </List>
                    </Grid>
                  </React.Fragment>
                );
              })}
            </Grid>
            <Grid item width="100%" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <Grid
                container
                alignItems="center"
                mb={3}
                ml={1}
                className="dashboard-sidebar-section"
              >
                <PowerSettingsNew
                  style={{ color: "white" }}
                  onClick={() => Logout()}
                />
                <span
                  className="logout"
                  style={{ cursor: "pointer" }}
                  onClick={() => Logout()}
                >
                  Logout
                </span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <>
      {/* <Drawer
        variant="temporary"
        open={props.drawerOpen}
        onClose={() => props.setDrawerOpen(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: {sm: "block", md: "none"},
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            margin: "0rem",
          },
        }}
      >
        {sidebar}
      </Drawer> */}
      <Grid
        item
        className="show-sidebar"
        style={{ height: "100%" }}
      >
        {sidebar}
      </Grid>
    </>
  );
};

export default SideBar;
