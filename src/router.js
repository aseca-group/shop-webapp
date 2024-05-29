import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/home/:customerId/:addressId" Component={Home} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
