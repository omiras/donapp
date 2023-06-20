import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { store, actions } = useContext(Context);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl font-bold dark:text-white text-center">
          Donation List
        </h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {store.donations.map((donation) => (
            <Link
              to={"/product/" + donation.id}
              className="group relative"
              key={donation.id}
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 relative">
                <img
                  src={donation.image_url}
                  alt="..."
                  className="image h-full w-full object-cover object-center group-hover:opacity-75"
                />
                <p className="absolute bottom-3 left-3 badge-lg badge">
                  {donation.product_status}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
