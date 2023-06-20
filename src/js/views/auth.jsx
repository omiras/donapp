import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert("Check your email for the login link!");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await actions.signOut();
    console.log("logged out");
    navigate("/");
  };

  return (
    <div className="flow justify-self-center">
      <h1 className="header">Supabase + React</h1>
      {!store.session && (
        <>
          <p className="description">
            Sign in via magic link with your email below
          </p>
          <form className="flow" onSubmit={handleLogin}>
            <div>
              <input
                className="inputField"
                type="email"
                placeholder="Your email"
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <button className={"btn"} disabled={loading}>
                {loading ? <span>Loading</span> : <span>Send magic link</span>}
              </button>
            </div>
          </form>
          <div className="divider"></div>
          {/* Ejecutamos una función para indicar que queremos hacer login con Google */}
          <button
            className="btn"

            onClick={() => actions.signInWithProvider("google")}
          >
            Google
          </button>
        </>
      )}
      <div className="divider"></div>
      <button className="btn" onClick={handleLogout}>
        Sign out
      </button>
    </div>
  );
}
