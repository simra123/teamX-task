import { Users, Subscriptions, Merchants } from "../pages/adminPages";
//defining super admin routes
const StaffRoutes = [
  {
    path: "users",
    component: Users,
    name: "users",
  },
  {
    path: "Subscription",
    component: Subscriptions,
    name: "Subscriptions",
  },
  {
    path: "merchants",
    component: Merchants,
    name: "Merchants",
  },
];

export default StaffRoutes;
