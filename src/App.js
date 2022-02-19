
import './App.css';
import GitForm from './Containers/GitForm/GitForm' 

const formInputs = [
  {
    inputType: "text",
    prompt: "Enter your first name",
    name: "firstName",
    rules: {
      maxLength: {
        expectedValue: 20,
        errorMessage: "Should not be more than 20 characters",
      },
      minLength: {
        expectedValue: 2,
        errorMessage: "Should not be less than 2 characters",
      },
    },
  },


  {
      inputType: "text",
      prompt: "Enter your sure name",
      name: "sureName",
      rules: {
        maxLength: {
          expectedValue: 20,
          errorMessage: "Should not be more than 20 characters",
        },
        minLength: {
          expectedValue: 2,
          errorMessage: "Should not be less than 2 characters",
        },
      },
    },

    {
      inputType: "email",
      prompt: "Enter your email address",
      name: "email",
      rules: {
        isEmail: { expectedValue: true, errorMessage: "Not a valid email address" },
      },
    },

    
    {
      inputType: "text",
      prompt: "Enter your phone number",
      name: "phone",
      rules: {
        maxLength: {
          expectedValue: 20,
          errorMessage: "Phone number should not be more than 15 characters",
        },
        minLength: {
          expectedValue: 8,
          errorMessage: "Phone number should not be less than 8 characters",
        },
      },
    },



];

function App() {

  return (
  <div className={`App`}>
      <GitForm formInputs={formInputs}/>
    </div>
  );
}

export default App;
