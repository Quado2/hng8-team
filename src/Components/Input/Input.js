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
    handleContinueClicked,
    errorMessage,
    showErrors,
    focus,
    buttonDisabled,
    showContinueButton,
    rules,
    key,
  } = props;

  
  const [blured, setBlured] = useState(false);
  const [focused, setFocused] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [status, setStatus] = useState("write");
  const [isValidInput, setIsValidInput] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [inputValue, setInputValue] = useState(null);
  const [checkBoxItems, setCheckBoxItem] = useState([])

  const inputRef = useRef();
  let checkBoxSelectedItems = [];

  function handleCheckBoxChange(e) {

    const { id, checked } = e.target;
   
    const prevItems = checkBoxItems;
    const index = prevItems.indexOf(id);
    
    if(checked){
        prevItems.push(id)
        setCheckBoxItem(prevItems)
    } else{
        prevItems.splice(index, 1)
    }

    setInputValue(checkBoxItems);
    validateData(checkBoxItems);
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

  function validateData(value) {
    if (!rules) {
      setIsValidInput(true);
      return;
    }

    let errorMessagesIn = [];
    setIsValidInput(true);
    Object.keys(rules).map((ruleKey) => {
      switch (ruleKey) {
        case "maxLength":
          {
            if (value.length > rules[ruleKey].expectedValue) {
              setIsValidInput(false);
              errorMessagesIn.push(rules[ruleKey].errorMessage);
            }
          }
          break;

        case "minLength":
          {
            if (value.length < rules[ruleKey].expectedValue) {
              setIsValidInput(false);
              errorMessagesIn.push(rules[ruleKey].errorMessage);
            }
          }
          break;

        case "contains":
          {
            if (!validator.contains(value, rules[ruleKey].expectedValue)) {
              setIsValidInput(false);
              errorMessagesIn.push(rules[ruleKey].errorMessage);
            }
          }
          break;

        case "isEmail":
          {
            if (!(validator.isEmail(value) === rules[ruleKey].expectedValue)) {
              setIsValidInput(false);
              errorMessagesIn.push(rules[ruleKey].errorMessage);
            }
          }
          break;
      }
    });
    setErrorMessages(errorMessagesIn);
  }

  function handleChange(e) {
    const value = e.target.value;
    validateData(value);
    setInputValue(e.target.value);
  }

  function handleInputFocus() {
    setFocused(true);
    setBlured(false);
    setShowButton(true);
  }

  function handleBlur(e) {
    setBlured(true);
    setFocused(false);
    const wait = setTimeout(()=>{
        setShowButton(false);
    },50)
    
   
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
          <select key={key} ref={inputRef} onChange={handleChange} name={name}>
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
            onChange={handleChange}
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
        {showButton && (
          <button
            disabled={!isValidInput}
            onClick={(e) => handleContinueClicked(e, name, inputValue)}
          >
            Continue
          </button>
        )}
      </div>
      {errorMessages && (
        <div className="error-message">
          {errorMessages &&
            errorMessages.map((errorMessage,i) => <p key={i}>{errorMessage}</p>)}
        </div>
      )}
    </div>
  );
}

export default Input;
