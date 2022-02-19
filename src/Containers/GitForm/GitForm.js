import { useEffect, useState } from "react";

import "./GitForm.scss";
import OurParticles from "../../Components/Particles/Particles";
import RollText from "../../Components/RollText/RollText";
import Input from "../../Components/Input/Input";
import Notification from "../../Components/Notification/Notification";
import Backdrop from "../../Components/Backdrop/Backdrop";
import zuriLogo from "../../images/zuri_logo.png";

function GitForm({ formInputs }) {
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const [formValues, setFormValues] = useState({});
  const [visibleFormInputs, setVisibleFormInputs] = useState([]);

  useEffect(() => {
    console.log(formInputs);
    setVisibleFormInputs([formInputs[0]]);
    const timer = setTimeout(() => {
      setShowSecond(true);
      setTimeout(() => {
        setShowThird(true);
        setTimeout(() => {
          setShowName(true);
        }, 1000);
      }, 1500);
    }, 2000);
    return () => clearTimeout(timer);
  }, [formInputs]);

  const handleContinueClicked = (e, name, inputValue) => {
    e.preventDefault();
    console.log(name, inputValue);
    console.log(formInputs.length, visibleFormInputs.length);
    setFormValues((prevValue) => {
      return {
        ...prevValue,
        [name]: inputValue,
      };
    });

    if (formInputs.length > visibleFormInputs.length) {
      setVisibleFormInputs((visibleInput) => {
        return [...visibleInput, formInputs[visibleFormInputs.length]];
      });
    } else {
      setShowSubmit(true);
    }
  };

  function handleFormSubmitted(e) {
    e.preventDefault();
    console.log(formValues);
    setShowNotification(true);
  }

  function handleOkClicked() {
    setShowNotification(false);
    document.location.reload();
  }

  return (
    <div className="team-form-wrapper">
      <OurParticles />
      <Backdrop show={showNotification} />
      {showNotification ? (
        <Notification
          handleOkClicked={handleOkClicked}
          title="Application Received"
          message={`Your Application to join us has been received, Sit back and drink water, You'll be contacted soon`}
        />
      ) : null}
      <div className="logo">
        <img src={zuriLogo} alt="zuri logo" />
      </div>
      <form onSubmit={handleFormSubmitted}>
        <div className="form-top-text" disabled>
          {showSecond ? (
            <RollText text="Welcome to team Cruisetopia!" />
          ) : (
            <div className="ticking"></div>
          )}
          {showThird ? <RollText text="Let's get started" /> : null}
        </div>

        {showName &&
          visibleFormInputs &&
          visibleFormInputs.map((formInput) => (
            <Input
              key={formInput.name}
              inputType={formInput.inputType}
              prompt={formInput.prompt}
              name={formInput.name}
              rules={formInput.rules}
              buttonDisabled={false}
              handleContinueClicked={handleContinueClicked}
            />
          ))}

        {showSubmit ? (
          <input className="submit" type="submit" value="Submit Application" />
        ) : null}
      </form>

      <div className="team-form-bottom">
        <p>
          By joining our team, you agree to be of good behaviour. Your mental is
          health important, but our deadlines are even more crucial. So, define
          a fine line between this program and your sanity, and stick to your
          priorities.
        </p>
      </div>
    </div>
  );
}

export default GitForm;
