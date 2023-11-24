import { TaskAlt } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { wrap } from "module";
import React from "react";

function KeyFetures() {
  const CONTENT = [
    {
      title: "Safety",
      body: "Your money flows directly to AMCs. Klarfin is a technology platform and does not keep your money.",
    },
    {
      title: "Transparency",
      body: "You can see where your money is flowing and how it’s growing 24/7 on the desktop or your phone",
    },
    {
      title: "Liquidity",
      body: "Redeem your funds anytime with no lock-in period. If you need to take everything out on short notice, it’s up to you.",
    },
    { title: "Returns", body: "Get highest returns on short term funds" },
    {
      title: "Automated process",
      body: "Hassle free process to generate returns requiring minimum intervention",
    },
    {
      title: "Diversification",
      body: "Invest in multiple instruments with ease",
    },
    {
      title: "Paperless",
      body: "Completely digital process for investments and redemptions",
    },
    { title: "Completely free", body: "No fee charged to the customer" },
  ];
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      //  backgroundColor: "#133249",
        backgroundColor: "#3086d7",
        gap: "2rem",
        alignItems: "center",
        justifyContent: "center",
        p: {xs:2,md:4},
        boxSizing: "border-box",
      }}
    >
      <Box>
        <Typography
          sx={{ fontSize: "1.6rem", fontWeight: "550", color: "white" }}
        >
          Key Features
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "100%", md: "80%" },
          display: "flex",
          color: "white",
          flexDirection: "row",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {CONTENT.map((ele) => {
          return (
            <Box
              sx={{
                width: { xs: "100%", md: "40%" },
                p: 2,
                borderRadius: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                border: "2px solid white",
                //backgroundColor:"green",
                flexWrap: "wrap",
                "&:hover": { backgroundColor:"white",color:"#133249",border: "2px solid white",}
              }}
            >
              <Typography sx={{ fontSize: "1.3rem", fontWeight: "550",display:"flex",alignItems:"center",gap:"1rem"}}>
              <TaskAlt sx={{fontSize:"1.6rem",color:"#0ccb78"}} />  {ele.title}
              </Typography>
              <Typography sx={{ fontSize: "1.0rem", fontWeight: "500" }}>
                {ele.body}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default KeyFetures;
