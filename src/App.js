import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import CreatePost from "./pages/CreatePost";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import Navbar from "./components/navbar/Navbar";
import Blog from "./pages/Blog";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("isAuth");
    setIsAuth(false);
  }, []);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
      {/* <nav>
        <Link to="/">Home</Link>
        {!isAuth ? (
          <Link to="/login">Login</Link>
        ) : ( //conditional nav link 
          <>
            <Link to="/createpost" isAuth={isAuth}>Create-Post</Link>
            <Link to="/quiz">Quiz</Link>
            <button onClick={signUserOut}>Logout</button>
            
          </>
        )}
        
      </nav> */}
      <Navbar isAuth={isAuth} signUserOut={signUserOut}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/quiz" element={<Quiz />}/>
        <Route path="/blog" element={<Blog />}/>
      </Routes>
    </Router>
  );
}

export default App;