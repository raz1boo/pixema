import { ChangeEvent, forwardRef, InputHTMLAttributes } from "react";
// import cn from "classnames";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  variant?: "dark" | "small";
  errorMessage?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      value,
      error = false,
      errorMessage,
      variant,
      label,
      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <label className={className}>
        {label && <span>{label}</span>}
        <input
          data-testid="input"
          ref={ref}
          // className={classNames(
          //   styles.textField,
          //   variant === "dark" && styles.dark,
          //   variant === "small" && styles.small,
          //   error === true && styles.error
          // )}
          value={value}
          onChange={onChange}
          {...props}
        />
        {errorMessage && <span>{errorMessage}</span>}
      </label>
    );
  }
);

export default TextField;

TextField.displayName = "TextField";
