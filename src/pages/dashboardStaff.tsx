import { Nav } from "reactstrap";
import { StaffPages } from "../routes";
import { Link } from "react-router-dom";
const NavigationdStaff: React.FC = () => {
  return (
    <>
      <Nav className="m-2">
        {/* map of given staff routes */}
        {StaffPages?.map((val) => {
          return (
            <p className="mx-3" key={val.path}>
              <Link to={`/${val?.path}`}>{val?.name}</Link>
            </p>
          );
        })}
        <br />
      </Nav>
      <h1 className="mx-auto my-2">Dashboard Staff</h1>
    </>
  );
};
export default NavigationdStaff;
