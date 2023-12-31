import React from "react";
import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import { useState } from "react";
import styles from "./Email.module.css";

const Email = ({onNext}) => {
  const [email, setemail] = useState("");

  return (
    <Card title="Enter Your Email Id" icon="Emojiemail">
      <TextInput
        type="text"
        value={email}
        onChange={(e) => {
          setemail(e.target.value);
          console.log(email);
        }}
      />
      <div>
        <div className={styles.buttonWrapper}>
          <Button text="Next" onClick={onNext}/>
        </div>
        <p className={styles.bottomParagraph}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
          inventore exercitationem consequatur rem autem omnis architecto ex
          quia fuga sed?
        </p>
      </div>
    </Card>
  );
};

export default Email;
