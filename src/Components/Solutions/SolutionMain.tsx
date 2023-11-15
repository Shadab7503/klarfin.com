import React from "react";
import { Box, Typography } from "@mui/material";
import { TypeAnimation } from "react-type-animation";
import KlarfinHome from '../../Utilities/Images/KlarfinHome.png'

function SolutionMain() {
  return (
    <>
    <Box
      sx={{
        height:"100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: { xs: "10vh", md: "10vh" },
        boxSizing: "border-box",
        color: "#635f5f",
        textAlign: "center",
        justifyContent:"space-between"
      }}
    >
      <Box>
        <Typography  variant="h5" sx={{  fontWeight: "550" }}>
          Klarfin is a treasury partner for businesses helping them monetise
          their current account
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p:2,
          color:"#7c7979"
        }}
      >
        <Typography sx={{ fontSize: "1.2rem", fontWeight: "550" }}>
          Bringing enterprise level capabilities to the doorstep of SME and
          startups without them
        </Typography>
        <Typography sx={{ fontSize: "1.2rem", fontWeight: "550" }}>
          having to spend time to manage investment or to hire an investing
          team
        </Typography>
      </Box>

      <Box>
        <Typography
          sx={{
            fontSize: { xs: "1.8rem", md: "2rem" },
            fontWeight: "900",
            color: "#008001" 
          }}
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
      <Box sx={{width:{xs:"90vw",md:"70vw",m:0,borderTop:"2px solid #635f5f",borderRadius:"2rem"}}}>
        <img src={KlarfinHome} style={{width:"100%",margin:0,height:"100%",objectFit:"contain",borderTopLeftRadius:"2rem",borderTopRightRadius:"2rem"}} />
      </Box>
    </Box>
  </>
  )
}

export default SolutionMain