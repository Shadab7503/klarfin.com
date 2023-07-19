import React, { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SuperAdminLayout from "../Layout/superAdminLayout";
import Investment from "./Investment";
import Form from "./Form";
import Users from "./Users";
import HorizontalLinearStepper from "./stepper/stepper";
import CreateOrder from "./CreateOrder";
import Orders from "./orders";
import Transactions from "./transaction";
import RedeemStepper from "./stepper/RedeemStepper";
import Redeem from "./redeems";
import CreateOrderOTP from "./CreateOrderOtp";

const DashboardSuper = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>("");


  useEffect(() => {
    let tokens = localStorage.getItem("superTokens");
    try {
      if (tokens) {
        const tokensObj = JSON.parse(tokens);
        setAccessToken(tokensObj.accessToken);
      } else window.location.href = "/loginSuper";
    } catch (err) {
      localStorage.removeItem("superTokens");
      window.location.href = "/loginSuper";
    }
  }, []);


  return (
    <BrowserRouter>
      <Routes>


        <Route path="/dashboardSuper/users" element={<SuperAdminLayout
          user={{}} >
          <Users accessToken={accessToken} setIsLoggedIn={setIsLoggedIn} />
        </SuperAdminLayout>} />
        <Route path="/dashboardSuper/investment" element={<SuperAdminLayout
          user={{}} >
          <Investment accessToken={accessToken} />
        </SuperAdminLayout>} />
        <Route path="/dashboardSuper/order/:folio" element={<SuperAdminLayout
          user={{}} >
          <CreateOrder accessToken={accessToken} />
        </SuperAdminLayout>} />
        <Route path="/dashboardSuper/add-investment" element={<SuperAdminLayout
          user={{}} >
          {/* <Form accessToken={accessToken} /> */}
          <HorizontalLinearStepper accessToken={accessToken} />
        </SuperAdminLayout>} />
        {/* 
          <Route path="/dashboardSuper/investment/process" element={<SuperAdminLayout 
      user={{}} >
          <HorizontalLinearStepper />
          </SuperAdminLayout>} /> */}

        <Route path="/dashboardSuper/redeem/:folio_id" element={<SuperAdminLayout
          user={{}} >
          <RedeemStepper accessToken={accessToken} />

        </SuperAdminLayout>} />

        <Route path="/dashboardSuper/redeem/:folio_id" element={<SuperAdminLayout
          user={{}} >
          <RedeemStepper accessToken={accessToken} />

        </SuperAdminLayout>} />
        <Route path="/dashboardSuper/investment/create-order-otp/:folio_id" element={<SuperAdminLayout
          user={{}} >
          <CreateOrderOTP accessToken={accessToken} />
        </SuperAdminLayout>} />

        <Route path="/dashboardSuper/investment/details/:folio_id" element={<SuperAdminLayout
          user={{}} >
          <Orders accessToken={accessToken} />
        </SuperAdminLayout>} />

        <Route path="/dashboardSuper/investment/tranx/:folio_id" element={<SuperAdminLayout
          user={{}} >
          <Transactions accessToken={accessToken} />

        </SuperAdminLayout>} />

        <Route path="/dashboardSuper/investment/redeem/:folio_id" element={<SuperAdminLayout
          user={{}} >
          <Redeem accessToken={accessToken} />

        </SuperAdminLayout>} />



        <Route path="*" element={<Navigate to="/dashboardSuper/users" replace />} />


      </Routes>

    </BrowserRouter>
  );
};

export default DashboardSuper;
