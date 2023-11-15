import { Box, Typography } from "@mui/material";
import React from "react";

function UseCase() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        backgroundColor: "#f4f4f4",
        alignItems: "center",
        p: 2,
        boxSizing: "border-box",
        gap: "2rem",
        pb: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: { xs: "100%", md: "70%" },
          textAlign: "center",
        }}
      >
        <Typography sx={{ fontSize: "1.6rem", fontWeight: "550" }}>
          Use Cases
        </Typography>
        <Typography
          sx={{ fontSize: "1.1rem", fontWeight: "550", color: "#2f85d7" }}
        >
          “Idle money” is the cash lying in an account for a day, a weekend, a
          week or even a year that is not utilized or creating value for the
          business.
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "100%", md: "70%" },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: "1.0rem", md: "4rem" },
          p: { xs: 0, md: 4 },
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            p: 4,
            border: "2px solid white",
            width: { xs: "auto", md: "25%" },
            borderRadius: "1rem",
            backgroundColor: "white",
          }}
        >
          <Typography sx={{ fontSize: "1rem", fontWeight: "550" }}>
            Keeping money aside for specific purposes like payroll, inventory,
            capex purchase, taxes
          </Typography>
        </Box>

        <Box
          sx={{
            p: 4,
            width: { xs: "auto", md: "25%" },
            backgroundColor: "white",
            borderTopRightRadius: "2px",
            borderTopLeftRadius: "2px",
            borderRadius: "1rem",
          }}
        >
          <Typography sx={{ fontSize: "1rem", fontWeight: "550" }}>
            Large inflow of funds into the firm like sale of an asset, large
            customer collections, funding or grant
          </Typography>
        </Box>

        <Box
          sx={{
            p: 4,
            border: "2px solid white",
            width: { xs: "auto", md: "25%" },
            borderRadius: "1rem",
            backgroundColor: "white",
          }}
        >
          <Typography sx={{ fontSize: "1rem", fontWeight: "550" }}>
            Cash rich businesses
          </Typography>
        </Box>
        {/* <Typography  sx={{ fontSize: "1rem", fontWeight: "550"}}>1. keeping money aside for specific purposes like payroll, inventory, capex purchase, taxes</Typography>
            <Typography  sx={{ fontSize: "1rem", fontWeight: "550"}}>2. large inflow of funds into the firm like sale of an asset, large customer collections, funding or grant</Typography>
            <Typography  sx={{ fontSize: "1rem", fontWeight: "550"}}>3. cash rich businesses</Typography> */}
      </Box>
    </Box>
  );
}

export default UseCase;
