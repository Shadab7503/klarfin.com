import { Box, Typography } from "@mui/material";
import React from "react";
import CAImage from "../../Utilities/Experience/CA.jpg";
import IIMCalcuttaImage from "../../Utilities/Experience/IIM_Calcutta.png";
import ISBImage from "../../Utilities/Experience/ISB.jpeg";
import McKinseyImage from "../../Utilities/Experience/McKinsey.png";
import PWCImage from "../../Utilities/Experience/PWC.png";
import RoorkeeImage from "../../Utilities/Experience/Roorkee.jpeg";
import YesbankImage from "../../Utilities/Experience/Yesbank.png";

function Experience() {
  const ExperienceWith = [
    PWCImage,
    McKinseyImage,
    YesbankImage,
    PWCImage,
    McKinseyImage,
    YesbankImage,
  ];

  const ExperienceWithInstitute = [
    RoorkeeImage,
    IIMCalcuttaImage,
    ISBImage,
    CAImage,
    RoorkeeImage,
    IIMCalcuttaImage,
    ISBImage,
    CAImage,
  ];


  return (
    <Box
      sx={{
        p: {xs:0,md:4},
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      
      }}
    >
      <Box sx={{ width: {xs:"100%",md:"80%"}, display: "flex", flexDirection:{xs:"column",md: "row"},p:{xs:0,md:4},gap:{xs:"2rem",md:0},alignItems:"center",}}>
        <Box sx={{ width:  {xs:"100%",md:"50%"},display:"flex",justifyContent:"center"}}>
          <Box sx={{height:"20rem",width:"20rem",borderRadius:"50%",backgroundColor:"#133249",display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",}}>
            <Typography sx={{fontSize:"2.6rem",fontWeight:"550",p:4,color:"white"}}>We come from experience.</Typography>
          </Box>
        </Box>
        <Box
          className="scrol-partner"
          sx={{ overflowX: "scroll", width: {xs:"90%",md:"80%"},gap:"2rem",display:"flex",flexDirection:"column" }}
        >
          <Box
            className="scrol-partner-box1"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent:"space-evenly",
              minWidth: "250%",
              height: "6rem",
              p:2,
              gap:4,
            }}
          >
            {ExperienceWith?.map((ele) => {
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
          <Box
            className="scrol-partner-box1"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent:"space-evenly",
              minWidth: "250%",
              p:1,
              gap:2,
              height: "6rem",
            }}
          >
            {ExperienceWithInstitute?.reverse()?.map((ele) => {
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
    </Box>
  );
}

export default Experience;
