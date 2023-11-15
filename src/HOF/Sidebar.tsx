import React, { useState } from "react";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material/";
import { useNavigate } from "react-router-dom";
import Hamburg from "@mui/icons-material/Menu";
import { ArrowDropDown, ArrowDropDownCircle, Close } from "@mui/icons-material";

function Sidebar({setMenu}:any) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };


  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenu(true);
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "white",
        fontSize: "1.3rem",
        boxSizing: "border-box",
        fontWeight: 600,
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: 3,
          }}
        >
          <Box
            sx={{ cursor: "pointer", fontSize: "1.2rem", fontWeight: "600" }}
          >
            <span onClick={() => {navigate("/");setMenu(true)}}>Home</span>
          </Box>
          <Box
            sx={{ cursor: "pointer", fontSize: "1.2rem", fontWeight: "600" }}
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
                sx={{ fontSize: "1rem", fontWeight: "550", color: "#3089d6" }}
                onClick={()=>{navigate("/solutions/save");setMenu(true)}}
              >
                Save
              </MenuItem>
              <MenuItem
                sx={{ fontSize: "1rem", fontWeight: "550", color: "#3089d6" }}
                onClick={handleMenuClose}
              >
                Borrow (comming soon)
              </MenuItem>
              <MenuItem
                sx={{ fontSize: "1rem", fontWeight: "550", color: "#3089d6" }}
                onClick={handleMenuClose}
              >
                Spend (comming soon)
              </MenuItem>
            </Menu>
          </Box>
          <Box
            sx={{ cursor: "pointer", fontSize: "1.2rem", fontWeight: "600" }}
          >
            <span onClick={() =>{ navigate("/about");setMenu(true);}}>About Us</span>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          borderTop: "1px solid white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: 3,
          }}
        >
          <Box
            sx={{
              cursor: "pointer",
              textDecoration: "none",
              fontSize: "1.2rem",
              fontWeight: "600",
            }}
          >
            <a
              href="https://app.klarfin.com/"
              target="blank"
              style={{ textDecoration: "none", color: "white" }}
            >
              Login
            </a>
          </Box>
          <Box
            sx={{
              cursor: "pointer",
              textDecoration: "none",
              fontSize: "1.2rem",
              fontWeight: "600",
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
    </Box>
  );
}

export default Sidebar;
