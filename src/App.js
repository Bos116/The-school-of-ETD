import './App.css';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';

function App() {
  return (
    <Router>
      {/* basic navbar nestled in Router*/}
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='/createpost'>Create-Post</Link>
      </nav>
      <Routes>
      {/* route nestled in Routes for paths*/}
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/createpost' element={<CreatePost/>}/>
      </Routes>
    </Router>
  );
}

export default App;
