import React from "react";
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
import logout from "../../images/logout.png";
import { sidebarUtils } from "../../utils/interface";

const sidebarData = {
  sections: [
    {
      name: "Cash Management",
      items: [
        { icon: cashflows, text: "Cash Flows" },
        { icon: insights, text: "Insights" },
        { icon: receivables, text: "Receivables" },
        { icon: bills, text: "Bills to Pay" },
        { icon: banking, text: "Banking Transactions" },
      ],
    },
    { name: "Credit Management", items: [] },
  ],
};

const SideBar = (props: sidebarUtils) => {
  const Logout = () => {
    localStorage.removeItem("tokens");
    window.location.href = "/login";
  };

  const sidebar = (
    <Grid item xs={12} className="dashboard-sidebar">
      <Grid
        container
        direction="column"
        alignItems="center"
        height="100%"
        justifyContent="space-between"
      >
        <Grid item className="dashboard-sidebar-section">
          <Grid container alignItems="center">
            <div>
              <span className="sidebar-logo logo">KLARFIN</span>
              {sidebarData.sections.map((section) => {
                return (
                  <React.Fragment key={section.name}>
                    <span className="dashboard-section-heading">
                      {section.name}
                    </span>
                    <List className="section-items">
                      {section.items.map((item) => {
                        return (
                          <React.Fragment key={item.text}>
                            <ListItem
                              style={{ padding: "0rem", cursor: "pointer" }}
                              onClick={() => {
                                props.setSelectedItem(item.text);
                                props.setDrawerOpen(false);
                              }}
                            >
                              <img
                                src={item.icon}
                                alt={item.text}
                                className="section-item-icon"
                              />
                              <Paper
                                elevation={0}
                                className="section-item-text"
                                style={{
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
                          </React.Fragment>
                        );
                      })}
                    </List>
                  </React.Fragment>
                );
              })}
            </div>
          </Grid>
        </Grid>
        <Grid item width="100%">
          <Grid
            container
            alignItems="center"
            mb={3}
            ml={1}
            className="dashboard-sidebar-section"
          >
            <img
              src={logout}
              alt="logout"
              height="100%"
              style={{ cursor: "pointer" }}
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
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={props.drawerOpen}
        onClose={() => props.setDrawerOpen(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { sm: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            margin: "0rem",
          },
        }}
      >
        {sidebar}
      </Drawer>
      <Grid
        item
        xs={12}
        sx={{ display: { md: "flex", xs: "none" } }}
        className="show-sidebar"
      >
        {sidebar}
      </Grid>
    </>
  );
};

export default SideBar;
