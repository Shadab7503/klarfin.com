import CashFlows from "./CashFlows";
import Insights from "./Insights";
import Receivables from "./Receivables";
import Bills from "./Bills";
import Settings from "./Settings";
// import CreditManagement from "./CreditManagement";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "../Layout/adminLayout";

const Dashboard = (props: any) => {

  const { accessToken, user } = props;

  return (  

    <BrowserRouter>
      <Routes >
        <Route path="/dashboard/cashflow" element={<AdminLayout user={user} >
          <CashFlows accessToken={accessToken} /></AdminLayout>} />
        <Route path="/dashboard/insights" element={<AdminLayout user={user} ><Insights accessToken={accessToken} /></AdminLayout>} />
        <Route path="/dashboard/settings" element={<AdminLayout user={user} ><Settings role={user.role} email={user.email} accessToken={accessToken} /></AdminLayout>} />
        <Route path="/dashboard/receivables" element={<AdminLayout user={user} ><Receivables name={user.name} accessToken={accessToken} /></AdminLayout>} />
        <Route path="/dashboard/bills-to-pay" element={<AdminLayout user={user} ><Bills /></AdminLayout>} />
        <Route path="*" element={<Navigate to="/dashboard/cashflow" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Dashboard;
