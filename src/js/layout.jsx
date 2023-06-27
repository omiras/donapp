import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./views/home";
import injectContext, { Context } from "./store/appContext";
import { Profile } from "./views/profile";

import { Navbar } from "./component/navbar";
import { NewDonation } from "./views/newdonation";
import DetailView from "./views/detailView";
import Auth from "./views/auth";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import EditProfile from "./views/EditProfile";

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
      await actions.getCategories();
      setLoading(false);
    };

    checkIfUserIsLoggedIn();
  }, []);
  return (
    <div className="flow">
      <BrowserRouter>
        <Routes>
          {loading ? (
            <Route path="*" element={<h1>Loading...</h1>} />
          ) : (
            <>
              {/* si la variable store.session tiene algún valor, significa que estamos logueados. En este apartado, vamos a mostrar todas las rutas a las que podemos acceder SIN estar logueados*/}
              {!store.session ? (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/product/:id" element={<DetailView />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="*" element={<Navigate to="/auth" />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/newdonation" element={<NewDonation />} />
                  <Route path="/product/:id" element={<DetailView />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/edit" element={<EditProfile />} />
                  <Route path="/auth" element={<Auth />} />
                </>
              )}
              <Route path="*" element={<h1>Not found!</h1>} />
            </>
            //navegar solo con login
          )}
        </Routes>
        <Navbar />
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
