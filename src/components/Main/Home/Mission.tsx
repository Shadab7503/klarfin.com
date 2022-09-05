import Grid from "@mui/material/Grid";
import about from "../../../images/about.png";

const Mission = () => {
  return (
    <div className="mission">
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          background: "#7FBCD2",
          height: "60vh",
          width: "100vw",
          maxWidth: "100%",
        }}
      ></div>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        className="about-container"
        style={{ zIndex: 2, background: "#e8f9fd" }}
      >
        <Grid item xl={6} lg={9} xs={11.5} style={{ zIndex: 2 }}>
          <Grid
            container
            justifyContent="center"
            spacing={10}
            style={{ zIndex: 200 }}
          >
            <Grid item xs={12} textAlign="center" style={{ zIndex: 2 }}>
              <span className="about-heading">About Us</span>
            </Grid>
            <Grid
              item
              lg={9}
              sm={10}
              xs={12}
              textAlign="center"
              style={{ zIndex: 2 }}
            >
              <img src={about} width="100%" alt="about" />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} className="about-text-content-main">
                  Klarfin's mission is to keep CXOs of SMBs and startups on top
                  of their cash flows and take smart decisions for cash and
                  credit management.
                </Grid>
                <Grid item xs={12}>
                  <span className="about-text-points-title">
                    Our cash management solution helps SMBs manage their cash
                    flows by -
                  </span>
                  <ul>
                    <li className="about-text-points">
                      Securely gathering data from all of their existing bank
                      accounts, accounting software and other business tools
                      through integrations and providing a real time view of
                      their cash flow activity to the CXOs in a simplified
                      dashboard for faster decision making
                    </li>
                    <li className="about-text-points">
                      Providing in-built features for forecasting, scenario
                      planning, automated invoice collections and embedded
                      payments for better control over money.
                    </li>
                  </ul>
                </Grid>
                <Grid item xs={12} className="about-text-content-main">
                  Our embedded credit functionality allows SMBs to avail credit
                  instantly at critical points in their workflow to cover
                  operational costs like payroll, inventory, marketing etc.
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Mission;
