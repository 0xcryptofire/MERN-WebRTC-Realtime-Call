import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import Authanticate from "./pages/Authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";
import Rooms from "./pages/Rooms/Rooms";
import { useSelector } from "react-redux";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
import Loader from "./components/shared/Loader/Loader";

function App() {
  // getting - user,isAuth from store
  const { isAuth, user } = useSelector((state) => state.auth);
  const { loading } = useLoadingWithRefresh();

  // call refresh endpoint

  return loading ? (
    <Loader message="Loading, Please wait..." />
  ) : (
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
          element={
            !isAuth ? (
              <Navigate to="/" />
            ) : isAuth && !user.activated ? (
              <Activate />
            ) : (
              <Navigate to="/rooms" />
            )
          }
        />
        <Route
          path="/rooms"
          element={
            !isAuth ? (
              <Navigate to="/" />
            ) : isAuth && !user.activated ? (
              <Navigate to="/activate" />
            ) : (
              <Rooms />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
