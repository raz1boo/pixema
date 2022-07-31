import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks/redux";

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
  const [passwordError, setPasswordError] = useState(
    "Пароль не может быть пустым"
  );

  const passwordHandler = (e: any) => {
    setPassword(e.target.value);
    if (password.length < 3 || password.length > 10) {
      setPasswordError("Пароль должен быть длиннее 3 и меньше 10 символов");
    } else {
      setPasswordError("");
    }
  };

  const emailHandler = (e: any) => {
    setEmail(e.target.value);
    const re =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!re.test(String(email).toLowerCase())) {
      setEmailError("Некорректная почта");
    } else {
      setEmailError("");
    }
  };

  const { theme } = useAppSelector((state) => state.themeReducer);
  const location = useLocation();

  const blurHandler = (e: any) => {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
    }
  };

  return (
    <>
      <label style={{
                  color:
                    theme === "dark" || location.pathname === "/"
                      ? "#fff"
                      : "#242426",
                }}>{label }</label>
      {emailDirty && emailError && (
        <div style={{ color: "#ed4337" }}>{emailError}</div>
      )}
      {passwordDirty && passwordError && (
        <div style={{ color: "#ed4337" }}>{passwordError}</div>
      )}
      <input
                style={
                  
                  theme === "dark" || location.pathname === "/"
                    ? { backgroundColor: "#323537", borderColor: "transparent"}
                    : { backgroundColor: "#fff", borderColor: "#AFB2B6", color: "#000"}
                } 
        onChange={
          type === "email" ? (e) => emailHandler(e) : (e) => passwordHandler(e)
        }
        onBlur={(e) => blurHandler(e)}
        type={type}
        name={name}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;
