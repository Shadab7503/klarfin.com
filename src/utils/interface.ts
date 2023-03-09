export interface user {
  name: string;
  companyName: string;
  panNumber: string;
  mobileNumber: string;
  email: string;
  industryName: string;
  password: string;
}

export interface ExpenseBreakdown {
  Categories: {
    Name: string;
    spendAmount: number;
    Spend: number;
    Change: number;
  }[];
  Merchants: [];
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

export interface TopBarProps {
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
  companyName: string;
}

export interface User {
  role: string;
  isEmailVerified: boolean;
  isAdminApproved: boolean;
  name: string;
  companyName: string;
  panNumber: string;
  mobileNumber: number;
  email: string;
  industryName: string;
  apiKey: string;
  id: string;
}

export interface Invite {
  name: string;
  email: string;
  access: string;
}

interface DashboardProps {
  accessToken: string;
}

export interface SettingsProps extends DashboardProps {
  role: string;
  email: string;
}

export interface UserManagementProps extends DashboardProps {
  role: string;
  email: string;
}

export interface Receipt {
  vouchertype: string;
  voucherdate: string;
  ledgername: string;
  amount: number;
}

export interface Ledger {
  name: string;
  parent: string;
  grandparent: string;
  billbybill: string;
  type: string;
}

export interface CashinFlow {
  cashinflow_receipt: Receipt[];
  cashinflow_ledger: Ledger[];
}

export interface JournalType {
  journal_type:string;
  payment_amount:number;
  payment_date:string;
}

export interface Journal {
  amount_Journal: number;
  ledgername: string;
  type: JournalType[];
  voucherdate: string;
  vouchertype: string;
}

export interface PurchaseType {
  purchase_type:string;
  payment_amount:number;
  payment_voucherdate:string;
}

export interface Purchase{
  amount_Purchase: number;
  ledgername: string;
  type: PurchaseType[];
  voucherdate: string;
  vouchertype: string;
  referencedate:string;
  referenceno:string;

}

export interface PaymentsType {
  payment_type:string;
  payment_amount:number;
}

export interface Payments {
  billdetail: any;
  type: PaymentsType;
  voucherdate: string;
  vouchertype: string;
}

export interface CashoutFlow {
  cashoutflow_journal: Journal[];
  cashoutflow_payments: Payments[];
  cashoutflow_purchase: Purchase[];
}

export interface Inflow {
  cashinflow: CashinFlow[];
}

export interface Outflow {
  cashoutflow: CashoutFlow[];
}

export interface InflowData {
  [key: string]: {
    [key: string]: number;
  };
}

export interface OutflowData {
  [key: string]: {
    [key: string]: number;
  };
}

export interface CashflowTable {
  [key: string]: {
    [key: string]: {
      [key: string]: number;
    };
  };
}

export interface Member {
  role: string;
  isEmailVerified: boolean;
  adminId: string;
  name: string;
  email: string;
  id: string;
}

export interface Inflow {
  success: boolean;
  cashinflow: CashinFlow[];
}

export interface Outflow {
  success: boolean;
  cashoutflow: CashoutFlow[];
}

export interface StringDict {
  [key: string]: number;
}

export interface Filter {
  dataType: "string" | "number" | "date";
  max?: string;
  min?: string;
  value?: string;
  type?: string;
}

export interface Filters {
  [key: string]: Filter;
}

export interface ColumnTypeMap {
  [key: string]: "string" | "number" | "date";
}

export interface ColumnBoolean {
  [key: string]: boolean;
}

export interface Invoice {
  "Invoice Date": string;
  "Invoice No.": number;
  "Invoice Amount (INR)": number;
  "Amount Due (INR)": number;
  Payment: string;
}

export interface InvoiceNumberMap {
  [key: number]: Invoice;
}

export interface SetPassword {
  password: string;
  confirmPassword: string;
}

export interface Admin {
  panNumber: string;
  mobileNumber: number;
  companyName: string;
  id: string;
  email: string;
  apiKey: string;
  isEmailVerified: boolean;
  isAdminApproved:boolean;
  dataProcessed:boolean;
  dataProcessing:boolean;
}

export interface AdminColumn {
  field: keyof Admin;
  headerName: string;
}
