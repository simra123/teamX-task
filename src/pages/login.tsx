import { Container, Card, FormGroup, Label, Input, CardBody } from "reactstrap";
import { useMutation } from "@tanstack/react-query";
import HttpHandler from "../apis/httpHandler";
import { LoadingButton, ToastError, ToastSuccess } from "../components";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import { AxiosResponse, AxiosError } from "axios";
import "react-toastify/dist/ReactToastify.css";

//types of res err and creds
type Response = {
  success: string;
};

type Error = {
  error: string;
};

type ValuesType = {
  email: string;
  password: string;
};

const LoginPage = ({ setUser }: any) => {
  //react query mutate to post data
  const { mutate } = useMutation<
    AxiosResponse<Response>,
    AxiosError<Error>,
    ValuesType
  >({
    mutationFn: (cred: ValuesType) => {
      return HttpHandler.makeRequest("token", "POST", cred);
    },
  });
  const initialValues = {
    email: "",
    password: "",
  };

  //formik validations
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  //handle user login
  const hansdleSubmit = (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ): void => {
    mutate(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: (data: any) => {
          setSubmitting(false);
          //getting the data we need to avoid load on local storge
          const userObj = {
            token: data.data.token,
            name: data.data.user.name,
            permissions: data.data.user.permissions,
            roles: data.data.user.roles,
          };
          //setting userData
          localStorage.setItem("user_data", JSON.stringify(userObj));
          //setting userdata in state to generate routes
          setUser(userObj);
          ToastSuccess("login successfully");
          setTimeout(() => {
            window.location.reload();
          }, 100);
        },
        onError: (data: any) => {
          ToastError(
            data?.response! ? data?.response!?.data?.message : data?.message!,
          );
          setSubmitting(false);
        },
      },
    );
  };

  return (
    <>
      {/* react toast Container */}
      <ToastContainer />
      <div className="page-background">
        <Container>
          {" "}
          <div className="login">
            <Card>
              <CardBody>
                <h4>Login into your account</h4>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={hansdleSubmit}
                >
                  {({ isSubmitting, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                      <FormGroup>
                        <Label for="email">Email</Label>

                        <Field
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Enter your email"
                          as={Input}
                        />
                        <small className="text-danger ">
                          {" "}
                          <ErrorMessage name="email" />
                        </small>
                      </FormGroup>
                      <FormGroup>
                        <Label for="password">Password</Label>
                        <Field
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Enter your password"
                          as={Input}
                        />
                        <small className="text-danger ">
                          <ErrorMessage name="password" />
                        </small>
                      </FormGroup>
                      <LoadingButton
                        color="primary"
                        type="btn"
                        loading={isSubmitting}
                        className="login-btn w-100"
                        text="LOGIN"
                      />
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>{" "}
          </div>
        </Container>
      </div>
    </>
  );
};

export default LoginPage;
