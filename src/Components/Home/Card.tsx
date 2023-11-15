import { CheckBox } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

function Card({ title, id, content, Keypoint, image }: any) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: {
          xs: "column",
          md: id % 2 == 0 ? "row" : "row-reverse",
        },
        gap: 5,
        justifyContent: "center",
        p: { xs: 2, sm: 3 },
        boxSizing: "border-box",
        
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "90%", md: "40%" },
          display: "flex",
          gap: 3,
          flexDirection: "column",
          p: { xs: 2, sm: 3 },
          boxSizing:"border-box"
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "80%",
            gap: 2,
          }}
        >
          <Box
            sx={{
              height: "2rem",
              width: "2rem",
              borderRadius: "50%",
              backgroundColor: "#2f87d7",
              textAlign: "center",
              p: 1,
              color: "white",
              
            }}
          >
            <Typography sx={{ fontWeight: "600", fontSize: "1.3rem" }}>
              {id}
            </Typography>
          </Box>
          <Typography
            sx={{ fontSize: "1.4rem", fontWeight: "550", color: "#133249" }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ fontWeight: "550", fontSize: "1.0rem", color: "#486071" }}
          >
            {content}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            fontWeight: "550",
            fontSize: "1.0rem",
            gap: "0.5rem",
            color: "#133259",
          }}
        >
          {Keypoint !== "" && <Typography>Key features :</Typography>}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent:"space-between",
              flexWrap:"wrap",
              width:"80%",
            }}
          >
            {Keypoint !== "" && (
              <>
                {Keypoint != ""
                  ? Keypoint.split(",").map((ele: any) => {
                      return (
                        <Typography
                          sx={{
                            fontWeight: "550",
                            fontSize: "1.0rem",
                            color: "#486071",
                            display: "flex",
                            flexDirection: "row",
                            gap: "0.1rem",
                            alignItems: "center",
                          }}
                        >
                          <CheckBox
                            sx={{ fontSize: "1.2rem", color: "green" }}
                          />{" "}
                          {ele}
                        </Typography>
                      );
                    })
                  : ""}
              </>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: "100%", md: "30%" },
          p: 0,
          boxSizing: "border-box",
        }}
      >
        <img
          style={{ height: "100%", width: "100%", borderRadius: "2rem" }}
          src={image}
        />
      </Box>
    </Box>
  );
}

export default Card;
