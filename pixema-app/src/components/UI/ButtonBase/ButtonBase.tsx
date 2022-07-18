import { ButtonHTMLAttributes, ReactNode, useRef } from "react";
import { forwardRef } from "react";

interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ripple?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  animationDuration?: number;
}

const ButtonBase = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  (
    {
      className,
      startIcon = null,
      endIcon = null,
      ripple = false,
      animationDuration = 500,
      children,
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const commonRef = ref || buttonRef;

    return (
      <button ref={commonRef} {...props} className='button-base'>
        {startIcon && <span>{startIcon}</span>}
        {children}
        {endIcon && <span>{endIcon}</span>}
      </button>
    );
  }
);
export default ButtonBase;

ButtonBase.displayName = "ButtonBase";
