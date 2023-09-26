
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {


 
  function isValidEmail(email) {
    // Regular expression for a basic email validation
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
    return emailRegex.test(email);
  }

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput
  } = useInput(value => value.trim() !== '')

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput(value => isValidEmail(value))



  // const [enteredEmail,setEnteredEmail] = useState("")
  // const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  // const enteredNameIsValid = enteredName.trim() !== "";
  // const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  // const enteredEmailIsValid = isValidEmail(enteredEmail)
 

  // const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid)  {
    formIsValid = true;
  }


  // const emailInputChangeHandler = (event) => {
  //   setEnteredEmail(event.target.value);
  // };

  // const emailInputBlurHandler = (event) => {
  //   setEnteredEmailTouched(true);
  // };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    
    // setEnteredEmailTouched(true)

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }
    

    console.log(enteredName);

    resetNameInput()
    resetEmailInput();

    // setEnteredEmail("")
    // setEnteredEmailTouched(false)
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

    const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && (
          <p className="error-text">Email is not valid.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
