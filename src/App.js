import React, { useState } from 'react';
import { Button, ButtonContainer, ErrorMsg, Form, Label, SuccessMsg, TermsContainer } from './elements/Forms';
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputComponent from './components/Input';


const App = () => {
  const formInitialState = {
    field: '', 
    valid: null
  }

  /* Creating a state for each input. */
  const [user, setUser] = useState({field: '', valid: null});
  const [name, setName] = useState({field: '', valid: null});
  const [pass, setPass] = useState({field: '', valid: null});
  const [pass2, setPass2] = useState({field: '', valid: null});
  const [email, setEmail] = useState({field: '', valid: null});
  const [phone, setPhone] = useState({field: '', valid: null});
  const [terms, setTerms] = useState(false);
  const [validForm, setValidForm] = useState(null);

  /* A regular expression that is used to validate the input. */
  const expressions = {
    user: /^[a-z0-9_-]{4,16}$/gi, // Letters, numbers, dash and underscore
    name: /^[a-zÀ-ÿ\s]{1,40}$/gi, // Letters and spaces, it can accept latin american accentuations.
    password: /^.{6,12}$/, // 4 to 12 digits.
    email: /^[a-z0-9_.+-]+@[a-z0-9-]+\.[a-z0-9-.]+$/gi,
    phone: /^\d{10}$/, // 7 to 14 numbers.
  };

  /*
   * If the password field is not empty, and the password field is * not equal to the confirm password field, then set the confirm * password field to invalid
   */
  const validatePass2 = () => {
    if (pass.field.length > 0) {
      if (pass.field !== pass2.field) {
        // console.log("Not equal");
        setPass2((prevState) => {
          return {
            ...prevState,
            valid: 'false',
          };
        });
      } else {
        // console.log("Yay");
        setPass2((prevState) => {
          return {
            ...prevState,
            valid: "true",
          };
        });
      }
    }
  };

  const onChangeTerms = (e) => setTerms(e.target.checked);

  /*
   * If all the form fields are valid, set the form to valid, reset * the form fields to their initial state, and clear the form
   * @param e - the event object
   */
  const onSubmit = (e) => {
    e.preventDefault();

    if (user.valid === 'true' && name.valid === 'true' && pass.valid === 'true' && pass2.valid === 'true' && email.valid === 'true' && phone.valid === 'true' & terms) {
      setValidForm(true);
      setUser(formInitialState);
      setName(formInitialState);
      setPass(formInitialState);
      setPass2(formInitialState);
      setEmail(formInitialState);
      setPhone(formInitialState);
    } else {
      setValidForm(false);
    }
  };

  return (
    <main>
      <Form onSubmit={onSubmit}>
        <InputComponent
          state={user}
          setState={setUser}
          type="text"
          label="User"
          placeholder="User Name"
          name="user"
          errorLeyend="User must be 4-16 characters & can only be made from letters, numbers and underscore"
          regExp={expressions.user}
        />
        <InputComponent
          state={name}
          setState={setName}
          type="text"
          label="Name"
          placeholder="John Doe"
          name="name"
          errorLeyend="Name can contain letters and spaces"
          regExp={expressions.name}
        />
        <InputComponent
          state={pass}
          setState={setPass}
          type="password"
          label="Password"
          name="password1"
          errorLeyend="Password must be 4-12 digits"
          regExp={expressions.password}
        />
        <InputComponent
          state={pass2}
          setState={setPass2}
          type="password"
          label="Repeat Password"
          name="password2"
          errorLeyend="Password must be equal"
          validatePass2={validatePass2}
        />
        <InputComponent
          state={email}
          setState={setEmail}
          type="email"
          label="Email"
          name="email"
          errorLeyend="This is not a valid email"
          regExp={expressions.email}
        />
        <InputComponent
          state={phone}
          setState={setPhone}
          type="text"
          label="Phone"
          placeholder="1234657890"
          name="phone"
          errorLeyend="Phone can only contain numers, no spaces or parenthesis and should not be longer than 10 digits"
          regExp={expressions.phone}
        />

        <TermsContainer>
          <Label>
            <input
              type="checkbox"
              name="terms"
              id="terms"
              checked={terms}
              onChange={onChangeTerms}
            />
            Agree Terms and Conditions
          </Label>
        </TermsContainer>
        {validForm === false && (
          <ErrorMsg>
            <p>
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <b>Error:</b> Please complete the form.
            </p>
          </ErrorMsg>
        )}
        <ButtonContainer>
          <Button type="submit">Send</Button>
          {validForm === true && <SuccessMsg>The form has been successfully sent!</SuccessMsg>}
        </ButtonContainer>
      </Form>
    </main>
  );
}
 
export default App;