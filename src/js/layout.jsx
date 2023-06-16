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

const basename = import.meta.env.BASENAME || "";

//create your first component
const Layout = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getUserSession();
  }, []);
  return (
    <div className="flow h-screen">
      <BrowserRouter>
        <Navbar />
        <Routes>
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
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
