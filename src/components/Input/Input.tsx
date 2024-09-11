import { forwardRef } from "react";
import styles from "./Input.module.css";
import { InputProps } from "./Input.props";
import cn from "classnames";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ isValid = true, label, ...props }, ref) => {
    return (
      <div className={styles.wrapper}>
        {label && <label className={styles.label}>{label}</label>}
        <input
          ref={ref}
          className={cn(styles.input, {
            [styles.invalid]: !isValid,
          })}
          {...props}
        />
      </div>
    );
  }
);

export default Input;
