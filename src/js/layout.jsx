import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import SplashPage from "./views/SplashPage";
import Home from "./views/home";
import injectContext, { Context } from "./store/appContext";
import { Profile } from "./views/profile";
import { Navigate } from "react-router-dom";
import { Navbar } from "./component/navbar";
import { NewDonation } from "./views/newdonation";
import DetailView from "./views/detailView";
import Auth from "./views/auth";
import { useContext, useEffect, useState } from "react";
import EditProfile from "./views/EditProfile";

const Layout = () => {
  const [splash, SetSplash] = useState(false)

  const { store, actions } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const location = useLocation();



  useEffect(() => {
    const checkIfUserIsLoggedIn = async () => {
      await actions.getUserSession();
      await actions.getDonations();
      await actions.getCategories();

      setLoading(false);
    };

    checkIfUserIsLoggedIn();
  }, []);

  const showNavbar = location.pathname !== "/splash";

  return (
    <div className="flow">
      <Routes>
        {loading ? (
          <Route path="*" element={<h1>Loading...</h1>} />
        ) : (
          <>
            {!store.session ? (
              <>
                <Route path="/splash" element={<SplashPage />} />
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
        )}
      </Routes>
      {showNavbar && <Navbar />}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default injectContext(App);
