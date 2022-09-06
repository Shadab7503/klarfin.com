import Grid from "@mui/material/Grid";
import cashflow from "../../../images/cashflow.png";
import paidFaster from "../../../images/paid-faster.png";
import financialInsights from "../../../images/financial-insights.png";
import payVendors from "../../../images/pay-vendors.png";
import bank from "../../../images/bank.png";
import manageCashflow from "../../../images/cashflow.jpeg";
import invoice from "../../../images/invoice.jpg";
import credit from "../../../images/credit.jpeg";

const Features = () => {
  return (
    <div className="features">
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <span className="features-title">Features</span>
        </Grid>
        <Grid item xl={9} lg={10.5} xs={11}>
          <Grid container spacing={{ lg: 20, md: 10 }}>
            <Grid item xs={12}>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                spacing={4}
                className="features-section"
              >
                <Grid item md={6} xs={12}>
                  <Grid container spacing={2}>
                    <Grid item md={12} sm={6} xs={12} className="features-item">
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
                          sx={{
                            height: { xs: "auto", sm: "6rem", md: "auto" },
                          }}
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
                    <Grid item md={12} sm={6} xs={12} className="features-item">
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
                  </Grid>
                </Grid>
                <Grid item md={6} sm={10}>
                  <img
                    src={manageCashflow}
                    className="features-section-image"
                    width="100%"
                    alt="manage cashflows"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                spacing={4}
                className="features-section"
              >
                <Grid
                  item
                  md={6}
                  sm={10}
                  sx={{ display: { xs: "none", md: "block" } }}
                >
                  <img
                    src={invoice}
                    className="features-section-image"
                    width="100%"
                    alt="Invoice"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Grid container spacing={2}>
                    <Grid item md={12} sm={6} xs={12} className="features-item">
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
                          <Grid
                            container
                            alignItems="center"
                            justifyContent="center"
                            height="100%"
                          >
                            <img
                              src={paidFaster}
                              alt="paid-faster"
                              className="features-item-image"
                              style={{ maxHeight: "70px" }}
                            />
                          </Grid>
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
                    <Grid item md={12} sm={6} xs={12} className="features-item">
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
                <Grid
                  item
                  md={6}
                  sm={10}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  <img
                    src={invoice}
                    className="features-section-image"
                    width="100%"
                    alt="invoice"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} className="instant-credit">
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                spacing={4}
                className="features-section"
              >
                <Grid item md={6}>
                  <Grid item xs={12} className="features-item">
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
                          src={bank}
                          alt="instant-credit"
                          className="features-item-image"
                        />
                      </Grid>
                      <Grid
                        item
                        md={9}
                        sx={{ textAlign: { xs: "center", md: "left" } }}
                      >
                        <span className="features-item-heading">
                          Get Instant Credit
                        </span>
                        <span className="features-item-text">
                          Avail Klarfin's credit facility to cover your
                          operational costs like payroll, inventory, marketing
                          and others
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={6} sm={10} textAlign="center">
                  <img src={credit} width="100%" alt="credit" />
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
