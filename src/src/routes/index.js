import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import RootRoutes from "./root";

const CustomRoute = () => {
  <Routes>
    {RootRoutes}
  </Routes>
}

const AppRoutes = () => {
  <BrowserRouter>
    <CustomRoute />
  </BrowserRouter>
}

export default AppRoutes;