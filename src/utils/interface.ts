export interface user {
  name: string;
  companyName: string;
  panNumber: string;
  mobileNumber: string;
  email: string;
  industryName: string;
  password: string;
}

export interface loginDetails {
  email: string;
  password: string;
  remember: boolean;
}

export interface sidebarUtils {
  selectedItem: string;
  drawerOpen: boolean;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface dashboardAreaUtils {
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
