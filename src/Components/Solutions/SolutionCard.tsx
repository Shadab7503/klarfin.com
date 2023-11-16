import { Box, Typography } from "@mui/material";
import React from "react";
import { FormatNumber } from "../../Utilities/Functions/formatNumber";

const FunctionReturn = (amount: any, rate: any, time: any) => {
  const si = (Number(amount) * Number(rate) * Number(time)) / (365 * 100);
  const final = Number(amount) + Number(si);
  return final
};

function SolutionCard({ name, amount, duration ,isMain}: any) {
  const percet: any = {
    15: 3,
    30: 3.5,
    90: 4.5,
    180: 4.5,
  };

  const returns:any = {
    "Current Account": {
      percent: "0%",
      returnsAmt: FunctionReturn(amount,0,duration),
      lock: "No",
    },
    "Klarfin's Returns": {
      percent: "6.5% - 7.0%",
      returnsAmt:  FunctionReturn(amount,6.7,duration),
      lock: "No",
    },
    "Fixed Deposit": {
      percent: percet[duration]+"%",
      returnsAmt:  FunctionReturn(amount,percet[duration],duration),
      lock: "Yes",
    },
  };

  return (
    <Box
      sx={{
        minHeight:(isMain?"70vh":"65vh"),
        borderRadius: "2rem",
        backgroundColor:(isMain?"#3086d7":"white"),
        width: { xs: "90vw", md:(isMain?"25vw":"23vw" )},
        color:(isMain?"white":"#133249"),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
        p: 3,
        boxSizing: "border-box",
        // borderTop:"2px solid #635f5f",
        // borderBottom:"2px solid #635f5f",
      }}
    >
      <Typography sx={{ fontSize: "1.8rem", fontWeight: "550" }}>
        {name}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.7rem",
        }}
      >
        <Typography sx={{ fontSize: "1.2rem", fontWeight: "500" }}>
          Money you will have in {duration} days
        </Typography>
        <Typography
          sx={{ fontSize: "1.7rem", fontWeight: "550", color:(isMain? "#00ff90":"#3086d7") }}
        >
          ₹{FormatNumber(returns[name].returnsAmt)}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.7rem",
        }}
      >
        <Typography sx={{ fontSize: "1.3rem", fontWeight: "500" }}>
          Returns
        </Typography>
        <Typography sx={{ fontSize: "1.5rem", fontWeight: "550" }}>
          {returns[name].percent}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.7rem",
        }}
      >
        <Typography sx={{ fontSize: "1.3rem", fontWeight: "500" }}>
          Lockin
        </Typography>
        <Typography sx={{ fontSize: "1.5rem", fontWeight: "600" }}>
         {returns[name].lock}
        </Typography>
      </Box>
    </Box>
  );
}

export default SolutionCard;
