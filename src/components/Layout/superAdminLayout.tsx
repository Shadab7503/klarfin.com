import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TopBar from "../Dashboard/TopBar";
import SideBarSuper from "../Dashboard/SideBarSuper";


const SuperAdminLayout = (props:{children:JSX.Element,user:any}) => {
 
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<string>("Investment");

    return (
      <div className="dashboard">
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
            <Grid container>
              <Grid item xs={12}>
                <h2 style={{marginLeft:"85%",padding:'0px', height:'20px'}} >SuperAdmin</h2><hr/>
              </Grid>

              <Grid item xs={12}>
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
