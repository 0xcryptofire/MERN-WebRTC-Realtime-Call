import React, { useState } from "react";
import Card from '../../../components/shared/Card/Card'
import TextInput from '../../../components/shared/TextInput/TextInput'
import Button from '../../../components/shared/Button/Button'
import styles from './StepName.module.css'
import { useDispatch , useSelector } from 'react-redux';
import { setName } from '../../../ReduxStore/activateSlice'

const StepName = ({ onNext }) => {

  const { name } = useSelector((state) => state.activate);
  const [fullName , setfullName] = useState(name);
  const dispatch = useDispatch();

  const nextStep = () =>{
    if (!fullName) {
      return;
    }

    dispatch(setName(fullName));
    onNext();
  }

  return (
    <div className={styles.cardWrapper}>
      <Card title="What's Your Fullname ?" icon="teethemoji">
        <TextInput
          type="text"
          placeholder = 'Enter your Fullname'
          onChange = {(e) => {
            setfullName(e.target.value)
          }}
        />
        <div className={styles.bottomWrapper}>
          <p className={styles.bottomParagraph}>
            People Use Real name at chatHouse :)
          </p>
          <div className={styles.buttonWrapper}>
            <Button text="Next" onClick={nextStep} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StepName;
