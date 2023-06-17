import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./views/home";
import { Newsletter } from "./views/newsletter";
import injectContext, { Context } from "./store/app/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { NewDonation } from "./views/newDonation";
import DetailView from "./views/DetailView";
import Auth from "./views/auth";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useState } from "react";

const basename = import.meta.env.BASENAME || "";

//create your first component
const Layout = () => {
  const { store, actions } = useContext(Context);
  //loading usestate
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //async function calls itself
    const checkIfUserIsLoggedIn = async () => {
      await actions.getUserSession();
      await actions.getDonations();
      setLoading(false);
    };

    checkIfUserIsLoggedIn();
  }, []);
  return (
    <div className="flow h-screen">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {loading ? (
            <Route path="*" element={<h1>Loading...</h1>} />
          ) : (
            <>
              {!store.session ? (
                <>
                  <Route path="/auth" element={<Auth />} />
                  <Route path="*" element={<Navigate to="/auth" />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/newdonation" element={<NewDonation />} />
                  <Route path="/newsletter" element={<Newsletter />} />
                  <Route path="/product/:id" element={<DetailView />} />
                  <Route path="/auth" element={<Auth />} />
                </>
              )}
              <Route path="*" element={<h1>Not found!</h1>} />
            </>
          )}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
