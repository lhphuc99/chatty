import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button, IconButton, CircularProgress } from "@material-ui/core";
import "./SignIn.scss";
import logo from "assets/images/iconchat.png";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "custom-fields/InputField";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {setCurrentUser} from 'app/userSlice';
import {setNotification} from 'app/notificationSlice';
import userAPI from "api/userAPI";
import * as constants from 'constants/index';

const SignInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email is not valid.")
    .required("Email is required."),
  password: yup.string().required("Password is required.").min(6),
});

function SignIn() {
  const methods = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {},
    resolver: yupResolver(SignInSchema),
  });
  const { handleSubmit } = methods;
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);


  const onSubmit = (data) => {
    setLoading(true);
    userAPI.signInWithEmail(data.email,data.password).then((user)=>{
      dispatch(setCurrentUser({
        ...user
      }));
      dispatch(setNotification({
        type:"success",
        message:constants.SIGNIN_SUCCSES,
      }));
      setLoading(false);
      history.push('/');
    }).catch((err)=>{
      dispatch(setNotification({
        type:'error',
        message:err.message,
      }));
      setLoading(false);
    })
  };

  const handleClickSignInWithGoogle=()=>{
    userAPI.signInWithGoogle().then((user)=>{
      dispatch(setCurrentUser({
        ...user
      }));
      dispatch(setNotification({
        type:"success",
        message:constants.SIGNIN_SUCCSES,
      }));
      history.push('/');
    }).catch((err)=>{
      dispatch(setNotification({
        type:err.type,
        message:err.message,
      }));
    });
  };

  const handleClickSignInWithFacebook=()=>{
    userAPI.signInWithFacebook().then((user)=>{
      dispatch(setCurrentUser({
        name:null,
        picture:null,
        ...user,
      }));
      dispatch(setNotification({
        type:"success",
        message:constants.SIGNIN_SUCCSES,
      }));
      history.push('/');
    }).catch((err)=>{
      dispatch(setNotification({
        type:err.type,
        message:err.message,
      }));
    });
  };

  return (
    <>
      <div className="bg-svg"></div>
      <div className="SignIn">
        <div className="SignIn__Container">
          <div className="SignIn__Header">
            <img src={logo} alt="logo chat" />
            <h3>Hello Everyone , We are Chatty</h3>
            <h4>Wellcome to chatty, please login to your account.</h4>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="SignIn__Form">
              <InputField name="email" label="Email" />

              <InputField name="password" label="PassWord" type="password" />
              <Link
                to="/resetpassword"
                className="ForgotPassword"
              >
                Forgot Password?
              </Link>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className="SignIn__Button"
                type="submit"
              >
                {loading ? (
                  <CircularProgress size={25.75} className="Circular" />
                ) : (
                  "Login"
                )}
              </Button>
              <div className="needAccount">
                {"Don't have an account?  "}
                <Link to="/signup" className="ForgotPassword">
                  Register now!
                </Link>
              </div>
            </form>
          </FormProvider>

          <ul className="SignIn__MediaLogo">
            <li>
              <IconButton className="SignIn__IconButton--fb" color="primary" onClick={handleClickSignInWithFacebook}>
                <i className="fab fa-facebook-f"></i>
              </IconButton>
            </li>
            <li>
              <IconButton className="SignIn__IconButton--gg" color="primary" onClick={handleClickSignInWithGoogle}>
                <i className="fab fa-google"></i>
              </IconButton>
            </li>
          </ul>
          <div className="SignIn__MediaLogo__container--bottom">
            <div className="SignIn__Sep">
              <div className="Or">OR Connect with</div>
            </div>
          <ul className="SignIn__MediaLogo__content--bottom">
          <li>
              <IconButton className="SignIn__IconButton--fb" color="primary" onClick={handleClickSignInWithFacebook}>
                <i className="fab fa-facebook-f"></i>
              </IconButton>
            </li>
            <li>
              <IconButton className="SignIn__IconButton--gg" color="primary" onClick={handleClickSignInWithGoogle}>
                <i className="fab fa-google"></i>
              </IconButton>
            </li>
          </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
