import { Navigate, Outlet } from "react-router-dom";
//types
interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectPath: string;
  children?: React.ReactNode;
}
//propso
const ProtectedRoute = ({
  isAllowed,
  redirectPath,
  children,
}: ProtectedRouteProps): JSX.Element => {
  //if given allowed is false then redirect
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children ? children : <Outlet />}</>;
};
export default ProtectedRoute;
