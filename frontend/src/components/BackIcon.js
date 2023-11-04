import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDropleftCircle } from "react-icons/io";

const BackIcon = () => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  const buttonStyle = {
    position: "absolute",
    transition: "all 0.5s",
    border: "none",
    background: "transparent",
    outline: "none",
    transform: isHover ? "scale(1.1)" : "none",
  };
  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleClick}
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="backward"
    >
      <IoIosArrowDropleftCircle
        style={{
          fontSize: "var(--largeFont)",
          fill: isHover ? "var(--tertiary)" : "var(--primary) ",
          filter: isHover ? "drop-shadow(1px 1px 1px var(--primary))" : "none",
        }}
      />
    </button>
  );
};

export default BackIcon;
