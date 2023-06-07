import { Navigate, Outlet } from "react-router-dom";
//types
interface PublicRouteProps {
  isAllowed: boolean;
  redirectPath: string;
  children?: React.ReactNode;
}

const PublicRoute = ({
  isAllowed,
  children,
  redirectPath,
}: PublicRouteProps): JSX.Element => {
  //if given allowed is true then redirect
  if (isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  //outlet as children
  return <>{children ? children : <Outlet />}</>;
};

export default PublicRoute;
