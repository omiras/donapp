import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import SearchInput from "../component/search";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DonationList from "../component/donationList";
import { Icon } from "@iconify/react";

const Home = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredDonations, setFilteredDonations] = useState([
    ...store.donations,
  ]);

  const [search, setSearch] = useState("");
  const [donations, setDonations] = useState([...store.donations]);

  const handleCategoryFilter = (categoryId) => {
    setSearch("");
    setSelectedCategory(categoryId);
  };

  let nearbyDonations = donations; // TODAS
  nearbyDonations = donations.filter(
    (donation) =>
      donation.profiles.city?.toLowerCase() ===
        store.user?.city.toLowerCase() && donation.user_id !== store.user?.id
  ); // Me quedo con aquellos que son de mi ciudad y no son mías
  if (selectedCategory) {
    nearbyDonations = nearbyDonations.filter(
      (c) => c.category_id === selectedCategory
    );
  } // además, si tengo seleccionado el filtro de categorías, debo quedarme también solamente con las donaciones de esa categoría

  const handleFilter = (e) => {
    setSelectedCategory(null);
    const keyword = e.target.value; // Obtiene el valor ingresado en el campo de búsqueda
    const keywords = keyword.split(/\s+/).filter(Boolean); // Divide la entrada en palabras clave y elimina los espacios en blanco

    const filteredDonations = store.donations.filter((d) => {
      console.log("Donation:", d);
      return keywords.every(
        (kw) =>
          [d.name, d.description, d.profiles.city].some((field) =>
            new RegExp(kw, "i").test(field)
          )

        // &&
        // (selectedCategory === null || d.category_id === selectedCategory)
      );
    });
    console.log("estas aqui?", filteredDonations);

    setSearch(keyword); // Establece la palabra clave de búsqueda en el estado
    setDonations(filteredDonations); // Establece las donaciones filtradas en el estado
  };

  // Por defeccto, me las como todas
  let filteredUser = donations;

  // Si estamos logueados , vamos a actualizar la variable filteredUser con las donaciones que no son mías

  if (store.user) {
    console.log(store.user);
    filteredUser = donations.filter((d) => d.user_id !== store.user.id);
  }
  if (selectedCategory) {
    filteredUser = filteredUser.filter(
      (c) => c.category_id === selectedCategory
    );
  }
  console.log("checking store: ", store);
  console.log("donations state variable: ", donations);
  useEffect(() => {
    const isTheFirstTime = localStorage.getItem("primeraVisita");
    if (isTheFirstTime || store.user) {
      navigate("/");
    } else {
      navigate("/splash");
    }
  }, []);

  return (
    <div>
      <div className="overflow-hidden">
        <div className="mx-auto max-w-2xl px-4 pt-6 pb-20 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex justify-center align-center mb-3 gap-2 flex-col">
            <SearchInput value={search} onSearchChange={handleFilter} />
          </div>
          <h3 className="pt-8 text-center">Productos por Categoría</h3>

          <div class="w-96 carousel space-x-8 my-3 px-5">
            {store.categories.map((category) => (
              <div
                className="flex flex-col text-center"
                key={category.id}
                onClick={() => handleCategoryFilter(category.id)}
              >
                <Icon
                  icon={category.icon_classes}
                  className={`${
                    selectedCategory == category.id ? "text-accent" : ""
                  } text-4xl w-full pe-6'`}
                />
                <span className="text-sm">{category.name}</span>
              </div>
            ))}
          </div>

          {store.user && (
            <div>
              <h3 className="text-center pt-4">
                Donaciones en {store.user.city}
              </h3>
              <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box px-16">
                {nearbyDonations.map((donation) => (
                  <Link
                    className="group relative"
                    to={"/product/" + donation.id}
                  >
                    <div className="carousel-item" key={donation.id}>
                      <img
                        className="rounded-box max-w-xs max-h-80"
                        src={donation.image_url}
                        alt={donation.name}
                        style={{}}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          <h3 className="text-center py-4">¿Qué necesitas? </h3>

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
