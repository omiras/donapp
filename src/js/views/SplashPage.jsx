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
        }} className=" flex"> 
        {/* <img></img> */}
            <div className=" flex justify-end">
                <button className="btn">¿Quienes somos?</button>
                <button className="btn">¡Empieza a Donar+!</button>
            </div>
    </div>
    
)}

export default SplashPage;