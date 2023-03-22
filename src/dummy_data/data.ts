interface ExpenseBreakdown {
  Categories: {
    Name: string;
    spendAmount: number;
    Spend: number;
    Change: number;
  }[];
  Merchants: [];
}

interface InsightsData {
  category: string[];
  [key: string]: (string | number)[];
}

export interface History {
  date: string;
  updatedBy: string;
  actionTaker: string;
  recepient: string;
  action: string;
  msg: string;
}

export interface HistoryData {
  company: string;
  index: number;
  events: History[];
}

export interface ReceivablesRow {
  customer: string;
  "invoice number": number;
  amount: number;
  "balance amount": number;
  date: string;
  "ageing days": number;
  "credit period": number;
  history: History[];
}

export interface RecivablesColumn {
  field:
    | "customer"
    | "invoice number"
    | "amount"
    | "balance amount"
    | "date"
    | "credit period"
    | "ageing days";
  headerName: string;
}
export interface ReceivablesData {
  columns: RecivablesColumn[];
  rows: ReceivablesRow[];
}

export interface BillsRow {
  suppliers: string;
  date: string;
  category: string;
  "invoice number": number;
  amount: number;
  "balance amount": number;
  "ageing days": number;
}

export interface BillsColumn {
  field: keyof BillsRow;
  headerName: string;
}

export interface BillsData {
  columns: BillsColumn[];
  rows: BillsRow[];
}

export interface CreditLine {
  date: string;
  days: number;
  principal: number;
  interest: number;
  total: number;
}

export interface CreditLineColumn {
  field: keyof CreditLine;
  headerName: string;
}

export interface CreditHistory {
  date: string;
  particulars: string;
  days: number;
  rate: number;
  expense: string;
  supplier: string;
  amount: number;
}

export interface CreditHistoryColumn {
  field: keyof CreditHistory;
  headerName: string;
}

export interface CreditLineData {
  columns: CreditLineColumn[];
  rows: CreditLine[];
}
export interface CreditHistoryData {
  columns: CreditHistoryColumn[];
  rows: CreditHistory[];
}

export interface CreditData {
  creditLine: CreditLineData;
  creditHistory: CreditHistoryData;
}

export const creditData: CreditData = {
  creditLine: {
    columns: [
      {
        field: "date",
        headerName: "Date of Availing Credit",
      },
      {
        field: "days",
        headerName: "Days Outstanding",
      },
      {
        field: "principal",
        headerName: "Principal Due INR",
      },
      {
        field: "interest",
        headerName: "Interest Due INR",
      },
      {
        field: "total",
        headerName: "Total Due INR",
      },
    ],
    rows: [
      {
        date: "06-Sep-22",
        days: 6,
        principal: 500000,
        interest: 1151,
        total: 501151,
      },
      {
        date: "01-Sep-22",
        days: 11,
        principal: 80000,
        interest: 3375,
        total: 503375,
      },
      {
        date: "25-Aug-22",
        days: 11,
        principal: 340000,
        interest: 2347,
        total: 342347,
      },
      {
        date: "10-Aug-22",
        days: 33,
        principal: 980000,
        interest: 12404,
        total: 992404,
      },
      {
        date: "31-Jul-22",
        days: 43,
        principal: 180000,
        interest: 2969,
        total: 182969,
      },
    ],
  },
  creditHistory: {
    columns: [
      { field: "date", headerName: "Date" },
      { field: "particulars", headerName: "Particulars" },
      { field: "days", headerName: "Duration Days" },
      { field: "rate", headerName: "Interest Rate %" },
      { field: "expense", headerName: "Expense Paid" },
      { field: "supplier", headerName: "Supplier" },
      { field: "amount", headerName: "Amount INR" },
    ],
    rows: [
      {
        date: "05-Jul-22",
        particulars: "Credit Availed",
        days: 45,
        rate: 14,
        expense: "Purchase",
        supplier: "MCM Trading",
        amount: 400000,
      },
      {
        date: "19-Aug-22",
        particulars: "Repaid",
        days: 0,
        rate: 0,
        expense: "Purchase",
        supplier: "MCM Trading",
        amount: 406904,
      },
      {
        date: "20-Jun-22",
        particulars: "Credit Availed",
        days: 40,
        rate: 14,
        expense: "Advertisement",
        supplier: "Rise Digital Inc",
        amount: 140000,
      },
      {
        date: "30-Jul-22",
        particulars: "Repaid",
        days: 0,
        rate: 0,
        expense: "Advertisement",
        supplier: "Rise Digital Inc",
        amount: 142148,
      },
    ],
  },
};

