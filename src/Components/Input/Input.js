import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import validator from "validator";

import "./Input.scss";
import { useState, useRef } from "react";

function Input(props) {
  const {
    list,
    prompt,
    name,
    inputType,
    clearAllFields,
    handleInputChange,
    handleContinueClicked,
    errorMessage,
    showErrors,
    focus,
    buttonDisabled,
    showContinueButton,
    rules,
  } = props;

  const checkBoxSelectedItems = [];
  const [blured, setBlured] = useState(false);
  const [focused, setFocused] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [status, setStatus] = useState("write");
  const [isValidInput, setIsValidInput] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const inputRef = useRef();

  function handleCheckBoxChange(e) {
    const { id, checked } = e.target;
    const index = checkBoxSelectedItems.indexOf(id);

    if (checked) {
      if (index === -1) {
        checkBoxSelectedItems.push(id);
      }
    } else {
      if (index > -1) {
        checkBoxSelectedItems.splice(index, 1);
      }
    }
  }

  let rule = {
    maxLength: {
      expectedValue: 20,
      errorMessage: "Should not be more than 20 characters",
    },
    minLength: {
      expectedValue: 2,
      errorMessage: "Should not be less than 2 characters",
    },
    isEmail: { expectedValue: true, errorMessage: "Not a valid email address" },
    contains: {
      expectedValue: "@",
      errorMessage: "Should the contain the character: '@' ",
    },
  };

  function validateData(e) {
    if (!rule) {
      setIsValidInput(true);
      return;
    }

    const value = e.target.value;

    let errorMessagesIn = [];
    setIsValidInput(true);
    Object.keys(rule).map((ruleKey) => {
      switch (ruleKey) {
        case "maxLength":
          {
            if (value.length > rule[ruleKey].expectedValue) {
              setIsValidInput(false);
              errorMessagesIn.push(rule[ruleKey].errorMessage);
            }
          }
          break;

        case "minLength":
          {
            if (value.length < rule[ruleKey].expectedValue) {
              setIsValidInput(false);
              errorMessagesIn.push(rule[ruleKey].errorMessage);
            }
          }
          break;

        case "contains":
          {
            if (!validator.contains(value, rule[ruleKey].expectedValue)) {
              setIsValidInput(false);
              errorMessagesIn.push(rule[ruleKey].errorMessage);
            }
          }
          break;

        case "isEmail":
          {
            if (!(validator.isEmail(value) === rule[ruleKey].expectedValue)) {
              setIsValidInput(false);
              errorMessagesIn.push(rule[ruleKey].errorMessage);
            }
          }
          break;
      }
    });
    setErrorMessages(errorMessagesIn);
    console.log("We have validated the data");
  }

  function handleInputFocus() {
    setFocused(true);
    setBlured(false);
    setShowButton(true);
  }

  function handleBlur(e) {
    validateData(e);
    setBlured(true);
    setFocused(false);
    setShowButton(false);
  }

  let inputIcon;

  if (focused || (!focused && !blured)) {
    inputIcon = (
      <span className="write">
        <FontAwesomeIcon icon={faLongArrowAltRight} />
      </span>
    );
  }

  if (blured) {
    if (isValidInput) {
      inputIcon = <span className="good">✓</span>;
    } else {
      inputIcon = <span className="bad">✕</span>;
    }
  }

  if (clearAllFields) {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function renderSwitch(param) {
    switch (param) {
      case "selectInput":
        return (
          <select ref={inputRef} onChange={handleInputChange} name={name}>
            {list.split(",").map((item, i) => {
              return (
                <option key={i} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        );
        break;
      case "checkBox":
        return (
          <div className="checkbox-wrapper">
            {list.split(",").map((item, i) => {
              return (
                <div key={i} className="checkbox-item">
                  <input
                    id={item}
                    onChange={handleCheckBoxChange}
                    type="checkbox"
                    name={name}
                  />{" "}
                  <label>{item}</label>
                </div>
              );
            })}
          </div>
        );
      default:
        return (
          <input
            ref={inputRef}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleBlur}
            name={name}
            autoFocus={focus}
            type={inputType}
          />
        );
    }
  }

  return (
    <div className="our-input">
      <label>{prompt}</label>
      <div className="inner-our-input">
        <div className="inner-level-2">
          {inputIcon}
          {renderSwitch(inputType)}
        </div>
        {(showButton || showContinueButton) && (
          <button
            disabled={isValidInput}
            onClick={(e) =>
              handleContinueClicked(e, name, checkBoxSelectedItems)
            }
          >
            Continue
          </button>
        )}
      </div>

      <div className="error-message">
        {errorMessages &&
          errorMessages.map((errorMessage) => <p>{errorMessage}</p>)}
      </div>
    </div>
  );
}

export default Input;
