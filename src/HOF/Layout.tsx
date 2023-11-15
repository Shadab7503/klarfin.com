import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box } from "@mui/material";

function Layout(props: any) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        margin: 0,
        padding: 0,
      }}
    >
      <Box sx={{ height:"100%"}}>
        <Box sx={{ position:"sticky",top:"0",left:"0",zIndex:2}}>
          <Navbar />
        </Box>
        <Box>{props.children}</Box>
      </Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default Layout;
