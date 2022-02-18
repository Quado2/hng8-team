import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";

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

  function validateData() {

    console.log("We have validated the data");
  }

  function handleInputFocus() {
    setFocused(true);
    setBlured(false);
    setShowButton(true);
  }

  function handleBlur() {
    validateData();
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
        {showButton || showContinueButton ? (
          <button
            disabled={buttonDisabled}
            onClick={(e) => handleContinueClicked(e, name, checkBoxSelectedItems)}
          >
            Continue
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Input;
