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
