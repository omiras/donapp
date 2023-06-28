import React from "react";
import background from "../../assets/img/dona+_splash.png"
import { Link } from "react-router-dom";




function SplashPage() {

return (
    
    <div style={{
        backgroundColor:"#e0fdf8",
        backgroundImage: `url(${background})`,
        backgroundSize: "contain",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: "100vh",
        
        }} className="flex justify-around items-end"> 
        {/* <img></img> */}
            <div className="flex">
                <Link to="/contact">
                <button className="btn">¿Quienes somos?</button>
                </Link>
                </div>
                <nav></nav>
                <div className="flex">
                <Link to="/">
                <button className="btn" onClick={showNavbar}>¡Empieza a Donar+!</button>
                </Link>
            </div>
    </div>
    
)}

export default SplashPage;