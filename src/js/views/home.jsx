import React, { useContext } from "react";
import { Context } from "../store/appContext";
import SearchInput from "../component/search";
import { useState } from "react";
import { Link } from "react-router-dom";
import DonationList from "../component/donationList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon } from "@iconify/react";
import Slider from 'react-horizontal-slider';

const Home = () => {
  const { store, actions } = useContext(Context);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredDonations, setFilteredDonations] = useState([...store.donations]);


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
      const filteredDonations = store.donations.filter((d) => d.category_id === categoryId);
      setFilteredDonations(filteredDonations);
    }
  };

  const handleFilter = (e) => {

    const keyword = e.target.value; // Obtiene el valor ingresado en el campo de búsqueda
    const keywords = keyword.split(/\s+/).filter(Boolean); // Divide la entrada en palabras clave y elimina los espacios en blanco

    const filteredDonations = store.donations.filter((d) => {
      console.log("Donation:", d);
      return keywords.every(
        (kw) =>
          [d.name, d.description, d.profiles.city].some((field) =>
            new RegExp(kw, "i").test(field)
          ) && 
          (selectedCategory === null || d.category_id === selectedCategory)
        
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
    
  } console.log("checking", store.donations)
  



  const nearbyDonations = store.donations.filter((d) => (
    d.user &&
    d.user.city &&
    d.user.city === store.user.city
  ));
  // const nearbyDonations = store.donations.filter((d) => d.profiles.city === store.user.city);

  


  return (
    <div>
      <div className="">
        <div className="mx-auto max-w-2xl px-4 pt-6 pb-20 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex justify-center align-center mb-3 gap-2 flex-col">
            <SearchInput value={search} onSearchChange={handleFilter} />
          </div>
          <h1>Productos por Categoría</h1>
          <div className="flex
           flex-row">
          {store.categories.map((category) => (
            <div
              className="flex flex-col items-center justify-around"
              key={category.id}
              onClick={() => handleCategoryFilter(category.id)}
            >
              <Icon
                icon={category.icon_classes}
                className="text-4xl my-6 mr-2 hover:text-green-300"
              />
              <span className="text-sm my-px mx-1">{category.name}</span>
            </div>
          ))}
            </div>

          {donations.length > 0 ? (
            <DonationList items={filteredDonations} />
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
       {/* <Slider
     elements={nearbyDonations.map((donation) => (
     <div key={donation.id}>
      <img src={donation.image_url} alt={donation.name} />
      <p>{donation.name}</p>
     </div>
  ))}
/>  */}
    </div>
  );
};

export default Home;
