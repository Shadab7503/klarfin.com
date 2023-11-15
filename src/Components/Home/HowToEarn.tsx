import { Box, Typography } from "@mui/material";
import { TypeAnimation } from "react-type-animation";
import ImageSpend from "../../Utilities/Images/invoice.jpg";
import ImageSave from "../../Utilities/Images/credit.jpeg";
import ImageBorrow from "../../Utilities/Images/cashflow.jpeg";
import Card from "./Card";

function HowToEarn() {
  const CardDetails = [
    {
      title: "Save",
      id: 1,
      content:
        "7 crore small businesses are losing billions in free money by not putting their idle cash to work. klarfin is the treasury partner for businesses helping them monetise their current account",
      Keypoint: "Full safety and transparency, Fully liquid, Assured returns",
      image: ImageSave,
    },
    {
      title: "Borrow",
      id: 2,
      content: "Access short term funds directly from the platform",
      Keypoint: "",
      image: ImageBorrow,
    },
    {
      title: "Spend",
      id: 3,
      content:
        "Manage all your payments in one place and use your existing credit cards to make payments to vendors and for other payments like utility, payroll, rent etc",
      Keypoint: "",
      image: ImageSpend,
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#f4f4f4",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: { xs: 0, sm: 2 },
        pt:6,
        pb: 6,
        gap: 5,
        boxSizing: "border-box",
      }}
    >
      <Box
      sx={{boxSizing:"border-box"}}>
        <Typography
          sx={{ fontSize: "1.5rem", fontWeight: 600,p:2,color: "#2f87d7" }}
        >
          How to improve cash flows with klarfin?
        </Typography>
      </Box>
      {CardDetails.map((ele) => {
        return (
          <Card
            title={ele.title}
            id={ele.id}
            content={ele.content}
            Keypoint={ele.Keypoint}
            image={ele.image}
          />
        );
      })}
    </Box>
  );
}

export default HowToEarn;
