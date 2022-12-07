import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { ErrorLeyend, Input, InputGroup, Label, ValidationIcon } from "../elements/Forms";

const InputComponent = ({state, setState, type, label, placeholder, name, errorLeyend, regExp, validatePass2}) => {
  const onChange = (e) => {
    // console.log(e.target.value);
    setState({
      ...state,
      field: e.target.value,
    });
  };
  
  const validation = (e) => {
    if (regExp) {
      if (regExp.test(state.field)) {
        setState({
          ...state,
          valid: 'true',
        });
      } else {
        setState({
          ...state,
          valid: 'false',
        });
      }
    }

    if (validatePass2) {
      validatePass2();
    }
  };

  return (
    <div>
      <Label htmlFor={name} valid={state.valid}>
        {label}
      </Label>
      <InputGroup>
        <Input
          type={type}
          placeholder={placeholder}
          id={name}
          value={state.field}
          onChange={onChange}
          onKeyUp={validation}
          onBlur={validation}
          valid={state.valid}
        />
        <ValidationIcon 
          icon={state.valid === 'true' ? faCheckCircle : faTimesCircle} 
          valid={state.valid} 
        />
      </InputGroup>
      <ErrorLeyend valid={state.valid}>{errorLeyend}</ErrorLeyend>
    </div>
  );
}
 
export default InputComponent;