import React from "react";
import background from "../../assets/img/dona+_splash.png"




function SplashPage() {





    return (
    
    <div style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: "100vh",
        }} className="flex justify-around items-end"> 
        {/* <img></img> */}
            <div className="flex">
                <button className="btn">¿Quienes somos?</button>
                </div>
                <nav></nav>
                <div className="flex">
                <button className="btn">¡Empieza a Donar+!</button>
            </div>
    </div>
    
)}

export default SplashPage;