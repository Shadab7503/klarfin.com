import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";

const steps = [
  {
    title: "Sync your data",
    text: "Seamlessly and securely integrate your accounting system and bank accounts with Klarfin",
  },
  {
    title: "Access the cash management platform",
    text: "Get a consolidated view of your cash position, automate your collections and make vendor payments effortlessly",
  },
  {
    title: "Access credit within the platform",
    text: "Once approved, we setup a credit line for you within minutes that you can avail to make operational payments",
  },
];

const Works = () => {
  const matches = useMediaQuery("(max-width:900px)");

  return (
    <div className="works">
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Grid
            container
            className="works-title"
            alignItems="center"
            justifyContent="center"
          >
            How it Works in&nbsp;
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              className="works-heading-number"
            >
              3
            </Grid>
            &nbsp;steps?
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          xl={11}
          lg={11.5}
          md={11}
          sm={8}
          xs={11}
        >
          {!matches ? (
            <>
              {steps.map((_, index: number) => {
                return (
                  <Grid
                    key={index}
                    item
                    lg={3.5}
                    md={4}
                    xs={12}
                    className="works-step"
                  >
                    <Grid container sx={{ height: { lg: "100%", md: "auto" } }}>
                      <Grid item xs={12}>
                        <Grid container style={{ height: "100%" }}>
                          <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                            className="works-heading-number"
                          >
                            {index + 1}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
              {steps.map((step, index: number) => {
                return (
                  <Grid
                    key={step.title}
                    item
                    lg={3.5}
                    md={4}
                    xs={12}
                    className="works-step"
                  >
                    <Grid container sx={{ height: { lg: "100%", md: "auto" } }}>
                      <Grid
                        item
                        xs={10.5}
                        className="works-step-heading"
                        sx={{ height: { lg: "100%", md: "auto" } }}
                      >
                        <Grid
                          container
                          mt={2}
                          sx={{ height: { lg: "100%", md: "auto" } }}
                        >
                          <Grid item xs={12} className="works-heading">
                            {step.title}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
              {steps.map((step, index: number) => {
                return (
                  <Grid
                    key={step.text}
                    item
                    lg={3.5}
                    md={4}
                    xs={12}
                    className="works-step"
                  >
                    <Grid container sx={{ height: { lg: "100%", md: "auto" } }}>
                      <Grid
                        item
                        xs={10.5}
                        className="works-step-heading"
                        sx={{ height: { lg: "100%", md: "auto" } }}
                      >
                        <Grid
                          container
                          mt={2}
                          sx={{ height: { lg: "100%", md: "auto" } }}
                        >
                          <Grid item xs={12} className="works-step-text">
                            <Grid
                              container
                              sx={{ height: { lg: "100%", md: "auto" } }}
                            >
                              {step.text}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </>
          ) : (
            <>
              {steps.map((step, index: number) => {
                return (
                  <Grid key={step.text} item xs={12} className="works-step">
                    <Grid container sx={{ height: { lg: "100%", md: "auto" } }}>
                      <Grid item xs={12}>
                        <Grid container style={{ height: "100%" }}>
                          <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                            className="works-heading-number"
                          >
                            {index + 1}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container sx={{ height: { lg: "100%", md: "auto" } }}>
                      <Grid
                        item
                        xs={12}
                        className="works-step-heading"
                        sx={{ height: { lg: "100%", md: "auto" } }}
                      >
                        <Grid
                          container
                          mt={2}
                          sx={{ height: { lg: "100%", md: "auto" } }}
                        >
                          <Grid item xs={12} className="works-heading">
                            {step.title}
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          mt={2}
                          sx={{ height: { lg: "100%", md: "auto" } }}
                        >
                          <Grid item xs={12} className="works-step-text">
                            <Grid
                              container
                              sx={{ height: { lg: "100%", md: "auto" } }}
                            >
                              {step.text}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Works;
