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
          <div style={{ width: "100%" }}>
            <Grid
              item
              sm={5.5}
              style={{ display: "inline-block", width: "100%" }}
            >
              <Grid container>
                <Grid item xs={12}>
                  <span
                    className="about-heading"
                    style={{ textAlign: "center" }}
                  >
                    About Us
                  </span>
                </Grid>
              </Grid>
            </Grid>
            <img src={about} className="about-image" alt="about" />
            <div
              className="about-text-content-main"
              style={{ marginTop: "2rem" }}
            >
              Klarfin's mission is to keep CXOs of SMBs and startups on top of
              their cash flows and take smart decisions for cash and credit
              management.
            </div>
            <div style={{ marginTop: "2rem" }}>
              <span className="about-text-points-title">
                Our cash flow management platform provides SMBs with -
              </span>
              <ul>
                <li className="about-text-points">
                  a simplified dashboard with real time view of their cash flow
                  activity to help make smarter decisions
                </li>
                <li className="about-text-points">
                  a single source of truth with data unified from all bank
                  accounts, accounting software and other business tools
                </li>
                <li className="about-text-points">
                  in-built features for forecasting, scenario planning,
                  automated invoice collections and embedded payments
                </li>
              </ul>
            </div>
            <div className="about-text-content-main">
              Our embedded credit functionality allows SMBs to avail credit
              instantly at critical points in their workflow to cover
              operational costs like payroll, inventory, marketing etc.
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Mission;
