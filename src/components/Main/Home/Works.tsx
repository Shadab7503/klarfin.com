import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import tally from "../../../images/tally.jpg";
import busy from "../../../images/busy.png";
import zoho from "../../../images/zoho.png";
import icici from "../../../images/icici.png";
import hdfc from "../../../images/hdfc.jpg";
import axis from "../../../images/axis.png";
import platform from "../../../images/platform.png";

const companyIcons = [
  { name: "tally", icon: tally },
  { name: "busy", icon: busy },
  { name: "zoho", icon: zoho },
  { name: "icici", icon: icici },
  { name: "hdfc", icon: hdfc },
  { name: "axis", icon: axis },
];

const Works = () => {
  return (
    <div className="works">
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <span className="works-title">How it Works?</span>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item xl={9} sm={11} xs={11.5} className="works-step">
            <Grid container justifyContent="space-around" alignItems="center">
              <Grid item md={6} xs={12}>
                <Grid container>
                  <Grid item md={1.5} xs={1.5}>
                    <Grid
                      container
                      justifyContent="center"
                      style={{ height: "100%" }}
                    >
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        className="works-heading-number"
                      >
                        1
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={9.5} xs={10.5} className="works-step-heading">
                    <Grid container>
                      <Grid item xs={12} className="works-heading">
                        Sync your data
                      </Grid>
                      <Grid item xs={12} className="works-step-text">
                        Seamlessly and securely integrate your accounting system
                        and bank accounts with Klarfin
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                lg={4}
                md={5}
                sm={8}
                xs={11}
                sx={{ mt: { md: "0rem", xs: "3rem" } }}
              >
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                >
                  <Grid container justifyContent="center" spacing={3}>
                    {companyIcons.map((companyIcon) => (
                      <Grid item md={3} xs={3} key={companyIcon.name}>
                        <Paper
                          elevation={5}
                          style={{ height: "100%", margin: "0rem" }}
                        >
                          <Grid container alignItems="center" height="100%">
                            <img
                              src={companyIcon.icon}
                              width="100%"
                              alt={companyIcon.name}
                            />
                          </Grid>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={9} sm={11} xs={11.5} className="works-step">
            <Grid container alignItems="center" justifyContent="space-around">
              <Grid item md={6} sm={12}>
                <Grid container>
                  <Grid item md={1.5} sm={2} xs={1.5}>
                    <Grid
                      container
                      justifyContent="center"
                      style={{ height: "100%" }}
                    >
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        className="works-heading-number"
                      >
                        2
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    md={9.5}
                    sm={10}
                    xs={10.5}
                    className="works-step-heading"
                  >
                    <Grid container>
                      <Grid item xs={12} className="works-heading">
                        Access the cash management platform
                      </Grid>
                      <Grid item xs={12} className="works-step-text">
                        Get a consolidated view of your cash position, automate
                        your collections and make vendor payments effortlessly
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                lg={4}
                md={5}
                sm={9}
                xs={11}
                sx={{ mt: { md: "0rem", xs: "3rem" } }}
              >
                <img src={platform} width="100%" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={9} sm={11} xs={11.5} className="works-step">
            <Grid container alignItems="center" justifyContent="space-around">
              <Grid item md={6} sm={12}>
                <Grid container>
                  <Grid item md={1.5} sm={2} xs={1.5}>
                    <Grid
                      container
                      justifyContent="center"
                      style={{ height: "100%" }}
                    >
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        className="works-heading-number"
                      >
                        3
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    md={9.5}
                    sm={10}
                    xs={10.5}
                    className="works-step-heading"
                  >
                    <Grid container>
                      <Grid item xs={12} className="works-heading">
                        Access credit within the platform
                      </Grid>
                      <Grid item xs={12} className="works-step-text">
                        Once approved, we setup a credit line for you within
                        minutes that you can avail to make operational payments
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                lg={4}
                md={5}
                sm={9}
                xs={11}
                sx={{ mt: { md: "0rem", xs: "3rem" } }}
              >
                <img src={platform} width="100%" />
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item xl={8}>
            <Paper style={{ height: "100%" }}>
              <Grid container className="works-step">
                <Grid item xs={12} className="works-step-heading">
                  <Grid container justifyContent="space-evenly">
                    <Grid item xl={1.5}>
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="center"
                        style={{ height: "100%" }}
                      >
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                          className="works-heading-number"
                        >
                          2
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={8} className="works-heading">
                      <Grid container height="100%" alignItems="center">
                        Access the cash management platform
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container justifyContent="center">
                    <img
                      src={platform}
                      width="90%"
                      style={{ border: "1px solid #d3d3d3" }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} className="works-step-text">
                  Get a consolidated view of your cash position, automate your
                  collections and make vendor payments effortlessly
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xl={4} style={{ height: "100%" }}>
            <Paper style={{ height: "100%" }}>
              <Grid container className="works-step">
                <Grid item xs={12} className="works-step-heading">
                  <Grid container justifyContent="space-evenly">
                    <Grid item xl={1.5}>
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="center"
                        style={{ height: "100%" }}
                      >
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                          className="works-heading-number"
                        >
                          3
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={8} className="works-heading">
                      <Grid container height="100%" alignItems="center">
                        Access credit within the platform
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2} justifyContent="center">
                    {companyIcons.map((companyIcon) => (
                      <Grid item xl={2.5}>
                        <Paper
                          elevation={5}
                          style={{ height: "100%", margin: "0rem" }}
                        >
                          <Grid
                            key={companyIcon.name}
                            container
                            alignItems="center"
                            height="100%"
                          >
                            <img
                              src={companyIcon.icon}
                              width="100%"
                              alt={companyIcon.name}
                            />
                          </Grid>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item xs={12} className="works-step-text">
                  Once approved, we setup a credit line for you within minutes
                  that you can avail to make operational payments
                </Grid>
              </Grid>
            </Paper>
          </Grid> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Works;
