import allStaffRoutes from "./staffRoutes";
import getDataFromLocalStorage from "../components/userData";

type RouteTypes = {
  path: string;
  component: React.FC;
  name: string;
}[];

let pagesConfigs: RouteTypes = [];

const userData = getDataFromLocalStorage();

if (
  userData?.roles?.includes("store_owner") ||
  userData?.roles?.includes("super_admin")
) {
  pagesConfigs = allStaffRoutes;
} else {
  pagesConfigs = allStaffRoutes.map((config) => {
    let check = false;
    if (config) {
      if (userData?.permissions.includes(config.path)) {
        check = true;
        //break;
      }
    }

    if (check) {
      return config;
    }
  });

  pagesConfigs = pagesConfigs.filter((el) => el);
  pagesConfigs = pagesConfigs;
}

export default pagesConfigs;
