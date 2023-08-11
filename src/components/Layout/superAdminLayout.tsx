import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import TopBar from "../Dashboard/TopBar";
import SideBarSuper from "../Dashboard/SideBarSuper";


const SuperAdminLayout = (props: { children: JSX.Element, user: any }) => {

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>("Investment");

  return (
    <div className="dashboard" style={{ height: "100vh", width: "100vw" }}>
      <Grid container className="dashboard-container">
        <Grid item lg="auto" md={2.5}>
          <SideBarSuper
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
          <Grid container >
            <Grid item xs={12} sx={{position:"fixed",width:"85%",zIndex:5}}>
              <Typography variant="h5" style={{padding:"12px",display: 'flex', color: "white",height:"100%" ,justifyContent: 'flex-end', alignItems: "center" ,backgroundColor:"#2f85d7"}} >SuperAdmin</Typography>
            </Grid>
            <Grid item xs={12} sx={{marginTop:"50px"}}>
              {
                props.children
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );

};

export default SuperAdminLayout;
