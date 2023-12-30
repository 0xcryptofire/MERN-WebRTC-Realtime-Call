import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import Card from "../../components/shared/Card/Card";
import Button from "../../components/shared/Button/Button";

const Home = () => {
  return (
    <div className={styles.cardWrapper}>
      <Card title="Welcome to ChstHouse!" icon="Emoji">
        <p className={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          dolores dolorem delectus molestias velit nesciunt porro et corrupti
          distinctio libero! Lorem ipsum dolor sit amet consectetur, adipisicing
          elit. Ad, esse.
        </p>
        <div>
          <Button text='Get Your Username' />
        </div>
        <div className={styles.signinWrapper} >
          <span className={styles.inviteLink} >Have an invite link? </span>
          <Link style={
            {
              textDecoration : 'none',
              fontWeight : 'bold',
              color : '#c4c5c5',
              marginLeft : '.25rem'
            }
          } to="/login">Sign In</Link>
        </div>
      </Card>
    </div>
  );
};

export default Home;
