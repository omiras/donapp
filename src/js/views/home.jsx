import React, { useContext } from "react";
import { Context } from "../store/appContext";
import SearchInput from "../component/search";
import { useState } from "react";
import { Link } from "react-router-dom";
import DonationList from "../component/donationList";
import { Icon } from "@iconify/react";

const Home = () => {
  const { store, actions } = useContext(Context);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredDonations, setFilteredDonations] = useState([
    ...store.donations,
  ]);

  const filterByCity = () => {
    return store.donations.filter(
      (donation) =>
        donation.profiles.city?.toLowerCase() === store.user?.city.toLowerCase()
    );
  };

  const [nearbyDonations, setNearbyDonations] = useState(filterByCity);
  const [search, setSearch] = useState("");
  const [donations, setDonations] = useState([...store.donations]);

  const handleCategoryFilter = (categoryId) => {
    if (categoryId === selectedCategory) {
      // Si la misma categoría está seleccionada, eliminar el filtro
      setSelectedCategory(null);
      setFilteredDonations([...store.donations]);
    } else {
      // Establecer la categoría seleccionada para filtrar las donaciones
      setSelectedCategory(categoryId);
      const filteredDonationsC = store.donations.filter(
        (d) => d.category_id === categoryId
      );
      setFilteredDonations(filteredDonationsC);
    }
  };

  const handleFilter = (e) => {
    setSelectedCategory(null)
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
    console.log( "estas aqui?",filteredDonations)

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
    filteredUser=filteredUser.filter((c)=>c.category_id ===selectedCategory)
  }
  console.log("checking", store);
  console.log()
  console.log( "hi?????",donations);
  return (
    
    <div>
      <div className="">
        <div className="mx-auto max-w-2xl px-4 pt-6 pb-20 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex justify-center align-center mb-3 gap-2 flex-col">
            <SearchInput value={search} onSearchChange={handleFilter} />
          </div>
          <h3 className="pt-8 text-xl text-center">Productos por Categoría</h3>

          <div class="w-96 carousel rounded-box mb-4"> 
            {store.categories.map((category) => (
              <div
                className=" items-center justify-around gap-8 "
                key={category.id}
                onClick={() => handleCategoryFilter(category.id)}
              >
              <div className="carousel-item ">
                <Icon
                  icon={category.icon_classes}
                  className=" text-4xl my-6 mr-2 hover:text-green-300 w-full pe-6	"
                />
              </div>
              <div className="carousel-item">
                <span className=" text-sm hover:text-green-300 text-center my-px mx-1 pt-px	pe-6	">{category.name}</span>
              </div>

              </div>
            ))}
          </div>

          


          {store.user && <div>
            <h2>Donaciones cerca de {store.user.city}</h2>
            <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box">
              {nearbyDonations.map((donation) => (
                <div className="carousel-item" key={donation.id}>
                  <img
                    className="rounded-box max-w-xs max-h-80"
                    src={donation.image_url }
                    alt={donation.name}
                    style={{}}
                  />
                 
                </div>
              ))}
            </div>
          </div>}

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
