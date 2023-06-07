import { Nav } from "reactstrap";
import { AdminRoutes } from "../routes";
import { Link } from "react-router-dom";
import getDataFromLocalStorage from "../components/userData";
const NavigationAdmin: React.FC = () => {
  //user Data
  const user = getDataFromLocalStorage();
  return (
    <>
      <Nav className="m-2">
        {/* mapping admin routes */}
        {AdminRoutes?.map((val) => {
          return (
            <p className="mx-3" key={val.path}>
              <Link to={`/${val?.path}`}>{val?.name}</Link>
            </p>
          );
        })}
        {/* see if super admin has store owner role as well */}
        {user?.roles.includes("store_owner") ? (
          <p className="mx-3">
            <Link to={`/dashboard/staff`}>Dashboard Staff</Link>
          </p>
        ) : null}
        <br />
      </Nav>
      <h1 className="mx-auto my-2">Dashboard Admin</h1>
    </>
  );
};
export default NavigationAdmin;
