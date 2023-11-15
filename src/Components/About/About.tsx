import { Box, Typography } from "@mui/material";
import React from "react";
import CAImage from "../../Utilities/Experience/CA.jpg";
import IIMCalcuttaImage from "../../Utilities/Experience/IIM_Calcutta.png";
import ISBImage from "../../Utilities/Experience/ISB.jpeg";
import McKinseyImage from "../../Utilities/Experience/McKinsey.png";
import PWCImage from "../../Utilities/Experience/PWC.png";
import RoorkeeImage from "../../Utilities/Experience/Roorkee.jpeg";
import YesbankImage from "../../Utilities/Experience/Yesbank.png";
import HDFCImage from "../../Utilities/Partner/HDFC.png";
import ICICIImage from "../../Utilities/Partner/ICICI.png";
import JMFinancial2Image from "../../Utilities/Partner/JM_financial2.jpeg";
import MotilalOswalImage from "../../Utilities/Partner/Motilaloswal.png";
import NipponImage from "../../Utilities/Partner/Nippon.png";
import QuantImage from "../../Utilities/Partner/quant.jpeg";
import SBIImage from "../../Utilities/Partner/SBI.png";
import TallyImage from "../../Utilities/Partner/Tally.png";
import NSE from "../../Utilities/Partner/NSE.jpg";
import Experience from "./Experience";

const About = () => {
  const Partners = [
    SBIImage,
    ICICIImage,
    HDFCImage,
    NipponImage,
    QuantImage,
    MotilalOswalImage,
    JMFinancial2Image,
    NSE,
    TallyImage,
    SBIImage,
    ICICIImage,
    HDFCImage,
    NipponImage,
    QuantImage,
    MotilalOswalImage,
    JMFinancial2Image,
    NSE,
    TallyImage,
  ];


  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#635f5f",
        gap: "3rem",
        boxSizing: "border-box",
        p:{xs:2,md: 4},
      }}
    >
      <Box sx={{width:"100%",textAlign:"center"}}>
        <Typography sx={{ fontSize: "1.3rem", mt: "3rem", fontWeight: "550" }}>
          Klarfin's mission is to help CXOs of businesses stay on top of their
          cash flows and take smart decisions for cash and credit management.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "3rem",
          width:"100%",
          boxSizing:"border-box"
        }}
      >
        <Typography sx={{ fontWeight: "550", fontSize: "1.6rem" }}>
          Our partners
        </Typography>
        <Box
          className="scrol-partner"
          sx={{ overflowX: "scroll", width:{xs:"100%", md:"80%"} }}
        >
          <Box
            className="scrol-partner-box"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent:"space-evenly",
              width: "250rem",
              height: "5rem",
              position:"relative",
              zIndex:0
            }}
          >
            {Partners?.map((ele) => {
              return (
                <Box sx={{ display: "flex", width: "100%" }}>
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit:"contain"
                    }}
                    src={ele}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
      <Box>
        <Experience/>
      </Box>
    </Box>
  );
};

export default About;
