import React from "react";
import styles from "./CustomButton.module.scss";
import { CustomButtonProps } from "./CustomButtonProps";

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  variant,
  size,
  extraWidth,
  disabled,
  onClick,
}) => {
  const buttonClassName = `${styles["custom-button"]} ${styles[variant]} ${
    styles[size]
  } ${extraWidth ? styles["extra-width"] : ""} ${
    disabled ? styles["isDisabled"] : ""
  }`;

  return (
    <button className={buttonClassName} onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
};

export default CustomButton;
