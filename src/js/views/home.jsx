import React, { useContext } from "react";
import { Context } from "../store/appContext";

  const Home = () => {
    const { store, actions } = useContext(Context);
return (
  <div className="bg-white">
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-4xl font-bold dark:text-white text-center">Donation List</h2>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {store.donations.map((donation, index) => (
          <a href="#" className="group relative" key={index}>
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <img src={donation.imageURL} alt="..." className="image h-full w-full object-cover object-center group-hover:opacity-75" />
              <p className="absolute bottom-3 left-3 badge-lg badge">{donation.productStatus}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  </div>
);
}

export default Home;

/*
 return (
    <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h2 class="text-4xl font-bold dark:text-white text-center">Donation List</h2>
      <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      <a href="#" class="group relative">
        <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg" alt="..." class="image h-full w-full object-cover object-center group-hover:opacity-75" />
        <p class="absolute bottom-3 left-3 badge-lg badge">Nuevo</p>
      </div>
    </a>
        <a href="#" class="group relative">
          <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg" alt="..." class="image h-full w-full object-cover object-center group-hover:opacity-75"/>
            <p class="absolute bottom-3 left-3 badge-lg badge">Semi-nuevo</p>
          </div>
        </a>
        <a href="#" class="group relative">
          <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img src="https://pm1.aminoapps.com/6931/0d9977e98160e3967ee915fbcaae0211db830bb7r1-567-519v2_hq.jpg" alt="..." class="image h-full w-full object-cover object-center group-hover:opacity-75"/>
            <p class="absolute bottom-3 left-3 badge-lg badge">Semi-nuevo</p>
          </div>
        </a>
        <a href="#" class="group relative">
          <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img src="https://fofuxo.com.br/_upload/galleries/2013/09/04/problemas-ao-dar-bebida-alcoolica-para-os-cachorros-5227be24f1850.jpg" alt="..." class="image h-full w-full object-cover object-center group-hover:opacity-75"/>
            <p class="absolute bottom-3 left-3 badge-lg badge">Nuevo</p>
          </div>
        </a>
      </div>
    </div>
  </div>
  );
};

*/