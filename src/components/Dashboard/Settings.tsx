import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Categories from "./Categories";
import CompanyManagement from "./Company_Management";
import UserManagement from "./User_Management";
import Security from "./Security";

const tabs: { [key: string]: JSX.Element } = {
  Categories: <Categories />,
  "Company management": <CompanyManagement />,
  "User management": <UserManagement />,
  Security: <Security />,
};

const Settings = () => {
  const [selectedTab, setSelectedTab] = useState<string>("User management");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  return (
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={12} className="settings-heading settings-padding">
          Advanced Settings
        </Grid>
        <Grid item xs={12} className="settings-tabs">
          <Grid container style={{ overflow: "hidden" }}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons={false}
              style={{ overflow: "hidden" }}
            >
              {Object.keys(tabs).map((tab: string) => {
                return (
                  <Tab
                    key={tab}
                    value={tab}
                    style={{ textTransform: "none" }}
                    disableRipple={true}
                    className="settings-tab"
                    sx={{
                      "&.Mui-selected": {
                        color: "black",
                        borderBottom: "2px solid #30A8D8",
                      },
                    }}
                    label={tab}
                  />
                );
              })}
            </Tabs>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {tabs[selectedTab]}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Settings;
