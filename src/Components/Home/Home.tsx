import { Box, Typography } from "@mui/material";
import { TypeAnimation } from "react-type-animation";
import React from "react";
import Main from "./Main";
import HowToEarn from "./HowToEarn";
import WhoCan from "./WhoCan";

function Home() {
  return (
    <>
      <Main />
      <HowToEarn />
      <WhoCan/>
    </>
  );
}

export default Home;
