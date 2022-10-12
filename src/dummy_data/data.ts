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
  type: string;
  msg: string;
}

export interface HistoryData {
  company: string;
  events: History[];
}

export interface ReceivablesRow {
  customer: string;
  "invoice number": number;
  amount: number;
  "balance amount": number;
  date: string;
  "ageing days": number;
  history: History[];
}

export interface RecivablesColumn {
  field:
    | "customer"
    | "invoice number"
    | "amount"
    | "balance amount"
    | "date"
    | "ageing days";
  headerName: string;
}
export interface ReceivablesData {
  columns: RecivablesColumn[];
  rows: ReceivablesRow[];
}

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
    { field: "balance amount", headerName: "Balance amount" },
    { field: "ageing days", headerName: "Ageing Days" },
  ],
  rows: [
    {
      customer: "John & Co",
      "invoice number": 12,
      amount: 500000,
      "balance amount": 350000,
      date: "24-Jun-22",
      "ageing days": 80,
      history: [],
    },
    {
      customer: "Shine Inc",
      "invoice number": 20,
      amount: 500000,
      "balance amount": 350000,
      date: "02-Jan-22",
      "ageing days": 253,
      history: [
        {
          date: "04-Aug-22",
          msg: "Called Robin who said these will be paid at the next pay run on Friday",
          type: "call",
        },
        {
          date: "02-Aug-22",
          msg: "Chase email sent",
          type: "email",
        },
        {
          date: "05-Jun-22",
          msg: "Robin called to let us know that payment was being delayed",
          type: "call",
        },
      ],
    },
    {
      customer: "Jezone Inc",
      "invoice number": 22,
      amount: 500000,
      "balance amount": 350000,
      date: "14-Mar-22",
      "ageing days": 182,
      history: [],
    },
    {
      customer: "Ayeko Trading",
      "invoice number": 35,
      amount: 500000,
      "balance amount": 350000,
      date: "01-Sep-22",
      "ageing days": 11,
      history: [],
    },
    {
      customer: "Breaing & Co",
      "invoice number": 4,
      amount: 500000,
      "balance amount": 350000,
      date: "18-Apr-22",
      "ageing days": 147,
      history: [],
    },
    {
      customer: "Angel Sales",
      "invoice number": 16,
      amount: 500000,
      "balance amount": 350000,
      date: "15-Nov-22",
      "ageing days": 301,
      history: [],
    },
    {
      customer: "Shine Inc",
      "invoice number": 27,
      amount: 500000,
      "balance amount": 350000,
      date: "16-Apr-22",
      "ageing days": 149,
      history: [],
    },
    {
      customer: "Ayeko Trading",
      "invoice number": 32,
      amount: 500000,
      "balance amount": 350000,
      date: "17-Jun-22",
      "ageing days": 87,
      history: [],
    },
  ],
};
