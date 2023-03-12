import React from "react";
import Tracks from "../../components/Tracks/Tracks";
import s from "./homePage.module.scss";

const HomePage = () => {
  return (
    <div className={s.home}>
      <div>
        <Tracks />
      </div>
    </div>
  );
};

export default HomePage;
