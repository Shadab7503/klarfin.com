import CashFlows from "../Admin/CashFlows";
import Insights from "../Admin/Insights";
import Receivables from "../Admin/Receivables";
import Bills from "../Admin/Bills";
import Settings from "../Admin/Settings";
// import CreditManagement from "./CreditManagement";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "../Layout/adminLayout";
import Investment from "./Investment";

const Dashboard = (props: any) => {

  const { accessToken, user } = props;

  return (  

    <BrowserRouter>
      <Routes >
        <Route path="/dashboard/investing" element={<AdminLayout user={user} >
          <Investment user={user} accessToken={accessToken} /></AdminLayout>} />
        <Route path="/dashboard/cashflow" element={<AdminLayout user={user} >
          <CashFlows accessToken={accessToken} /></AdminLayout>} />
        <Route path="/dashboard/insights" element={<AdminLayout user={user} ><Insights accessToken={accessToken} /></AdminLayout>} />
        <Route path="/dashboard/settings" element={<AdminLayout user={user} ><Settings role={user.role} email={user.email} accessToken={accessToken} /></AdminLayout>} />
        <Route path="/dashboard/receivables" element={<AdminLayout user={user} ><Receivables name={user.name} accessToken={accessToken} /></AdminLayout>} />
        <Route path="/dashboard/bills-to-pay" element={<AdminLayout user={user} ><Bills /></AdminLayout>} />
        <Route path="*" element={<Navigate to="/dashboard/investing" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default {};
