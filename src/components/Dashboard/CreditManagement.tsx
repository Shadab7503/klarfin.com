import { useState } from "react";
import Grid from "@mui/material/Grid";
import { Tabs, Tab } from "@mui/material";
import { creditData, CreditData } from "../../dummy_data/data";
import CreditLine from "./CreditLine";
import CreditHistory from "./CreditHistory";

const CreditManagement = () => {
  const [selectedTab, setSelectedTab] =
    useState<keyof CreditData>("creditLine");
  const [data, setData] = useState<CreditData>(creditData);

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: keyof CreditData
  ) => {
    setSelectedTab(newValue);
  };

  return (
    <Grid container>
      <Grid item xs={12} mt={3}>
        <Grid container justifyContent="center">
          <Grid
            item
            className="credit-top"
            mr={{ lg: 10, md: 5, xs: 1 }}
            mt={{ sm: 0, xs: 1 }}
          >
            Credit Limit <br />
            INR 30,00,000
          </Grid>
          <Grid
            item
            className="credit-top"
            mr={{ lg: 10, md: 5, xs: 1 }}
            mt={{ sm: 0, xs: 1 }}
          >
            Credit Availed <br />
            INR 28,00,000
          </Grid>
          <Grid item className="credit-top" mt={{ sm: 0, xs: 1 }}>
            Balance credit limit <br />
            INR 2,00,000
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className="insights-tabs settings-tabs">
        <Grid
          container
          style={{ overflow: "hidden" }}
          className="credit-padding"
          mt={2}
        >
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons={false}
            style={{ overflow: "hidden" }}
          >
            <Tab
              value="creditLine"
              style={{ textTransform: "none" }}
              disableRipple={true}
              className=" insights-tab settings-tab"
              sx={{
                "&.Mui-selected": {
                  color: "black",
                  borderBottom: "2px solid #30A8D8",
                },
              }}
              label={"Ongoing Credit Line"}
            />
            <Tab
              value="creditHistory"
              style={{ textTransform: "none" }}
              disableRipple={true}
              className=" insights-tab settings-tab"
              sx={{
                "&.Mui-selected": {
                  color: "black",
                  borderBottom: "2px solid #30A8D8",
                },
              }}
              label={"History"}
            />
          </Tabs>
        </Grid>
      </Grid>
      <Grid container className="credit-padding">
        {selectedTab === "creditLine" ? (
          <CreditLine data={data.creditLine} />
        ) : (
          <CreditHistory data={data.creditHistory} />
        )}
      </Grid>
    </Grid>
  );
};

export default CreditManagement;
