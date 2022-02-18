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
    validateData,
    clearAllFields,
    handleInputChange,
    handleContinueClicked,
    errorMessage,
    showErrors,
    focus,
    buttonDisabled,
    isValidInput,
    showContinueButton,
  } = props;

  const stacks = [];
  const [blured, setBlured] = useState(false);
  const [focused, setFocused] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [status, setStatus] = useState("write");

  const inputRef = useRef();

  function handleCheckBoxChange(e) {
    const { id, checked } = e.target;
    const index = stacks.indexOf(id);

    if (checked) {
      if (index === -1) {
        stacks.push(id);
      }
    } else {
      if (index > -1) {
        stacks.splice(index, 1);
      }
    }
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


  return (
    <div className="our-input">
      <label>{prompt}</label>
      <div className="inner-our-input">
        <div className="inner-level-2">
          {status === "good" ? <span className="good">✓</span> : null}
          {status === "write" ? (
            <span className="write">
              <FontAwesomeIcon icon={faLongArrowAltRight} />
            </span>
          ) : null}
          {status === "bad" ? <span className="bad">✕</span> : null}

          {inputType === "selectInput" ? (
            <select onChange={handleInputChange} name={name}>
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
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleBlur}
              name={name}
              autoFocus={focus}
              type={inputType}
            />
          )}
        </div>
        {showButton || showContinueButton ? (
          <button
            disabled={buttonDisabled}
            onClick={(e) => handleContinueClicked(e, name, stacks)}
          >
            Continue
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Input;
