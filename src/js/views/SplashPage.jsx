import React, { useState } from "react";
import background from "../../assets/img/dona+_splash.png";
import ButtonsSplash from "../component/buttonStyle";
import { Link } from "react-router-dom";

function SplashPage() {


  //splash and home
  localStorage.setItem('primeraVisita', 'true')


  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
        backgroundColor: "#e0fdf8"
      }}
      className="flex flex-col justify-end"
    >
      {/* <img></img> */}
      <div className="flex justify-around mb-10">
        <ButtonsSplash>¿Quienes somos?</ButtonsSplash>
        <nav></nav>
        <div onClick={() => window.location.replace('/')}>
          <ButtonsSplash>¡Empieza a Donar+!</ButtonsSplash>
        </div>
      </div>
    </div>
  );
}



export default SplashPage;