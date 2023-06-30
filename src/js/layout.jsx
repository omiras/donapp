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
import Chat from "./views/chat";
import Room from "./views/room";



const Layout = () => {
  const [splash, SetSplash] = useState(false)

  const { store, actions } = useContext(Context);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const checkIfUserIsLoggedIn = async () => {
      await actions.getUserSession();
      await actions.getDonations();
      await actions.getCategories();

      setLoading(false);
    };

    checkIfUserIsLoggedIn();
  }, []);
  // const basename = process.env.BASENAME || "";

  const showNavbar = location.pathname.includes('/splash')
  console.log(location.pathname);
  return (
    <BrowserRouter  >
      <div className="flex flex-col w-full place-items-center">
        <div className="w-full">
          <Routes>
            {loading ? (
              <Route path="*" element={<h1>Loading...</h1>} />
            ) : (
              <>
                {/* si la variable store.session tiene algún valor, significa que estamos logueados. En este apartado, vamos a mostrar todas las rutas a las que podemos acceder SIN estar logueados*/}
                {!store.session ? (
                  <>
                    <Route path="/splash" element={<SplashPage />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<DetailView />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/profile/:id" element={<Profile />} />

                    <Route path="*" element={<Navigate to="/auth" />} />
                  </>
                ) : (
                  <>
                    <Route path="/" element={<Home />} />
                    <Route path="/newdonation" element={<NewDonation />} />
                    <Route path="/product/:id" element={<DetailView />} />
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/chat/:id" element={<Room />} />
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
        </div>
        <div className="flex h-[70px]">
          {!showNavbar && <Navbar />}
        </div>
      </div>
    </BrowserRouter>
  );
};


export default injectContext(Layout);
