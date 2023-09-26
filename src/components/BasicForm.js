import useInput from "../hooks/use-input";

const BasicForm = (props) => {
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
  } = useInput((value) => value.trim() !== '')

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastnameInputHasError,
    valueChangeHandler: lastnameChangeHandler,
    inputBlurHandler: lastnameBlurHandler,
    reset: resetLastNameInput
  } = useInput((value) => value.trim() !== '')

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput((value) => isValidEmail(value))

  let formIsValid = false;

  // console.log(enteredNameIsValid);
  
  if (enteredNameIsValid && enteredEmailIsValid && enteredLastNameIsValid)  {
    // console.log('hola');
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid || !enteredEmailIsValid || !enteredLastNameIsValid) {
      return;
    }
  
    resetNameInput();
    resetEmailInput();
    resetLastNameInput();

  };

  const nameInputClasses = nameInputHasError
  ? "form-control invalid"
  : "form-control";

  const lastnameInputClasses = lastnameInputHasError
  ? "form-control invalid"
  : "form-control";

  const emailInputClasses = emailInputHasError
  ? "form-control invalid"
  : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='control-group'>
        <div className={nameInputClasses}>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='name' onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName} />
          {nameInputHasError && (
          <p className="error-text">Name must not be empty.</p>
        )}
        </div>
        <div className={lastnameInputClasses}>
          <label htmlFor='lastname'>Last Name</label>
          <input type='text' id='lastname'  onChange={lastnameChangeHandler}
          onBlur={lastnameBlurHandler}
          value={enteredLastName} />
          {lastnameInputHasError && (
          <p className="error-text">Last Name must not be empty.</p>
        )}
        </div>
        
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>E-Mail Address</label>
        <input type='email' id='email' onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}/>
      </div>
      {emailInputHasError && (
          <p className="error-text">Email is not valid.</p>
        )}
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
