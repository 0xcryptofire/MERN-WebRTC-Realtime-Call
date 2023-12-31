import React, { useState } from "react";
import Phone from "./PhoneComp/Phone";
import Email from "./EmailComp/Email";
import style from "./StepPhoneEmail.module.css";

const phoneEmailMap = {
  phone: Phone,
  email: Email,
};
const StepPhoneEmail = ({ onNext }) => {
  const [type, settype] = useState("phone"); // default step is phone

  const Component = phoneEmailMap[type];

  return (
    <>
      <div className={style.cardWrapper}>
        <div>
          <div className={style.buttonWrapper}>
            <button className={`${style.button} ${type === 'phone' ? style.active : ''}`} onClick={() => settype("phone")}>
              <img src="/images/mobileicon.png" alt="Phone Icon" />
            </button>
            <button className={`${style.button} ${type === 'email' ? style.active : ''}`} onClick={() => settype("email")}>
              <img src="/images/msgicon.png" alt="Email Icon" />
            </button>
          </div>
          <Component onNext={onNext} />
        </div>
      </div>
    </>
  );
};

export default StepPhoneEmail;
