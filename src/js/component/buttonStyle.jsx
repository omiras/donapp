import React, { useState } from "react";

function ButtonsSplash({ children }) {
  const [buttonStyle, setButtonStyle] = useState({
    minWidth: "130px",
    height: "40px",
    color: "#fff",
    padding: "5px 10px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
    position: "relative",
    display: "inline-block",
    outline: "none",
    borderRadius: "5px",
    border: "none",
    backgroundSize: "120% auto",
    backgroundImage: "linear-gradient(315deg, #43cea2 0%, #185a9d 75%)",
  });

  const handleHover = () => {
    setButtonStyle((prevStyle) => ({
      ...prevStyle,
      backgroundPosition: "right center",
    }));
  };

  const handleActive = () => {
    setButtonStyle((prevStyle) => ({
      ...prevStyle,
      top: "2px",
    }));

    // Reiniciar la animación después de un corto período de tiempo
    setTimeout(() => {
      setButtonStyle((prevStyle) => ({
        ...prevStyle,
        top: "0",
      }));
    }, 100); // Reducir el tiempo de espera a 100ms
  };

  return (
    <button
      style={buttonStyle}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      onMouseDown={handleActive}
      onMouseUp={handleHover}
    >
      {children}
    </button>
  );
}

export default ButtonsSplash;
