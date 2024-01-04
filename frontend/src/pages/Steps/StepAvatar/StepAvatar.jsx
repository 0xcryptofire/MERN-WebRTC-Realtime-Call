/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import Button from "../../../components/shared/Button/Button";
import styles from "./StepAvatar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setAvatar } from '../../../ReduxStore/activateSlice'
import { activate } from "../../../http";

const StepAvatar = ({ onNext }) => {
  const dispatch = useDispatch();
  const { name , avatar } = useSelector((state) => state.activate);
  const [image, setImage] = useState("./images/Users.png");

  const captureImg = (e) => {
    const file = e.target.files[0];
    
    // converting image to base-64 string
    const reader =  new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function() {
      console.log(reader.result);
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    }
  };

  const submit =  async () => {
    try {
      const { data } = await activate({ name , avatar });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.cardWrapper}>
      <Card title={`Okay, ${name}!`} icon="monkeyemoji">
        <p className={styles.subheading}>How's this photo?</p>
        <div className={styles.avatarWrapper}>
          <img src={image} alt="Your photo" />
        </div>
        <div className={styles.inputWrapper}>
          <input id="avatarInput" type="file" accept="image/png, image/jpeg" onChange={captureImg} />
          <label htmlFor="avatarInput">Choose Different Photo</label>
        </div>
        <div className={styles.buttonWrapper}>
          <Button text="Next" onClick={submit} />
        </div>
      </Card>
    </div>
  );
};

export default StepAvatar;
