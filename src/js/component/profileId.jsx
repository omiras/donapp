import React, { useContext } from "react";
import { Context } from "../store/appContext";
import StaticRating from "../component/StaticRating";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import DonationList from "../component/donationList";

export const ProfileId = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();

  console.log(store);
  console.log("id del usaurio", id);

  

  const [rating, setRating] = useState(1);

  const handleClick = (ratingValue) => {
    setRating(ratingValue);
    console.log(ratingValue);
  };

  /**
   * Si venimos de una ruta, tipo /profile/id-del-usuario ya sabemos que no tenemos que traernos la info del usaurio logueado, si no del usuario id-del-usuario
   */

  /**
   * Si la variable 'id' tiene valor, tenemos que traernos toda la información del usuario identificado con ese id.
   *
   * 2. Esa función, nos trae toda la información del usuarioç
   * 3. Usar ese objeto para rellenar cada una de las partes de esta vista
   *   3.1 Por ejemplo, las donations de la variable const donations deberíamos filtrarlas por el id de este usuarioç
   *   3.2 El avatar, el nombre completo y la city, deberían ser los de este usuario
   *   3.3 La función getDonationsCount la dejamos para el final. Comentadla de momento
   * 4. Si NO estamos logueados ( id tiene algun valor), no deberíamos ver los botones de LOGOUT ni el botón de Editar Perfil
   */
/* Javier y Nordim han estado trabajando en este código hasta este punto*/
  
  let donations;

  if (id) {
    // tenemos que filtrar las donaciones por el id de este usuario
    donations = store.donations.filter((d) => d.user_id === id);
  
  } else {
    donations = store.donations.filter((d) => d.user_id === store.user.id);
  }
  console.log('etiqueta donaciones:',donations);
  return (
    <div>
      <div className="flex relative m-4 pt-4">
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
      <div className="flex justify-center items-center flex-col m-4 mb-12 ml-1 pt-4 gap-10 h-28">
        {/* Traer esto de la base de datos */}
        <StaticRating rating={4} isEditable={false} />
      </div>
      <div className="flex bg-secondary justify-evenly text-primary w-full text-center place-items-center h-52">
        <div className="flex flex-col">
          {/* <span className="text-4xl">{actions.getDonationCount()}</span> */}
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