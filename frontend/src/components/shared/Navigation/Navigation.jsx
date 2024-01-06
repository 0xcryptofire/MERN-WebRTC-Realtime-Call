/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import { logout } from "../../../http";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../ReduxStore/authSlice";

const Navigation = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);

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
      const { data } = await logout();
      dispatch(setAuth(data));
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
      <div className={styles.navRight}>
        <h3>{user.name}</h3>
        <Link to="/">
          <img className={styles.profileImg} src={user.avatar} alt="Profile picture"/>
        </Link>
        {isAuth && (
          <button className={styles.logoutbtn} onClick={logoutUser}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
