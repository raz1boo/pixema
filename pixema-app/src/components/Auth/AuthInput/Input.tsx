import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks/redux";

interface InputPrors {
  label?: string;
  type: string;
  name: string;
  placeholder: string;
  onChange?: (name: string) => void;
  autoComplete?: string;
  value: string;
}

const Input = ({
  label,
  type,
  name,
  placeholder,
  onChange,
  autoComplete,
  value,
}: InputPrors) => {
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
    if (password.length < 8) {
      setPasswordError("Пароль должен быть длиннее 8 символов");
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
      {label && (
        <label
          style={{
            color:
              theme === "dark" || location.pathname === "/"
                ? "#fff"
                : "#242426",
          }}
        >
          {label}
        </label>
      )}
      <input
        style={
          theme === "dark" || location.pathname === "/"
            ? { backgroundColor: "#323537", borderColor: "transparent" }
            : { backgroundColor: "#fff", borderColor: "#AFB2B6", color: "#000" }
        }
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          type === "email" ? emailHandler(e) : passwordHandler(e);
          onChange && onChange(e.target.value);
        }}
        onBlur={(e) => blurHandler(e)}
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        />
        {emailDirty && emailError && (
          <div style={{ color: "#ed4337" }}>{emailError}</div>
        )}
        {passwordDirty && passwordError && (
          <div style={{ color: "#ed4337" }}>{passwordError}</div>
        )}
    </>
  );
};

export default Input;
