import React from "react";
import s from "./button.module.scss";

interface ButtonProps {
    title: string,
    onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({title, onClick}) => {
    return (
        <button className={s.supportButton} onClick={onClick}>{title}</button>
    )
};

export default Button;
