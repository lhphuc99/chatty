import React, { useState } from "react";
import "./SignUp.scss";
import InputField from "custom-fields/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { Button, CircularProgress, Container, Grid } from "@material-ui/core";
import logo from "assets/images/iconchat.png";
import { Link, useHistory } from "react-router-dom";
import userAPI from "api/userAPI";
import { useDispatch } from "react-redux";
import { setNotification } from "app/notificationSlice";

const SignInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email is not valid.")
    .required("Email is required."),
  lastname: yup.string().required("Last name is required."),
  firstname: yup.string().required("First name is required."),
  password: yup.string().required("Password is required.").min(6),
  confirmPassword: yup
    .string()
    .required("confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const SignUp = () => {
  const methods = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {},
    resolver: yupResolver(SignInSchema),
  });
  const { handleSubmit } = methods;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (value) => {
    setLoading(true);
    userAPI
      .signUpWithEmail(value.email, value.password,value.firstname,value.lastname)
      .then((value) => {
        setLoading(false);
        dispatch(
          setNotification({
            type: "success",
            message: "Sign up is success. Please verify your email to login",
          })
        );
        history.push("./signin");
      })
      .catch((err) => {
        setLoading(false);
        dispatch(
          setNotification({
            type: "error",
            message: err.message,
          })
        );
      });
  };

  return (
    <>
      <div className="SignUp bg-svg">
        <Container className="SignUp__Container">
          <div className="SignUp__Header">
            <img src={logo} alt="logo chat" />
            <h3>Hello Everyone , We are Chatty</h3>
            <h4>Wellcome to chatty, please signup your account.</h4>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="SignUp__Form">
              <Grid container>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <InputField name="firstname" label="First Name" />
                  </Grid>
                  <Grid item xs={6}>
                    <InputField name="lastname" label="Last Name" />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <InputField name="email" label="Email" />
                </Grid>
                <Grid item xs={12}>
                  <InputField
                    name="password"
                    type="password"
                    label="Password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputField
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    labelwidth={135}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className="SignUp__btnSubmit"
                  type="submit"
                  fullWidth
                >
                  {loading ? (
                    <CircularProgress size={25.75} className="Circular" />
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </Grid>
              <Grid className="haveAccount">
                {"Already have an account?  "}
                <Link to="/signin" className="linktoSignin">
                  Sign in now!
                </Link>
              </Grid>
            </form>
          </FormProvider>
          <div className="Signup__termscondition">
            <h4>
              <span className="dot">*</span>
              Terms and condition
              <span className="and"> & </span>
              Privacy policy
            </h4>
          </div>
        </Container>
      </div>
    </>
  );
};

export default SignUp;
