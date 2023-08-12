import { useState} from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "../Layout/adminLayout";
import Form from "./Form";
import Users from "./Users";
import HorizontalLinearStepper from "./CreateInvesters/stepper";
import CreateOrderNippon from "./CreateOrder/CreateOrderNippon";
import CreateOrderNSE from "./CreateOrder/CreateOrderNSE";
import Orders from "./orders";
import RedeemStepper from "./RedeemOrder/RedeemStepper";
import Redeem from "./redeems";
import CashFlows from "./CashFlows";
import Insights from "./Insights";
import Receivables from "./Receivables";
import Bills from "./Bills";
import Settings from "./Settings";
import Upload_stepper from "./Upload_doc/upload_stepper";
// import CreditManagement from "./CreditManagement";
import Investment from "../Admin/Investment";
import NipponBank from "./NipponBank";
import NEFTAccountDetails from "./CreateInvesters/Nippon/NEFTAccountDetails";
import TransactionDatewiseNSE from "./TransactionDatewiseNSE";
import RTGSPayment from "./CreateOrder/RTGSPayment";
import ContactUs from "./ContactUs";
import TransactionPending from "./TransactionPending";

const DashboardAdmin = (props) => {
  const { user, accessToken} = props;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboardAdmin/users" element={<AdminLayout
          user={{}} >
          <Users accessToken={accessToken} setIsLoggedIn={setIsLoggedIn} />
        </AdminLayout>} />
        <Route path="/dashboardAdmin/investment" element={<AdminLayout
          user={{}} >
          <Investment accessToken={accessToken} />
        </AdminLayout>} />
        <Route path="/dashboardAdmin/order/:folio" element={<AdminLayout
          user={{}} >
          <CreateOrderNippon accessToken={accessToken} />
        </AdminLayout>} />
        <Route path="/dashboardAdmin/nse/order/:folio" element={<AdminLayout
          user={{}} >
          <CreateOrderNSE accessToken={accessToken} />
        </AdminLayout>} />
        <Route path="/dashboardAdmin/contact" element={<AdminLayout
          user={{}} >
          <ContactUs/>
        </AdminLayout>} />
        <Route path="/dashboardAdmin/nippon-bank/:folio_id" element={<AdminLayout
          user={{}} >
          <NipponBank  accessToken={accessToken} />
        </AdminLayout>} />
        <Route path="/dashboardAdmin/add-investment" element={<AdminLayout
          user={{}} >
          <HorizontalLinearStepper  accessToken={accessToken} />
        </AdminLayout>} />
        <Route path="/dashboardAdmin/redeem/:folio_id" element={<AdminLayout
          user={{}} >
          <RedeemStepper accessToken={accessToken} />
        </AdminLayout>} />
        {/* <Route path="/dashboardAdmin/add-investment/:id" element={<AdminLayout
          user={{}} >
          <Form accessToken={accessToken} />
        </AdminLayout>} /> */}
        <Route path="/dashboardAdmin/investment/details/:folio_id" element={<AdminLayout
          user={{}} >
          <Orders accessToken={accessToken} />
        </AdminLayout>} />
        <Route path="/dashboardAdmin/investment/nse/details/:folio_id" element={<AdminLayout
          user={{}} >
          <TransactionDatewiseNSE accessToken={accessToken} />
        </AdminLayout>} />
        <Route path="/dashboardAdmin/investment/nse/details/pending/:folio_id" element={<AdminLayout
          user={{}} >
          <TransactionPending accessToken={accessToken} />
        </AdminLayout>} />
        <Route path="/dashboardAdmin/investment/redeem/:folio_id" element={<AdminLayout
          user={{}} >
          <Redeem accessToken={accessToken} />
        </AdminLayout>} />
        <Route path="/dashboardAdmin/add-investment/accountdetails" element={<AdminLayout
          user={{}} >
          <NEFTAccountDetails accessToken={accessToken} />
        </AdminLayout>} />     
        <Route path="/dashboardAdmin/investing" element={<AdminLayout user={user} >
          <Investment user={user} accessToken={accessToken} /></AdminLayout>} />
        <Route path="/dashboardAdmin/cashflow" element={<AdminLayout user={user} >
          <CashFlows accessToken={accessToken} /></AdminLayout>} />
        <Route path="/dashboardAdmin/insights" element={<AdminLayout user={user} ><Insights accessToken={accessToken} /></AdminLayout>} />
        <Route path="/dashboardAdmin/settings" element={<AdminLayout user={user} ><Settings role={user.role} email={user.email} accessToken={accessToken} /></AdminLayout>} />
        <Route path="/dashboardAdmin/receivables" element={<AdminLayout user={user} ><Receivables name={user.name} accessToken={accessToken} /></AdminLayout>} />
        <Route path="/dashboardAdmin/bills-to-pay" element={<AdminLayout user={user} ><Bills /></AdminLayout>} />
        <Route path="/dashboardAdmin/upload-doc" element={<AdminLayout user={user} ><Upload_stepper user={user} accessToken={accessToken} /></AdminLayout>}/>
        <Route path="*" element={<Navigate to="/dashboardAdmin/investing" replace />} />
      </Routes>
    </BrowserRouter>
  );
};





export default DashboardAdmin;
