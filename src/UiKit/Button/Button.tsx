import React from "react";
import s from "./button.module.scss";

interface ButtonProps {
  title: string;
}

const Button: React.FC<ButtonProps> = ({ title }) => {
  return <button className={s.supportButton}>{title}</button>;
};

export default Button;
