import React, { useContext } from "react";
import { Context } from "../store/appContext";
import SearchInput from "../component/search";
import { useState } from "react";
import { Link } from "react-router-dom";
import DonationList from "../component/donationList";

const Home = () => {
  const { store, actions } = useContext(Context);

  const [search, setSearch] = useState("");
  const [donations, setDonations] = useState([...store.donations]);

  const handleFilter = (e) => {
    const keyword = e.target.value; // Obtiene el valor ingresado en el campo de búsqueda
    const keywords = keyword.split(/\s+/).filter(Boolean); // Divide la entrada en palabras clave y elimina los espacios en blanco
  
    const filteredDonations = store.donations.filter((d) => {
      return keywords.every((kw) =>
        [d.name, d.description, d.profiles.city].some((field) =>
          new RegExp(kw, "i").test(field)
        )
      );
    });
  
    setSearch(keyword); // Establece la palabra clave de búsqueda en el estado
    setDonations(filteredDonations); // Establece las donaciones filtradas en el estado

  };
  
  // Por defeccto, me las como todas
  let filteredUser = donations;

  // Si estamos logueados , vamos a actualizar la variable filteredUser con las donaciones que no son mías

  if (store.user) {
    console.log(store.user);
    console.log(donations);
    filteredUser = donations.filter((d) => d.user_id !== store.user.id);
  }

  return (
    <div>
      <div className="">
        <div className="mx-auto max-w-2xl px-4 pt-6 pb-20 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex justify-center align-center mb-3 gap-2 flex-col">
            <SearchInput value={search} onSearchChange={handleFilter} />
          </div>
          {donations.length > 0 ? (
            <DonationList items={filteredUser} />
          ) : (
            <div className="flex flex-col items-center justify-center">
              {" "}
              <p className="text-center m-6">
                No hay artículos con la descripción proporcionada.
              </p>
              <img
                src="https://media.tenor.com/gK32v_OWs0kAAAAM/omg-cat.gif"
                alt="Not Found GIF"
              />{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
