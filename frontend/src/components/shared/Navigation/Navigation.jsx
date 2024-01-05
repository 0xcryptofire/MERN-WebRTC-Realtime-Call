import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import { logout } from "../../../http";
import { useDispatch} from 'react-redux'
import { setAuth } from '../../../ReduxStore/authSlice'

const Navigation = () => {
    const dispatch = useDispatch()
  // Inline CSS
  const brandStyle = {
    color: "#fff",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    fontSize: "1.375rem",
  };

  const logoText = {
    marginLeft: ".75rem",
    fontWeight: "700",
  };

  const logoImgStyle = {
    width: "2rem",
  };

  async function logoutUser() {
    try {
      const {data} = await logout();
      dispatch(setAuth(data))
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={brandStyle} to="/">
        <img style={logoImgStyle} src="/images/Emoji.png" alt="logo" />
        <span style={logoText}>ChatHouse</span>
      </Link>
      <button onClick={logoutUser}>logout</button>
    </nav>
  );
};

export default Navigation;
