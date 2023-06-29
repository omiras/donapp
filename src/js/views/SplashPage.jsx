import React, { useState } from "react";
import background from "../../assets/img/dona+_splash.png";
import ButtonsSplash from "../component/buttonStyle";
import { Link } from "react-router-dom";

function SplashPage() {
  // splash and home
  localStorage.setItem('primeraVisita', 'true');

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#e0fdf8",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${background})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "10%",
          paddingBottom: "2rem",
        }}
      >
        <h1 className="text-4xl font-bold mx-10 text-center" style={{ color: "#008080" }}>
          Tira-<br></br> Dona+
        </h1>
      </div>

      <div
        className="flex justify-around w-full"
        style={{
          marginBottom: "2rem",
        }}
      >
        <ButtonsSplash>¿Quiénes somos?</ButtonsSplash>
        <nav></nav>
        <div onClick={() => window.location.replace('/')}>
          <ButtonsSplash>¡Empieza a Donar+!</ButtonsSplash>
        </div>
      </div>
    </div>
  );
}

export default SplashPage;
