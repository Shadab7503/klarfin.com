import { MenuOpen } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", sm: "row" },
        alignItems: { xs: "center", sm: "normal" },
        gap: {xs:"1rem",sm:"2rem"},
        fontSize: "1.2rem",
        fontWeight: "550",
        backgroundColor: "#f4f4f4",
        p: { xs: 2, sm: 4 },
        width: "100%",
        justifyContent: "space-between",
        boxSizing: "border-box",
        // borderTop: "2px solid #37a4cf",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: { xs: "center", sm: "normal" },
          gap: "1rem",
        }}
      >
      <Box
          sx={{
            cursor: "pointer",
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
            <span style={{fontFamily:"logoFont",color:"#3089d6"}} >KLARFIN</span>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "center", sm: "normal" },
            flexDirection: "column",
          }}
        >
          <Typography style={{ fontSize: "1rem", fontWeight: "550" }}>
            Platform for businesses to manage cash
          </Typography>
          <Typography style={{ fontSize: "0.9rem", fontWeight: "550" }}>
            (c) Klarfin 2024
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "center", sm: "normal" },
            flexDirection: "column",
          }}
        >
          <Typography style={{ fontSize: "1rem", fontWeight: "600" }}>
            Powered by NSE
          </Typography>
          <Typography style={{ fontSize: "0.7rem", fontWeight: "600" }}>
            ARN - 264077
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", sm: "column" },
          justifyContent: "space-between",
          width: { xs: "100%", sm: "auto" },
          boxSizing: "border-box",
          gap: { xs: "0.5rem", sm: "1rem" },
        }}
      >
        <Box
          sx={{
            cursor: "pointer",
            color: "#3089d6",
            fontWeight: "700",
            fontSize: "1.1rem",
            
          }}
        >
          <span onClick={() => navigate("/")}>Home</span>
        </Box>
        <Box
          sx={{
            cursor: "pointer",
            color: "#3089d6",
            fontWeight: "700",
            fontSize: "1.1rem",
          }}
        >
          <span onClick={() => navigate("/solutions/save")}>Solutions</span>
        </Box>
        <Box
          sx={{
            cursor: "pointer",
            color: "#3089d6",
            fontWeight: "700",
            fontSize: "1.1rem",
          }}
        >
          <span onClick={() => navigate("/about")}>About Us</span>
        </Box>
        <Box
          sx={{
            cursor: "pointer",
            color: "#3089d6",
            fontWeight: "700",
            fontSize: "1.1rem",
          }}
        >
          <span onClick={() => navigate("/contact")}>Contact Us</span>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: { xs: "50px", sm: "60px" },
            width: { xs: "180px", sm: "210px" },
            borderRadius: "10px",
            backgroundColor: "#3089d6",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor:"pointer",
            "&:hover":{
              backgroundColor: "#2c78b9",
            }
          }}
        >
          <a
            href="https://app.klarfin.com/"
            style={{ textDecoration: "none", color: "white",fontSize:"1.2rem" }}
          >
            Get Started
          </a>
        </Box>
      </Box>
  
    </Box>
  );
}

export default Footer;
