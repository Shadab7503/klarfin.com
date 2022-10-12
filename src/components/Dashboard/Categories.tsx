import { useState } from "react";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Checkbox from "@mui/material/Checkbox";
const Categories = () => {
  const [tab, setTab] = useState<string>("Inflows");
  return (
    <Grid container className="categories-padding">
      <Grid item xs={12} mt={2}>
        <Grid container>
          <Grid
            item
            className="categories-section"
            mr={{ sm: 5, xs: 3 }}
            onClick={() => setTab("Inflows")}
            style={{
              background: tab === "Inflows" ? "#30A8D8" : "white",
              color: tab === "Inflows" ? "white" : "black",
            }}
          >
            Inflows
          </Grid>
          <Grid
            item
            className="categories-section"
            onClick={() => setTab("Outflows")}
            style={{
              background: tab === "Outflows" ? "#30A8D8" : "white",
              color: tab === "Outflows" ? "white" : "black",
            }}
          >
            Outflows
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container mt={5}>
          <Accordion defaultExpanded={true} elevation={0}>
            <AccordionSummary
              className="categories-accordion"
              style={{ minHeight: "0" }}
            >
              <Grid container alignItems="center">
                <span className="categories-heading">Direct Expenses </span>
                <ArrowDropDownIcon />
              </Grid>
            </AccordionSummary>
            <AccordionDetails style={{ padding: 0, paddingLeft: "1rem" }}>
              <Grid container alignItems="center">
                <Checkbox />
                <span className="categories-cateogry">Purchases</span>
              </Grid>
              <Grid container alignItems="center">
                <Checkbox />
                <span className="categories-cateogry">Wages</span>
              </Grid>
              <Grid container alignItems="center">
                <Checkbox />
                <span className="categories-cateogry">
                  Manufacturing Expenses
                </span>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid container mt={3}>
          <Accordion defaultExpanded={true} elevation={0}>
            <AccordionSummary
              className="categories-accordion"
              style={{ minHeight: "0" }}
            >
              <Grid container alignItems="center">
                <span className="categories-heading">Indirect Expenses </span>
                <ArrowDropDownIcon />
              </Grid>
            </AccordionSummary>
            <AccordionDetails style={{ padding: 0, paddingLeft: "1rem" }}>
              <Grid container alignItems="center">
                <Checkbox />
                <span className="categories-cateogry">
                  Advertising Expenses
                </span>
              </Grid>
              <Grid container alignItems="center">
                {/* <span className="categories-cateogry">Employee Costs</span> */}
                <Accordion defaultExpanded={true} elevation={0}>
                  <AccordionSummary
                    className="categories-accordion"
                    style={{ minHeight: "0", padding: 0 }}
                  >
                    <Grid container alignItems="center">
                      <Checkbox />
                      <span className="categories-heading">
                        Employee Costs{" "}
                      </span>
                      <ArrowDropDownIcon />
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails style={{ padding: 0, paddingLeft: "1rem" }}>
                    <Grid container alignItems="center">
                      <Checkbox style={{ visibility: "hidden" }} />
                      <span className="categories-cateogry">Salary </span>
                    </Grid>
                    <Grid container alignItems="center">
                      <Checkbox style={{ visibility: "hidden" }} />
                      <span className="categories-cateogry">
                        Staff Welfare{" "}
                      </span>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid container alignItems="center">
                <Checkbox />
                <span className="categories-cateogry">Interest </span>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
      <Grid item xs={12} mt={5}>
        <Grid container>
          <Grid
            item
            className="categories-button"
            lg={3}
            sm={3.5}
            xs={12}
            mr={2}
          >
            Add
          </Grid>
          <Grid
            item
            className="categories-button"
            lg={3}
            sm={3.5}
            mr={2}
            xs={12}
          >
            Reclassify
          </Grid>
          <Grid
            item
            className="categories-button"
            lg={3}
            sm={3.5}
            xs={12}
            mr={2}
          >
            Delete
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Categories;
