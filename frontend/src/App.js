import './App.css';
import { BrowserRouter,
        Routes,
        Route
       } from "react-router-dom";
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Authanticate from './pages/Authenticate/Authenticate';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Navigation/>
        <Routes>
          <Route path='/' element={<Home/>} exact />
          <Route path='/authenticate' element={<Authanticate/>} exact />
          {/* <Route path='/register' element={<Register/>} exact />
          <Route path='/login' element={<Login/>} exact /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
