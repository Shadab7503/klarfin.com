import { useState } from "react";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Categories from "../Dashboard/Categories";
import CompanyManagement from "../Dashboard/Company_Management";
import UserManagement from "../Dashboard/UserManagement";
import Security from "../Dashboard/Security";
import { SettingsProps } from "../../utils/interface";

const Settings = (props: SettingsProps) => {
  const [selectedTab, setSelectedTab] = useState<string>("User management");

  const tabs: { [key: string]: JSX.Element } = {
    Categories: <Categories />,
    "Company management": <CompanyManagement />,
    "User management": (
      <UserManagement
        role={props.role}
        email={props.email}
        accessToken={props.accessToken}
      />
    ),
    Security: <Security />,
  };

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
                    className="insights-tab settings-tab"
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
