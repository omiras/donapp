import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import StaticRating from "../component/StaticRating";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import DonationList from "../component/donationList";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();

  const [profile, setProfile] = useState({
    avatar_url: '', // TODO: MEter como un placeholder para que se vea algo mientras carga
  });

  // Hacemos toda esta vaina porque getUserById es asíncrono
  // https://www.digitalocean.com/community/tutorials/how-to-handle-async-data-loading-lazy-loading-and-code-splitting-with-react
  useEffect(() => {
    const updateProfileInfo = async () => {
      const profileInfo = await actions.getUserById(id);
      console.log('de verdad que me he ejecuto');
      setProfile(profileInfo);
    }

    if (id) {
      updateProfileInfo();
    } else {
      setProfile({ ...store.user })
    }


  }, [id])

  console.log(store);
  console.log("id del usaurio", id);

  const handleLogout = async () => {
    await actions.signOut();
    console.log("logged out");
    window.location.replace("/");
  };

  const [rating, setRating] = useState(1);

  const handleClick = (ratingValue) => {
    setRating(ratingValue);
    console.log(ratingValue);
  };

  /**
   * Si venimos de una ruta, tipo /profile/id-del-usuario ya sabemos que no tenemos que traernos la info del usaurio logueado, si no del usuario id-del-usuario
   */

  /**
   * Usad JSX condicional para ocultar EDit Profile y Logout si estamos viendo el profile de otra persona . Acordaos de como JSX && 
   */

  /**
   * MEter un WIDTH fijo a todo el avatar
   */


  let donations;
  if (id) {
    // si le he pasado un id por parámetro, quiero todas las donaciones de ese id, NO del logueado
    donations = store.donations.filter((d) => d.user_id === id);
  } else {
    donations = store.donations.filter((d) => d.user_id === store.user.id);

  }

  console.log('etiqeuta donaciones:', donations);
  return <div>
    <div className="flex relative m-4 pt-4">
      <div style={{ display: id ? "none" : "" }} className="absolute">
        <button className="btn btn-sm text-xs" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Sign out
        </button>
      </div>
      <div className="flex w-full">
        <img
          className="w-206px h-216px rounded-full ring ring-secondary ring-offset-secondary ring-offset-2 m-auto "
          src={profile.avatar_url}
          alt="Avatar"
          width={"20em"}
        />
      </div>
    </div>
    <div className="flex justify-center items-center flex-col m-4 pt-4">
      <h2 className="text-3xl text-center text-primary">
        {profile.full_name}
      </h2>
    </div>
    <div style={{ display: id ? "none" : "" }} className="flex justify-center">
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
        {<span className="text-4xl">{donations.length}</span>}
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


};

