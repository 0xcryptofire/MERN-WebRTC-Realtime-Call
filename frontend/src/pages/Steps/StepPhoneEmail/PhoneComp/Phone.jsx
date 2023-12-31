import React, { useState } from "react";
import styles from "./Phone.module.css";
import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import TextInput from "../../../../components/shared/TextInput/TextInput";

const Phone = ({onNext}) => {
  const [number, setNumber] = useState("");
  return (
    <Card title="Enter Your Phone Number" icon="phone">
      <TextInput
        type="number"
        value={number}
        onChange={(e) => {
          setNumber(e.target.value);
          console.log(number);
        }}
      />
      <div>
        <div className={styles.buttonWrapper}>
          <Button text="Next" onClick={onNext} />
        </div>
        <p className={styles.bottomParagraph} >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, inventore exercitationem consequatur rem autem omnis architecto ex quia fuga sed?
        </p>
      </div>
    </Card>
  );
};

export default Phone;
