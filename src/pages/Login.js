import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = ({ isAuth, setIsAuth }) => { // Receive props correctly
  let navigate = useNavigate();

  const signInWithGoogle = () => { // Removed unnecessary arguments
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true); // Store 'isAuth' correctly
      setIsAuth(true); // Use the function from props
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