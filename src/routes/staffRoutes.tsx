import {
  Questions,
  Products,
  Orders,
  Staff,
  Withdraws,
  Reviews,
} from "../pages/staffPages";

//defining all possible staff routes
const StaffRoutes = [
  {
    path: "questions",
    component: Questions,
    name: "Questions",
  },
  {
    path: "products",
    component: Products,
    name: "Products",
  },
  {
    path: "orders",
    component: Orders,
    name: "Orders",
  },
  {
    path: "staff",
    component: Staff,
    name: "Staff",
  },
  {
    path: "withdraws",
    component: Withdraws,
    name: "Withdraws",
  },
  {
    path: "reviews",
    component: Reviews,
    name: "Reviews",
  },
];

export default StaffRoutes;
