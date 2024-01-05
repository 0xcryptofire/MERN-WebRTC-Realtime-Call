import React, { useState } from "react";
import TextInput from "../../../components/shared/TextInput/TextInput";
import Button from "../../../components/shared/Button/Button";
import styles from "./StepOtp.module.css";
import Card from "../../../components/shared/Card/Card";
import { verifyOtp } from "../../../http";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAuth } from '../../../ReduxStore/authSlice'

const StepOtp = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const {phone , hash} = useSelector((state) => state.auth.otp)   // getting data from store

  async function submitOtp() {
    if(!otp || !phone || !hash){
      alert('OTP required..')
      return
    }
    // server request
    try {
      const {data} = await verifyOtp({
        phone,
        otp,
        hash,
      });
      console.log(data);

      dispatch(setAuth(data))

    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className={styles.cardWrapper}>
      <Card title="Enter The Code We Just Send You" icon="lock">
        <TextInput
          value={otp}
          type="number"
          onChange={(e) => {
            setOtp(e.target.value);
          }}
        />
        <div className={styles.bottomWrapper}>
          <p className={styles.bottomParagraph}>
            Didn't recieve ? <a href="/">Tap here</a>
          </p>
          <div className={styles.buttonWrapper}>
            <Button text="Next" onClick={submitOtp} />
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
