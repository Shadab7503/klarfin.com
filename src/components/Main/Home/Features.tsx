import Grid from "@mui/material/Grid";
import cashflow from "../../../images/cashflow.png";
import paidFaster from "../../../images/paid-faster.png";
import financialInsights from "../../../images/financial-insights.png";
import payVendors from "../../../images/pay-vendors.png";
import bank from "../../../images/bank.png";

const Features = () => {
  return (
    <div className="features">
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <span className="features-title">Features</span>
        </Grid>

        <Grid item lg={11.5} xs={11}>
          <Grid container justifyContent="space-between" spacing={1}>
            <Grid item lg={8.2} md={12}>
              <Grid container justifyContent="space-evenly">
                <Grid item xs={12} className="features-heading">
                  Cash Management
                </Grid>
                <Grid container justifyContent="space-evenly" pt={5}>
                  <Grid item sm={5.8} className="features-item">
                    <Grid
                      container
                      justifyContent="space-around"
                      alignItems="center"
                    >
                      <Grid
                        item
                        lg={2}
                        md={2}
                        sm={10}
                        xs={5}
                        sx={{ height: { xs: "auto", sm: "6rem", md: "auto" } }}
                      >
                        <img
                          src={cashflow}
                          alt="cashflow"
                          className="features-item-image"
                        />
                      </Grid>
                      <Grid
                        item
                        md={9}
                        sx={{ textAlign: { xs: "center", md: "left" } }}
                      >
                        <span className="features-item-heading">
                          Manage Cash flows
                        </span>
                        <span className="features-item-text">
                          Monitor your cash flows in real time without any
                          dependency on finance team
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sm={5.8} className="features-item">
                    <Grid
                      container
                      justifyContent="space-around"
                      alignItems="center"
                    >
                      <Grid
                        item
                        lg={2}
                        md={2}
                        sm={10}
                        xs={5}
                        sx={{ height: { sm: "6rem", md: "auto" } }}
                      >
                        <img
                          src={paidFaster}
                          alt="paid-faster"
                          className="features-item-image"
                        />
                      </Grid>
                      <Grid
                        item
                        md={9}
                        sx={{ textAlign: { xs: "center", md: "left" } }}
                      >
                        <span className="features-item-heading">
                          Get Paid Faster
                        </span>
                        <span className="features-item-text">
                          Keep track of all your unpaid invoices and send
                          reminders to your customers with a single click
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sm={5.8} className="features-item">
                    <Grid
                      container
                      justifyContent="space-around"
                      alignItems="center"
                    >
                      <Grid
                        item
                        lg={2}
                        md={2}
                        sm={6}
                        xs={5}
                        sx={{ height: { sm: "6rem", md: "auto" } }}
                      >
                        <img
                          src={financialInsights}
                          alt="financial-insights"
                          className="features-item-image"
                        />
                      </Grid>
                      <Grid
                        item
                        md={9}
                        sx={{ textAlign: { xs: "center", md: "left" } }}
                      >
                        <span className="features-item-heading">
                          Get Financial Insights
                        </span>
                        <span className="features-item-text">
                          Make smarter decisions by using Klarfin’s financial
                          insights & KPIs of your business
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sm={5.8} className="features-item">
                    <Grid
                      container
                      justifyContent="space-around"
                      alignItems="center"
                    >
                      <Grid
                        item
                        lg={2}
                        md={2}
                        sm={6}
                        xs={5}
                        sx={{ height: { sm: "6rem", md: "auto" } }}
                      >
                        <img
                          src={payVendors}
                          alt="pay-vendors"
                          className="features-item-image"
                          width="80%"
                        />
                      </Grid>
                      <Grid
                        item
                        md={9}
                        sx={{ textAlign: { xs: "center", md: "left" } }}
                      >
                        <span className="features-item-heading">
                          Pay Vendors effortlessly
                        </span>
                        <span className="features-item-text">
                          Keep a track of all your vendor bills, prioritize
                          payments and make payments effortlessly
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={3.8} md={12}>
              <Grid container className="features-business-credit">
                <Grid item xs={12} className="features-heading">
                  Business Credit
                </Grid>
                <Grid container justifyContent="space-evenly" pt={5}>
                  <Grid item lg={12} md={8} className="features-item">
                    <Grid
                      container
                      justifyContent="space-around"
                      alignItems="center"
                    >
                      <Grid item lg={2} md={2} sm={4} xs={5}>
                        <img src={bank} alt="cashflow" width="70%" />
                      </Grid>
                      <Grid
                        item
                        md={9.5}
                        sx={{ textAlign: { xs: "center", md: "left" } }}
                      >
                        <span className="features-item-heading">
                          Get Instant Credit
                        </span>
                        <span className="features-item-text">
                          Avail Klarfin’s credit facility to cover your
                          operational costs like payroll, inventory, marketing
                          and others
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Features;
