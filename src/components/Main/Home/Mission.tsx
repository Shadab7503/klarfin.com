import Grid from "@mui/material/Grid";
import about from "../../../images/about.jpeg";

const Mission = () => {
  return (
    <div className="mission">
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        className="about-container"
      >
        <Grid item xl={10} xs={11.5}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={{ xs: 5 }}
          >
            <Grid item sm={6}>
              <Grid container style={{ height: "100%" }}>
                <Grid item xs={12}>
                  <span className="about-heading" style={{ textAlign: "left" }}>
                    About Us
                  </span>
                </Grid>
                <Grid item xs={12} className="about-text-content-main" mt={3}>
                  Klarfin's mission is to keep CXOs of SMBs and startups on top
                  of their cash flows and take smart decisions for cash and
                  credit management.
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={5.5} xs={12}>
              <img src={about} width="100%" alt="about" />
            </Grid>
          </Grid>
          <Grid container justifyContent="center" spacing={10} mt={0}>
            <Grid item xs={12}>
              <Grid container spacing={3}>
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
