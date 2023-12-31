import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import Authanticate from "./pages/Authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";
import Rooms from "./pages/Rooms/Rooms";

let isAuth = false;
const user = {
  activated : false
}
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={isAuth ? <Navigate to="/rooms" /> : <Home />}
          />
          <Route
            path="/authenticate"
            element={isAuth ? <Navigate to="/rooms" /> : <Authanticate />}
          />
          <Route
            path="/activate"
            element={!isAuth ? <Navigate to="/" /> : isAuth && !user.activated ? <Activate/> : <Navigate to='/rooms' /> }
          />
          <Route
            path="/rooms"
            element={!isAuth ? <Navigate to="/" /> : isAuth && !user.activated ? <Navigate to='/activate'/> : <Rooms/> }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// const GuestRoute = ({ children , ...rest }) => {

//   // {...rest} getting all the props from parent component
//   return (
//     // passing all the props same as Route
//     <>
//         <Route {...rest}
//            element={
//             isAuth ? navigate('/rooms') : children
//            }
//            ></Route>
//     </>
//   );
// };

export default App;
