import React, { Suspense, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login";
import { AdminRoutes } from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/styles.scss";
import DashboardAdmin from "./pages/dashboardAdmin";
import DashboardStaff from "./pages/dashboardStaff";
import { PublicRoute, ProtectedRoute, StaffPages } from "./routes";
import { getDataFromLocalStorage, Loader } from "./components";

const App: React.FC = () => {
  //userdata types
  type UserTypes = {
    token: string;
    name: string;
    permissions: string[];
    roles: string[];
  };
  //get data
  const user = getDataFromLocalStorage();
  const [userData, setUserData] = useState<UserTypes>(user);
  return (
    //code base spliting
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* index route */}
        <Route index element={<Navigate to="/login" replace />} />
        {/* Routes which can be accessed without userToken */}
        <Route
          element={
            <PublicRoute
              redirectPath={
                userData?.roles.includes("super_admin")
                  ? "dashboard/admin"
                  : "dashboard/staff"
              }
              isAllowed={!!userData?.token}
            />
          }
        >
          <Route path="login" element={<LoginPage setUser={setUserData} />} />
        </Route>
        {/* Routes which require user token and admin role */}
        <Route
          element={
            <ProtectedRoute
              redirectPath={
                userData?.roles.includes("super_admin")
                  ? "dashboard/admin"
                  : "dashboard/staff"
              }
              isAllowed={
                !!userData?.token && userData?.roles?.includes("super_admin")
              }
            />
          }
        >
          {/* super admin routes */}
          <Route path="dashboard/admin" element={<DashboardAdmin />} />

          {AdminRoutes?.map((val) => {
            return (
              <Route
                key={val.path}
                path={val.path}
                element={<val.component />}
              />
            );
          })}
        </Route>
        {/* Routes which require user token and staff members  */}
        <Route
          element={
            <ProtectedRoute
              redirectPath="login"
              isAllowed={
                !!userData?.token &&
                (userData?.roles.includes("store_owner") ||
                  userData?.roles.includes("staff"))
              }
            />
          }
        >
          {/* staff routes */}

          <Route path="dashboard/staff" element={<DashboardStaff />} />
          {StaffPages?.map((val) => {
            return (
              <Route
                key={val.path}
                path={val.path}
                element={<val.component />}
              />
            );
          })}
        </Route>
        {/* if routes are not found */}
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </Suspense>
  );
};

export default App;
