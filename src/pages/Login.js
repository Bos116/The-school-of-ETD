import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router";

const Login = ({ setIsAuth }) => {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", "true"); // Store login status in localStorage
      setIsAuth(true); // Set isAuth state to true
      navigate("/"); // Redirect to the home page after login
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