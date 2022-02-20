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
    rules,
  } = props;

  const [blured, setBlured] = useState(false);
  const [focused, setFocused] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isValidInput, setIsValidInput] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [inputValue, setInputValue] = useState(null);
  const [checkBoxItems, setCheckBoxItem] = useState([]);
  const [showCheckContinue, setShowCheckContinue] = useState(false);
  const inputRef = useRef();

  function handleCheckBoxChange(e) {
    const { id, checked } = e.target;
    const prevItems = checkBoxItems;
    const index = prevItems.indexOf(id);
    setShowCheckContinue(true);

    if (checked) {
      prevItems.push(id);
      setCheckBoxItem(prevItems);
    } else {
      prevItems.splice(index, 1);
    }

    setInputValue(checkBoxItems);
    validateData(checkBoxItems);
  }

  function handleCheckContinueClicked(e, name1, inputValue1) {
    setShowCheckContinue(false);
    handleContinueClicked(e, name1, inputValue1);
    
  }

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
          if (value.length > rules[ruleKey].expectedValue) {
            setIsValidInput(false);
            errorMessagesIn.push(rules[ruleKey].errorMessage);
          }

          break;

        case "minLength":
          if (value.length < rules[ruleKey].expectedValue) {
            setIsValidInput(false);
            errorMessagesIn.push(rules[ruleKey].errorMessage);
          }
          break;

        case "contains":
          if (!validator.contains(value, rules[ruleKey].expectedValue)) {
            setIsValidInput(false);
            errorMessagesIn.push(rules[ruleKey].errorMessage);
          }

          break;

        case "isEmail":
          if (!(validator.isEmail(value) === rules[ruleKey].expectedValue)) {
            setIsValidInput(false);
            errorMessagesIn.push(rules[ruleKey].errorMessage);
          }

          break;
        default:
          break;
      }
      return null;
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
    console.log("focused");
  }

  function handleBlur(e) {
    setBlured(true);
    setFocused(false);
    const wait = setTimeout(() => {
      setShowButton(false);
      clearTimeout(wait);
    }, 50);
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

  return (
    <div className="our-input">
      <label>{prompt}</label>
      <div className="inner-our-input">
        <div className="inner-level-2">
          {inputIcon}

          {inputType === "selectInput" ? (
            <select
              autoFocus={true}
              ref={inputRef}
              onChange={handleChange}
              name={name}
              onFocus={handleInputFocus}
              onBlur={handleBlur}
            >
              {list.split(",").map((item, i) => {
                return (
                  <option key={i} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          ) : inputType === "checkBox" ? (
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
          ) : (
            <input
              ref={inputRef}
              onChange={handleChange}
              onFocus={handleInputFocus}
              onBlur={handleBlur}
              name={name}
              autoFocus={true}
              type={inputType}
            />
          )}
        </div>
        {showButton  && (
          <button
            disabled={!isValidInput}
            onClick={(e) => handleContinueClicked(e, name, inputValue)}
          >
            Continue
          </button>
        )}

        {showCheckContinue && (
          <button
            disabled={!isValidInput}
            onClick={(e) => handleCheckContinueClicked(e, name, inputValue)}
          >
            Continue
          </button>
        )}
      </div>
      {errorMessages && (
        <div className="error-message">
          {errorMessages &&
            errorMessages.map((errorMessage, i) => (
              <p key={i}>{errorMessage}</p>
            ))}
        </div>
      )}
    </div>
  );
}

export default Input;