export const expenseBreakdown: ExpenseBreakdown = {
  Categories: [
    {
      Name: "Purchase",
      spendAmount: 12850000,
      Spend: 64,
      Change: 5,
    },
    {
      Name: "Employee cost",
      spendAmount: 3000000,
      Spend: 14,
      Change: -3,
    },
    {
      Name: "Advertisement",
      spendAmount: 1010000,
      Spend: 4,
      Change: -1,
    },
    {
      Name: "Rent",
      spendAmount: 1200000,
      Spend: 6,
      Change: 0,
    },
    {
      Name: "Others",
      spendAmount: 2130000,
      Spend: 11,
      Change: -1,
    },
  ],
  Merchants: [],
};

export const balanceSheet: InsightsData = {
  category: [
    "Days Sales Outstanding",
    "Days Payable Outstanding",
    "Days Inventory Outstanding",
    "Cash Conversion Cycle (in days)",
    "Debt to Equity",
    "Debt to Total Assets",
    "Return on Equity (%)",
    "Return on Capital Employed (%)",
  ],
  "April 22": [47, 40, 25, 32, 1.2, 0.75, "12%", "11%"],
  "May 22": [60, 50, 20, 30, 1.5, 0.8, "12%", "9.50%"],
  "June 22": [28, 50, 30, 8, 1.55, 0.85, "12.5%", "10%"],
  "July 22": [55, 60, 25, 20, 1.6, 0.85, "11%", "10%"],
};

export const pnl: InsightsData = {
  category: [
    "Revenue",
    "Revenue Growth (%)",
    "Gross Profit Margin (%)",
    "EBITDA Margin (%)",
    "EBIT Margin (%)",
    "Net Profit Margin (%)",
    "Employee Compenstaion/ Revenue",
  ],
  "April 22": [4000000, "10%", "18%", "10%", "8%", "4.50%", 0.14],
  "May 22": [4400000, "10%", "22%", "11%", "8%", "5%", 0.14],
  "June 22": [5000000, "14%", "22%", "12%", "8.50%", "5%", 0.12],
  "July 22": [4800000, "-4%", "24%", "12.50%", "9%", "5.50%", 0.12],
};

export const cashflows: InsightsData = {
  category: [
    "Gross Cash Burn",
    "Net Cash Burn",
    "Gross runaway (in months)",
    "Net runway (in months)",
  ],
  "April 22": [2900000, 100000, 0.35, 2.5],
  "May 22": [3225000, 1725000, 0.16, 4.5],
  "June 22": [3685000, 335000, 0.24, 0.79],
  "July 22": [4825000, 2375000, 0.26, 0.86],
};

export const receivablesData: ReceivablesData = {
  columns: [
    { field: "customer", headerName: "Customer" },
    { field: "date", headerName: "Date" },
    { field: "invoice number", headerName: "Invoice number" },
    { field: "amount", headerName: "Amount INR" },
    { field: "balance amount", headerName: "Balance amount INR" },
    { field: "credit period", headerName: "Credit Period ( Days )" },
    { field: "ageing days", headerName: "Ageing Days" },
  ],
  rows:[]

};

export const billsData: BillsData = {
  columns: [
    { field: "suppliers", headerName: "Suppliers" },
    { field: "date", headerName: "Date" },
    { field: "category", headerName: "Category" },
    { field: "invoice number", headerName: "Invoice number" },
    { field: "amount", headerName: "Amount INR" },
    { field: "balance amount", headerName: "Balance amount" },
    { field: "ageing days", headerName: "Ageing Days" },
  ],
  rows: [
    {
      suppliers: "MCM Trading",
      category: "Purchase",
      "invoice number": 12,
      amount: 500000,
      "balance amount": 350000,
      date: "24-Jun-22",
      "ageing days": 80,
    },
    {
      suppliers: "Razor Inc",
      category: "Purchase",
      "invoice number": 20,
      amount: 500000,
      "balance amount": 350000,
      date: "02-Jan-22",
      "ageing days": 253,
    },
    {
      suppliers: "Jezone Inc",
      category: "Advertisement",
      "invoice number": 22,
      amount: 500000,
      "balance amount": 350000,
      date: "14-Mar-22",
      "ageing days": 182,
    },
    {
      suppliers: "MCM Trading",
      category: "Professional fee",
      "invoice number": 35,
      amount: 500000,
      "balance amount": 350000,
      date: "01-Sep-22",
      "ageing days": 11,
    },
    {
      suppliers: "Breaing & Co",
      category: "Rent",
      "invoice number": 4,
      amount: 500000,
      "balance amount": 350000,
      date: "18-Apr-22",
      "ageing days": 147,
    },
  ],
};
