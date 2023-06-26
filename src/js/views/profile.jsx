import React, { useContext } from "react";
import { Context } from "../store/appContext";
import StaticRating from "../component/StaticRating";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import DonationList  from "../component/donationList";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  console.log(store);

  const handleLogout = async () => {
    await actions.signOut();
    console.log("logged out");
    navigate("/");
  };

  const [rating, setRating] = useState(1);

  const handleClick = (ratingValue) => {
    setRating(ratingValue);
    console.log(ratingValue);
  };

  /** SI el usuario está logueado, todo tiene que funcionar como hasta ahora. SAbemos que un usuario está logueado porque la variable store.user tiene valor.  */

  /**
   * Si no está logueado, las donaciones, el avatar, el full name y cualquier otra información debe provenir del usuario procedente de la URL. Si hemos hecho click aqui /profile/cced0883-c7d4-49f1-a0ab-ddc93e637da5 , debemos traernos toda la información del usuario Fran 
   */

  const donations = store.donations.filter((d) => d.user_id === store.user.id);

  return (
    <div>
      <div className="flex relative m-4 pt-4">
        <div className="absolute">
          <button className="btn btn-sm text-xs" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Sign out
          </button>
        </div>
        <div className="flex w-full">
          <img
            className="w-206px h-216px rounded-full ring ring-secondary ring-offset-secondary ring-offset-2 m-auto "
            src={store.user.avatar_url}
            alt="Avatar"
          />
        </div>
      </div>
      <div className="flex justify-center items-center flex-col m-4 pt-4">
        <h2 className="text-3xl text-center text-primary">
          {store.user.full_name}
        </h2>
      </div>
      <div className="flex justify-center">
        <Link className="link" to={`/profile/edit`}>
          Editar perfil
        </Link>
      </div>
      <div className="flex justify-center items-center flex-col m-4 mb-12 ml-1 pt-4 gap-10 h-28">
        {/* Traer esto de la base de datos */}
        <StaticRating rating={4} isEditable={false} />
      </div>
      <div className="flex bg-secondary justify-evenly text-primary w-full text-center place-items-center h-52">
        <div className="flex flex-col">
          <span className="text-4xl">{actions.getDonationCount()}</span>
          <span className="text-xl">Donaciones</span>
        </div>
        <span className="h-24 border border-base-100"></span>
        <div className="flex flex-col">
          <span className="text-4xl">234</span>
          <span className="text-xl">Likes</span>
        </div>
      </div>
      <div>
        <DonationList items={donations} />
      </div>
    </div>
  );
};
