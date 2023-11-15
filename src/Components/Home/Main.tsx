import { Box, Typography } from "@mui/material";
import { TypeAnimation } from "react-type-animation";
import React from "react";

function Main() {
  return (
    <>
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: "3rem", md: "2rem" },
          padding:{xs:2,sm: 4},
          paddingTop: { xs: "10vh", md: "15vh" },
          boxSizing: "border-box",
          color: "#635f5f",
          textAlign: "center",
        }}
      >
        <Box>
          <Typography variant="h4" sx={{  fontWeight: "550" }}>
            An ideal way to manage cash for CXOs of businesses
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ fontSize:{xs: "1.8rem",md:"2rem"}, fontWeight: "900", color: "#008001" }}
          >
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Save - Borrow - Spend",
                2000, 
                "Save ",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color:"#7c7979"
          }}
        >
          <Typography sx={{ fontSize: "1.3rem", fontWeight: "550" }}>
            Platform helping businesses save, spend and borrow in one place
            leading to
          </Typography>
          <Typography sx={{ fontSize: "1.3rem", fontWeight: "550" }}>
            better cashflow management
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{
              height: "60px",
              width: "210px",
              borderRadius: "50px",
              backgroundColor:"#3089d6",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor:"pointer"
            }}
          >
            <a
              href="https://app.klarfin.com/"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "1.2rem",
                fontWeight: "800",
              }}
            >
              Get Started
            </a>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Main;
