import React, { useState } from "react";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material/";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import Hamburg from "@mui/icons-material/Menu";
import { ArrowDownward, ArrowDropDown, Close } from "@mui/icons-material";
import Sidebar from "./Sidebar";

function Navbar() {
  const navigate = useNavigate();
  const [isMenu, setMenu] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSwitchMenu = () => {
    setMenu((prev) => !prev);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {isMenu ? (
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            height: "3rem",
            position: "absolute",
            width: "3rem",
            color: "white",
            p: 2,
          }}
        >
          <div onClick={handleSwitchMenu}>
            <Hamburg sx={{ height: "3.5rem", width: "3.5rem" }} />
          </div>
        </Box>
      ) : (
        <Box
          sx={{
            position: "fixed",
            display: {
              xs: "flex",
              md: "none",
            },
            background: "linear-gradient(#2f85d7, #3baecc)",
            flexDirection: "column",
            height: "100%",
            width: "65vw",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              color: "white",
              borderBottom: "1px solid white",
              height: "max-content",
              
            }}
          >
            <Typography
              sx={{
                fontFamily: "logoFont",
                fontSize: "2rem",
                width:"100%",
                textAlign:"center",
                fontWeight: "500",
                p:1
              }}
              onClick={() => navigate("/")}
            >
              <span style={{ fontFamily: "logoFont",color:"white" }}>KLARFIN</span>
            </Typography>
            <div onClick={handleSwitchMenu} style={{ color: "white" }}>
              <Close
                sx={{
                  borderRadius: "0.1rem",
                  p: 0,
                  backgroundColor: "#3aadcc",
                  height: "2rem",
                  width: "2rem",
                }}
              />
            </div>
          </Box>
          <Sidebar setMenu={setMenu} />
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: { xs: "center", md: "space-between" },
          boxSizing: "border-box",
          alignItems: "center",
          width: "100vw",
          padding: "1rem",
          color: "white",
          height: "6rem",
          p: 4,
          backgroundColor:"#3089d6",
          
          //backgroundColor:"#3086d7"
          //background: "linear-gradient(#2f85d7, #3baecc)",
        }}
      >
        <Box
          sx={{
            cursor: "pointer",
            display: "flex",
            marginLeft: { xs: "-5vw", md: 0 },
          }}
        >
          <Typography
            sx={{
              fontFamily: "logoFont",
              fontSize: "2rem",
              fontWeight: "500",
            }}
            onClick={() => navigate("/")}
          >
            <span style={{ fontFamily: "logoFont",color:"white" }}>KLARFIN</span>
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "3rem",
          }}
        >
          <Box
            sx={{ cursor: "pointer", fontSize: "1.1rem", fontWeight: "600","&:hover":{
              color:"#e0e0e0"
            } }}
          >
            <span onClick={() => navigate("/")}>Home</span>
          </Box>
          <Box
            sx={{ cursor: "pointer", fontSize: "1.1rem", fontWeight: "600", "&:hover":{
              color:"#e0e0e0"
            } }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "0.2rem",
                
              }}
              onClick={handleMenuClick}
            >
              Solutions <ArrowDropDown />{" "}
            </Box>
            <Menu
              sx={{ marginTop: 2 }}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                sx={{ fontSize: "1rem", fontWeight: "550", color: "#3089d6", }}
                onClick={() => {
                  handleMenuClose();
                  navigate("/solutions/save");
                }}
              >
                Save
              </MenuItem>
              <MenuItem
                sx={{ fontSize: "1rem", fontWeight: "550", color: "#3089d6", }}
                onClick={handleMenuClose}
              >
                Borrow (Coming soon)
              </MenuItem>
              <MenuItem
                sx={{ fontSize: "1rem", fontWeight: "550", color: "#3089d6", }}
                onClick={handleMenuClose}
              >
                Spend (Coming soon)
              </MenuItem>
            </Menu>
          </Box>
          <Box
            sx={{ cursor: "pointer", fontSize: "1.1rem", fontWeight: "600","&:hover":{
              color:"#e0e0e0"
            } }}
          >
            <span onClick={() => navigate("/about")}>About Us</span>
          </Box>
          <Box
            sx={{
              cursor: "pointer",
              textDecoration: "none",
              fontSize: "1.1rem",
              fontWeight: "600",
              
            }}
          >
            <a
              href="https://app.klarfin.com/"
              target="blank"
              className="link-tags"
              style={{ textDecoration: "none",color:"white", }}
            >
              Login
            </a>
          </Box>
          <Box
            sx={{
              cursor: "pointer",
              textDecoration: "none",
              fontSize: "1.1rem",
              fontWeight: "600",
              "&:hover":{
                color:"#e0e0e0"
              }
            }}
          >
            <a
              href="https://app.klarfin.com/signup"
              target="blank"
              style={{ textDecoration: "none", color: "white" }}
            >
              Sign Up
            </a>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Navbar;
