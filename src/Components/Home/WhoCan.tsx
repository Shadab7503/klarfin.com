import { Box, Typography } from "@mui/material";
import { TypeAnimation } from "react-type-animation";
import ImageSpend from "../Utilities/Images/invoice.jpg";
import ImageSave from "../Utilities/Images/credit.jpeg";
import ImageBorrow from "../Utilities/Images/cashflow.jpeg";
import Card from "./Card";
import WhoCard from "./WhoCard";

function WhoCan() {
  const contentDetail = [
    "Businesses & business owners",
    "Non-profits",
    "Startups",
    "Government bodies",
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
        width: "100%",
        p:2,
        pt:6,
        pb:8,
      //  backgroundColor: "#133249",
        backgroundColor: "#3089d6",
      }}
    >
      <Box sx={{ width:{xs:"100%",md: "90%"}, display:"flex",  color: "#fff",flexDirection:"column",textAlign: "center" ,gap: 6, }}>
        <Box>
          <Typography
            sx={{
              textAlign: "center",
              textTransform: "capitalize",
              justifyContent: "center",
              fontSize: "1.7rem",
              fontWeight: "700",
            }}
          >
            Who can use Klarfin?
            {/* <span style={{color:"#0ccb78",fontWeight:600}} >Klarfin?</span> */}
            {/* <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              " " + "KLARFIN?",
              1000,
              "",
              1000,
            ]}
            wrapper="span"
            speed={50}
            style={{ fontFamily: "logoFont" }}
            repeat={Infinity}
          /> */}
          </Typography>
          <Typography>Klarfin is here to help the following...</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent:"center",
            gap: "2rem",
            width:"100%",
            boxSizing:"border-box",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: {xs:"column",md:"row"},gap:"2rem",width:{xs:"100%",md:"60%"}}}>
            <WhoCard text={contentDetail[0]} />
            <WhoCard text={contentDetail[1]} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: {xs:"column",md:"row"},width:{xs:"100%",md:"60%"},gap:"2rem", }}>
            <WhoCard text={contentDetail[2]} />
            <WhoCard text={contentDetail[3]} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default WhoCan;
