import { Spinner } from "reactstrap";

//fallback suspense loader
const Loader: React.FC = () => {
  return (
    <>
      <Spinner
        color="dark"
        style={{
          height: "3rem",
          width: "3rem",
          marginTop: "30px",
        }}
      >
        Loading...
      </Spinner>
    </>
  );
};
export default Loader;
