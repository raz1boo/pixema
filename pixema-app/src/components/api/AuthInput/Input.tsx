import { divide } from "lodash";
import React from "react";
import { useState } from "react";

interface InputPrors {
  label: string;
  type: string;
  name: string;
  placeholder: string;
}


const Input = ({ label, type, name, placeholder }: InputPrors) => {

const [email, setEmail] = useState("");
const [emailDirty, setEmailDirty] = useState(false);
const [emailError, setEmailError] = useState("Почта не может быть пустой");

const [password, setPassword] = useState("");
const [passwordDirty, setPasswordDirty] = useState(false);
const [passwordError, setPasswordError] = useState("Пароль не может быть пустым");



const passwordHandler = (e: any) =>{
  setPassword(e.target.value);
  if(password.length < 3 || password.length > 10){
    setPasswordError("Пароль должен быть длиннее 3 и меньше 10 символов");
  } else {
    setPasswordError("");
  }
}

const emailHandler = (e: any) =>{
setEmail(e.target.value)
const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
if (!re.test(String(e.target.value).toLowerCase())) {
setEmailError("Некорректная почта");
} 
else {
  setEmailError("");
}
}

const blurHandler = (e:any) => {
switch (e.target.name) {
  case "email":
    setEmailDirty(true)
    break
    case "password":
      setPasswordDirty(true)
      break
}
}

  return (
    <>
      <label>{label}</label>
      {(emailDirty && emailError) && <div style={{color: "red"}}>{emailError}</div>}
      {(passwordDirty && passwordError) && <div style={{color: "red"}}>{passwordError}</div>}
      <input 
      onChange={(type==="email"?(e) => emailHandler(e):(e) => passwordHandler(e))} 
     onBlur={e=> blurHandler(e)} type={type} name={name} placeholder={placeholder} />
    </>
  );
};

export default Input;
