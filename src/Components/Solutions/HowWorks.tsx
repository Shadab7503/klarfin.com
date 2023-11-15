import { Box, Typography } from "@mui/material";
import sigUpImg from "../../Utilities/Images/signup-image.png";
import { ArrowDropDown } from "@mui/icons-material";

function HowWorks() {
  const CONTENTS = [
    "Share bank statement to see see how much of your cash is idle and losing value and how much you can safely invest with klarfin to generate surplus money ",
    "Complete free registration process including KYC",
    "Make investments with a single click via the platform or automate your investment with set and forget rules",
    "Watch how your investment is generating returns on live reporting tools",
    "Redeem your investments anytime with no penalty",
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
        width: "100%",
        alignItems: "center",
        backgroundColor:"#3086d7",
        p:{xs:2,md: 4},
        boxSizing:"border-box"
      }}
    >
      <Box>
        <Typography sx={{ fontSize: "1.6rem",color:"white", fontWeight: "550" }}>
          How does it work?
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection:{xs:"column",md: "row"},
          gap: "1rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width:{xs:"100%", md:"30%"}}}>
          <img
            style={{
              width: "100%",
              margin: 0,
              height: "100%",
              objectFit: "contain",
            }}
            src={sigUpImg}
          />
        </Box>
        <Box
          sx={{
            width:{xs:"100%", md:"40%"},
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
            <Box sx={{p:0,m:0}}>
              <Box
                sx={{ backgroundColor: "white", p: 2,marginLeft:"" ,borderRadius: "1rem",display:"flex",flexDirection:"row",gap:"1rem",alignItems:"center"}}
                >
                <Box sx={{fontWeight:"550",backgroundColor:"#133249",p:2,color:"white",borderRadius:"50%"}}>{1}.</Box> 
                <Typography sx={{fontWeight:"550"}}>{"Share bank statement to see see how much of your cash is idle and losing value and how much you can safely invest with klarfin to generate surplus money"}</Typography>
              </Box>
              <ArrowDropDown sx={{color:"white",fontSize:"3rem",marginTop:"-1.3rem",marginLeft:"4rem"}}/>
            </Box>

            <Box sx={{p:0,ml:{xs:0,md:"3rem"}}}>
              <Box
                sx={{ backgroundColor: "white", p: 2,marginLeft:"" ,borderRadius: "1rem",display:"flex",flexDirection:"row",gap:"1rem",alignItems:"center"}}
                >
                <Box sx={{fontWeight:"550",backgroundColor:"#133249",p:2,color:"white",borderRadius:"50%"}}>{2}.</Box> 
                <Typography sx={{fontWeight:"550"}}>{"Complete free registration process including KYC"}</Typography>
              </Box>
              <ArrowDropDown sx={{color:"white",fontSize:"3rem",marginTop:"-1.3rem",marginLeft:"4rem"}}/>
            </Box>

            <Box sx={{p:0,ml:{xs:0,md:"5rem"}}}>
              <Box
                sx={{ backgroundColor: "white", p: 2,marginLeft:"" ,borderRadius: "1rem",display:"flex",flexDirection:"row",gap:"1rem",alignItems:"center"}}
                >
                <Box sx={{fontWeight:"550",backgroundColor:"#133249",p:2,color:"white",borderRadius:"50%"}}>{3}.</Box> 
                <Typography sx={{fontWeight:"550"}}>{"Make investments with a single click via the platform or automate your investment with set and forget rules "}</Typography>
              </Box>
              <ArrowDropDown sx={{color:"white",fontSize:"3rem",marginTop:"-1.3rem",marginLeft:"4rem"}}/>
            </Box>

            <Box sx={{p:0,ml:{xs:0,md:"3rem"}}}>
              <Box
                sx={{ backgroundColor: "white", p: 2,marginLeft:"" ,borderRadius: "1rem",display:"flex",flexDirection:"row",gap:"1rem",alignItems:"center"}}
                >
                <Box sx={{fontWeight:"550",backgroundColor:"#133249",p:2,color:"white",borderRadius:"50%"}}>{4}.</Box> 
                <Typography sx={{fontWeight:"550"}}>{"Watch how your investment is generating returns on live reporting tools"}</Typography>
              </Box>
              <ArrowDropDown sx={{color:"white",fontSize:"3rem",marginTop:"-1.3rem",marginLeft:"4rem"}}/>
            </Box>

            <Box sx={{p:0,m:0}}>
              <Box
                sx={{ backgroundColor: "white", p: 2,marginLeft:"" ,borderRadius: "1rem",display:"flex",flexDirection:"row",gap:"1rem",alignItems:"center"}}
                >
                <Box sx={{fontWeight:"550",backgroundColor:"#133249",p:2,color:"white",borderRadius:"50%"}}>{5}.</Box> 
                <Typography sx={{fontWeight:"550"}}>{"Redeem your investments anytime with no penalty"}</Typography>
              </Box>
              <ArrowDropDown sx={{color:"white",fontSize:"3rem",marginTop:"-1.3rem",marginLeft:"4rem"}}/>
            </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default HowWorks;
