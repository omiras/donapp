import React from "react";
import background from "../../assets/img/dona+_splash.png";
import ButtonsSplash from "../component/buttonStyle";

function SplashPage() {

return (
    
    <div style={{
        backgroundColor:"#e0fdf8",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
      className="flex justify-around items-end"
    >
      {/* <img></img> */}
      <div className="flex">
        <ButtonsSplash>¿Quienes somos?</ButtonsSplash>
      </div>
      <nav></nav>
      <div className="flex">
      <Link to="/">
        <ButtonsSplash>¡Empieza a Donar+!</ButtonsSplash>
      </Link>
      </div>
    </div>
  );
}

export default SplashPage;