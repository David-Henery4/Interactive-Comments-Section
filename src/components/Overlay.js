import React from "react";
import { useSelector } from "react-redux";

const Overlay = () => {
  const { isModalAndOverlayActive } = useSelector((store) => store.general);
  return <div className={isModalAndOverlayActive ? "overlay-active overlay" : "overlay"}></div>;
};

export default Overlay;
