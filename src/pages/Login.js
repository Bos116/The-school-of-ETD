import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = ({ isAuth, setIsAuth }) => {
  let navigate = useNavigate();
  //pop up window and sign in setup
  const signInWithGoogle = () => { 
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };

  return (
    <div className="loginPage">
      <p>Log in to Google to continue</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign In
      </button>
    </div>
  );
};

export default Login;