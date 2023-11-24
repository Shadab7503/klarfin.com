import { Box, Typography, Slider } from "@mui/material";
import React, { useState } from "react";
import { FormatNumber } from "../../Utilities/Functions/formatNumber";
import SolutionCard from "./SolutionCard";

function SolutionMonetise() {
  const [selectValue, setSelectedValue] = useState({
    amount: 500000,
    duration: 30,
  });

  const Durations = [{days: 15, returns:3}, {days:30,returns:3.5},{days:90,returns:4.5}, {days:180,returns:4.5}];

  const onChangeHandler = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    setSelectedValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const onChangeHandlerDur = (name: any, value: any) => {
    setSelectedValue((prev) => ({
      ...prev,
      [name]: value.days,
    }));
  };
  return (
    <Box
      sx={{
        backgroundColor: "#f4f4f4",
        boxSizing: "border-box",
        p:{xs:2,md: 4},
        minHeight: "100vh",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      <Box sx={{ textAlign: "center"}}>
        <Typography sx={{ fontSize: "1.5rem", fontWeight: "550" }}>
          See how Klarfin{" "}
          <span style={{ fontSize: "1.6rem", color: "#008001" }}>
            {" "}
            monetises{" "}
          </span>{" "}
          your idle cash
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
          zIndex:0
        }}
      >
        <Typography
          sx={{ fontSize: "1.2rem", fontWeight: "550", color: "#008001" }}
        >
          ₹{FormatNumber(selectValue.amount)}
        </Typography>
        <Slider
          aria-label="Temperature"
          defaultValue={30}
          name="amount"
          value={selectValue.amount}
          onChange={onChangeHandler}
          color="primary"
          step={1000}
          sx={{ height: "0.8rem", width: {xs:"80vw",md:"35vw" }}}
          min={500000}
          max={50000000}
          
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            
          }}
        >
          <Typography sx={{ fontSize: "1.2rem", fontWeight: "550" }}>
            ₹{FormatNumber(500000)}
          </Typography>
          <Typography sx={{ fontSize: "1.2rem", fontWeight: "550" }}>
            ₹{FormatNumber(50000000)}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap:{xs:"auto", md:"3rem"},
          backgroundColor: "#3086d7",
          p: 1,
          ps: 5,
          pe: 5,
          color: "white",
          borderRadius: "50px",
        }}
      >
        {Durations.map((ele) => {
          return (
            <>
              {selectValue.duration == ele.days ? (
                <Typography
                  sx={{
                    fontWeight: 550,
                    backgroundColor: "#008001",
                    p: 2,
                    borderRadius: "50px",
                  }}
                >
                  {ele.days} Days
                </Typography>
              ) : (
                <span onClick={() => onChangeHandlerDur("duration", ele)}>
                  <Typography
                    sx={{
                      fontWeight: 550,
                      p: 2,
                      borderRadius: "50px",
                      cursor: "pointer",
                    }}
                  >
                    {ele.days} Days
                  </Typography>
                </span>
              )}
            </>
          );
        })}
      </Box>
      <Box sx={{display:"flex",flexDirection:{xs:"column",md:"row"},alignItems:"center",gap:{xs:"1rem",md:"2rem"} }}>
        <SolutionCard isMain={false} name={"Current Account"} amount={selectValue.amount} duration={selectValue.duration} />
        <SolutionCard isMain={true} name={"Klarfin's Returns"} amount={selectValue.amount} duration={selectValue.duration}/>
        <SolutionCard isMain={false} name={"Fixed Deposit"} amount={selectValue.amount} duration={selectValue.duration}/>
      </Box>
    </Box>
  );
}

export default SolutionMonetise;
