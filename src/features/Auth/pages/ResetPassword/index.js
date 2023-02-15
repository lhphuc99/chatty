import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import logo from "assets/images/iconchat.png";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "custom-fields/InputField";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./style.scss";
import { setNotification } from "app/notificationSlice";
import userAPI from "api/userAPI";
import forgotimg from "assets/images/forgotpass.svg";
import { ReCaptcha } from "react-recaptcha-google";

const ForgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email is not valid.")
    .required("Email is required."),
});

let instanceReCaptcha = null;

function ForgotPassword() {
  const methods = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {},
    resolver: yupResolver(ForgotPasswordSchema),
  });
  const { handleSubmit } = methods;
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [tokenReCaptcha, setTokenReCaptcha] = useState();

  const onLoadRecaptcha = () => {
    if (instanceReCaptcha) {
      instanceReCaptcha.reset();
    }
  };

  const verifyCallback = (recaptchaToken) => {
    // Here you will get the final recaptchaToken!!!
    setTokenReCaptcha(recaptchaToken);
  };

  const onSubmit = (data) => {
    if (!tokenReCaptcha) {
      dispatch(
        setNotification({ type: "error", message: "Captcha not found!" })
      );
      return;
    }
    setLoading(true);
    userAPI
      .resetPassword(data.email)
      .then(() => {
        setLoading(false);
        history.push("/signin");
        dispatch(
          setNotification({
            type: "success",
            message: "Password reset email has been sent!",
          })
        );
      })
      .catch((err) => {
        dispatch(setNotification(err));
        setLoading(false);
      });
    setTokenReCaptcha("");
    if (instanceReCaptcha) instanceReCaptcha.reset();
  };
  return (
    <>
      <Grid container className="Container" justifyContent="space-evenly">
        <Grid item xs={7} className="Header--left">
          <img src={forgotimg} alt="forgot img" />
        </Grid>
        <Grid item xs={true} className="Right__Content">
          <div className="Header--right">
            <img src={logo} alt="logo chat png" />
            <h3>Forgot Your Password?</h3>
            <h4>
              Please confirm your email address below and we will send you a
              verification email
            </h4>
          </div>
          <div className="Form">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <InputField name="email" label="Email" className="Input" />
                <ReCaptcha
                  ref={(el) => {
                    instanceReCaptcha = el;
                  }}
                  size="normal"
                  data-theme="light"
                  render="explicit"
                  sitekey={process.env.REACT_APP_RE_CAPTCHA_KEY}
                  onloadCallback={onLoadRecaptcha}
                  verifyCallback={verifyCallback}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className="ResetPassword__btn"
                  type="submit"
                  fullWidth
                >
                  {loading ? (
                    <CircularProgress size={25.75} className="Circular" />
                  ) : (
                    "Send link reset password"
                  )}
                </Button>
                <div className="BackHome">
                  {"You want to back home page?  "}
                  <Link to="/" className="LinkResetPassword">
                    Back home!
                  </Link>
                </div>
              </form>
            </FormProvider>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default ForgotPassword;
