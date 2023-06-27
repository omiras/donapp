import { useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const DetailView = () => {
  const { store, actions } = useContext(Context);

  const { id } = useParams();

  const handleDonation = async (e) => {
    const idProduct = e.target.id;
    await actions.getDonationDate(new Date(), idProduct);
    toast.success("El producto ha sido donado correctamente al usuario."),
      { position: toast.POSITION.TOP_CENTER };
  };
  // Send the delete date to the database.
  const handleDeleteProduct = async (e) => {
    const idProduct = e.target.id;
    await actions.getDeletedProduct(new Date(), idProduct);
    console.log("Como queda", store.donations);
    toast.error("El producto ha sido eliminado correctamente."),
      { position: toast.POSITION.TOP_CENTER };
  };

  const product = store.donations.find(
    (donation) => donation.id + "" === id + ""
  );
  console.log(product.id);
  console.log("user", store.user.id);
  console.log("product?", product.profiles.id);

  return (
    <div className=" container grid p-1 md:place-content-center">
      <div className="product-card h-full bg-secondary md:max-w-[500px]  flow p-5 rounded-lg">
        <div className="header flex justify-between place-items-center">
          <div className="profile flex place-items-center gap-2">
            <img
              className="profleAvatar rounded-full"
              src={product.profiles.avatar_url}
              alt="user-avatar"
              width="40px"
            />
            <h5 className="nombre capitalize">{product.profiles.full_name}</h5>
          </div>
          <ToastContainer></ToastContainer>
          <div className="contact">
            <Icon icon="fluent:chat-16-regular" width="40px" />
          </div>
        </div>
        <div className=" relative">
          <img
            className="w-full h-full rounded-lg"
            src={product.image_url}
            alt="product-image"
          />
          <span className="badge badge-primary badge-lg absolute bottom-5 left-5">
            {product.product_status}
          </span>
        </div>

        {store.user.id === product.profiles.id ? (
          <div
            className="location flex gap-1  place-items-center justify-between mr-3"
            style={{ "--flow-space": "0.3em" }}
          >
            <button
              id={product.id}
              onClick={(e) => handleDonation(e)}
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-success"
            >
              Marcar Donación
            </button>
            <Icon
              icon="fluent:location-24-regular"
              width={26}
              className="w-fit"
            />
            {/* <p>{product.profile.city}</p> */}
            <button
              id={product.id}
              onClick={(e) => handleDeleteProduct(e)}
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-error"
            >
              Eliminar
            </button>
          </div>
        ) : (
          <>
            <Icon
              icon="fluent:location-24-regular"
              width={26}
              className="w-fit"
            />
            <p>Barcelona</p>
          </>
        )}

        <div className="info">
          <div className="title">
            <h3>{product.name}</h3>
          </div>
          <div className="desc">
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
