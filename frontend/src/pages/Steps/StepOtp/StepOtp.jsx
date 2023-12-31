import React, { useState } from "react";
import TextInput from "../../../components/shared/TextInput/TextInput";
import Button from "../../../components/shared/Button/Button";
import styles from "./StepOtp.module.css";
import Card from "../../../components/shared/Card/Card";

const StepOtp = ({ onNext }) => {
  const[otp , setOtp] = useState('');
  return (
    <div className={styles.cardWrapper} >
      <Card title="Enter The Code We Just Send You" icon="lock">
        <TextInput
          value = {otp}
          type = 'number'
          onChange = { (e) => { setOtp(e.target.value) } }
        />
        <div className={styles.bottomWrapper} >
          <p className={styles.bottomParagraph}>
            Didn't recieve ? <a href="/">Tap here</a>
          </p>
          <div className={styles.buttonWrapper}>
            <Button text="Next" onClick={onNext} />
          </div>
          <p className={styles.bottomParagraph}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
            inventore exercitationem consequatur rem autem omnis architecto ex
            quia fuga sed?
          </p>
        </div>
      </Card>
    </div>
  );
};

export default StepOtp;
