import React, { useState } from "react";
import StepPhoneEmail from "../Steps/StepPhoneEmail/StepPhoneEmail";
import StepOtp from "../Steps/StepOtp/StepOtp";
import StepName from "../Steps/StepName/StepName";
import StepAvatar from "../Steps/StepAvatar/StepAvatar";
import StepUsername from "../Steps/StepUsername/StepUsername";

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
};
const Login = () => {

  const [step, setStep] = useState(1); // default step is 1
  const Step = steps[step];

  const onNext = () => {
    setStep(step + 1);
  };
  return <div>
    <Step onNext={onNext} />
  </div>;
};

export default Login;
