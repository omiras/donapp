import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../store/appContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useWindowSize } from "@uidotdev/usehooks";

export const NewDonation = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();
  const [uploading, setUploading] = useState(false);
  const size = useWindowSize();

  async function uploadAvatar(event) {
    try {
      setUploading(true);
      setPreview(null);
      setImage(null);

      // if (!event.target.files || event.target.files.length === 0) {
      //   throw new Error("You must select an image to upload.");
      // }

      const file = event.target.files[0];
      setImage(file);
      const reader = new FileReader();

      reader.onload = () => {
        setPreview(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  const url =
    "https://wfjvzsivrrhoqaqhqvuj.supabase.co/storage/v1/object/public/products/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const fileExt = image.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    let { error: uploadError } = await supabase.storage
      .from("products")
      .upload(filePath, image);
    if (uploadError) {
      throw uploadError;
    }

    const updatedDonation = {
      name: data.name,
      description: data.description,
      product_status: data.state,
      image_url: url + filePath,
      user_id: store.user.id,
    };
    // handleData(data);
    const res = await actions.addNewDonation(updatedDonation);
    reset();
    if (res) {
      console.log(res);
      alert("Error");
      return;
    }
    toast.success("¡Gracias, tu donación está publicada!"),
      { position: toast.POSITION.TOP_CENTER };

    reset();
    setPreview("");
  };

  return (
    <div className="flex flex-col gap-3 justify-center items-center pb-20">
      <h1 className="text-2xl font-bold">Describe tu regalo</h1>

      <form
        className="flex flex-col md:w-[50vw] w-full border p-6 gap-4 rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Name---------------- */}
        <div className="flex flex-col gap-2">
          <label className="label-text">Nombre</label>
          <input
            className={`input input-md input-bordered  ${
              errors.name ? "input-error" : ""
            }`}
            placeholder="Nombre"
            {...register(
              "name",
              //{ pattern: /^[A-Za-z-0-9]/i },
              //This is the validation
              {
                required: "Campo requerido.",
                maxLength: {
                  value: 20,
                  message: "El nombre no puede tener más de 20 carácteres.",
                },
              }
            )}
          />
          {errors?.name && (
            <span className="text-error">{errors.name.message}</span>
          )}
        </div>

        {/* Description---------------- */}
        <div className="flex flex-col gap-2">
          <label className="label-text">Descripción</label>
          <div className="flex flex-col relative">
            <textarea
              className={`input input-md input-bordered w-full textarea h-auto  ${
                errors.description ? "input-error" : ""
              }`}
              placeholder="Descripción"
              {...register(
                "description",
                // { pattern: /^[A-Za-z-0-9]/i },
                {
                  //This is the validation
                  required: "Campo requerido.",
                  maxLength: {
                    value: 1000,
                    message:
                      "El descripción no puede tener más de 1000 carácteres.",
                  },
                }
              )}
            ></textarea>

            {errors?.description && (
              <span className="text-error"> {errors.description.message}</span>
            )}
          </div>
        </div>

        {/* Image---------------- */}

        <div className="flex flex-col gap-2">
          {preview && <img src={preview} alt="" />}
          {!preview && (
            <div className="h-52 w-full flex place-items-center justify-center border border-secondary border-4 rounded">
              <p>Image</p>
            </div>
          )}
          <label className="btn btn-primary" htmlFor="single">
            {uploading ? "Uploading ..." : "Upload Image"}
          </label>
          <input
            style={{
              visibility: "hidden",
              position: "absolute",
            }}
            {...register("image", { required: "Campo requerido." })}
            type="file"
            id="single"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
          {size.width < 768 && (
            <>
              <label className="btn btn-primary hidden" htmlFor="single">
                {uploading ? "Uploading ..." : "Take a picture"}
              </label>
              <input
                style={{
                  visibility: "hidden",
                  position: "absolute",
                }}
                {...register("image", { required: "Campo requerido." })}
                type="file"
                id="single"
                accept="image/*"
                capture="user"
                onChange={uploadAvatar}
                disabled={uploading}
              />
            </>
          )}
          {errors?.image && (
            <span className="text-error"> {errors.image.message}</span>
          )}
        </div>
        {/* State---------------- */}
        <div className="flex flex-col gap-2">
          <label className="label-text">Estado</label>
          <select
            className={`select select-bordered select-md  ${
              errors.state ? "input-error" : ""
            }`}
            name="state"
            id="state"
            {...register("state", {
              //This is the valid
              required: "Campo requerido.",
            })}
          >
            <option value="">Elige una opción</option>
            <option value="nuevo">Nuevo</option>
            <option value="usado">Usado</option>
            <option value="deteriorado">Deteriorado</option>
          </select>
          {errors?.state && (
            <span className="text-error"> {errors.state.message}</span>
          )}
        </div>

        <input
          className="btn bg-primary text-white rounded w-fit place-self-center uppercase"
          type="submit"
          value="Publicar"
        />
        <ToastContainer></ToastContainer>
      </form>
    </div>
  );
};
