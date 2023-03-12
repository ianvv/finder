import React from "react";
import s from "./loader.module.scss";
import { Audio } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className={s.loaderWrapper}>
      <Audio
        height="80"
        width="80"
        radius="9"
        color="black"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    </div>
  );
};

export default Loader;
