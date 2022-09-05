import Grid from "@mui/material/Grid";

const Works = () => {
  return (
    <div className="works">
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <span className="works-title">How it Works?</span>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          xl={11}
          lg={11.5}
          md={8}
          sm={10}
          xs={11}
        >
          <Grid item lg={3.5} xs={12} className="works-step">
            <Grid
              container
              justifyContent="center"
              sx={{ height: { lg: "100%", md: "auto" } }}
            >
              <Grid container>
                <Grid item xs={1.5}>
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
                <Grid
                  item
                  xs={10.5}
                  className="works-step-heading"
                  sx={{ height: { lg: "100%", md: "auto" } }}
                >
                  <Grid
                    container
                    sx={{ height: { lg: "100%", md: "auto" } }}
                    alignItems="space-between"
                  >
                    <Grid item xs={12} className="works-heading">
                      Sync your data
                    </Grid>
                    <Grid item xs={12} className="works-step-text">
                      <Grid
                        container
                        alignItems="flex-end"
                        sx={{ height: { lg: "100%", md: "auto" } }}
                      >
                        Seamlessly and securely integrate your accounting system
                        and bank accounts with Klarfin
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4} xs={12} className="works-step">
            <Grid
              container
              justifyContent="center"
              sx={{ height: { lg: "100%", md: "auto" } }}
            >
              <Grid container>
                <Grid item md={1.5} xs={1.5}>
                  <Grid
                    container
                    justifyContent="center"
                    sx={{ height: { lg: "100%", md: "auto" } }}
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
                  md={10.5}
                  xs={10.5}
                  className="works-step-heading"
                  sx={{ height: { lg: "100%", md: "auto" } }}
                >
                  <Grid
                    container
                    sx={{ height: { lg: "100%", md: "auto" } }}
                    alignItems="space-between"
                  >
                    <Grid item xs={12} className="works-heading">
                      Access the cash management platform
                    </Grid>
                    <Grid item xs={12} className="works-step-text">
                      <Grid
                        container
                        alignItems="flex-end"
                        sx={{ height: { lg: "100%", md: "auto" } }}
                      >
                        Get a consolidated view of your cash position, automate
                        your collections and make vendor payments effortlessly
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4} xs={12} className="works-step">
            <Grid
              container
              justifyContent="center"
              sx={{ height: { lg: "100%", md: "auto" } }}
            >
              <Grid container>
                <Grid item md={1.5} xs={1.5}>
                  <Grid
                    container
                    justifyContent="center"
                    sx={{ height: { lg: "100%", md: "auto" } }}
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
                  md={10.5}
                  xs={10.5}
                  className="works-step-heading"
                  sx={{ height: { lg: "100%", md: "auto" } }}
                >
                  <Grid
                    container
                    sx={{ height: { lg: "100%", md: "auto" } }}
                    alignItems="space-between"
                  >
                    <Grid item xs={12} className="works-heading">
                      Access credit within the platform
                    </Grid>
                    <Grid item xs={12} className="works-step-text">
                      <Grid
                        container
                        alignItems="flex-end"
                        sx={{ height: { lg: "100%", md: "auto" } }}
                      >
                        Once approved, we setup a credit line for you within
                        minutes that you can avail to make operational payments
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

export default Works;
