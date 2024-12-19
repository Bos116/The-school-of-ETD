import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import CreatePost from "./pages/CreatePost";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import Navbar from "./components/navbar/Navbar";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated using Firebase's onAuthStateChanged listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // If user is authenticated, set isAuth to true and store it in localStorage
        setIsAuth(true);
        localStorage.setItem("isAuth", true); // Store the user status in localStorage
      } else {
        // If no user is authenticated, set isAuth to false and clear localStorage
        setIsAuth(false);
        localStorage.removeItem("isAuth"); // Remove authentication status from localStorage
      }
    });

    // Cleanup the subscription on component unmount
    return () => unsubscribe();
  }, []);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear(); // Clear localStorage when signing out
      setIsAuth(false); // Set isAuth to false after logging out
      window.location.pathname = "/login"; // Redirect to login page after logging out
    });
  };

  return (
    <Router>
      <Navbar isAuth={isAuth} signUserOut={signUserOut} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;