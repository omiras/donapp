import { useContext } from "react";
import { Context } from "../store/appContext";
import { useState } from "react";

export default function EditProfile() {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState(store.user.full_name);
  const [city, setCity] = useState(store.user.city || '');
  const [avatar, setAvatar] = useState(store.user.avatar_url);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flow flex flex-col place-items-center w-full h-screen justify-center "
    >
      <div className="w-full">
        <div className="chat-image avatar w-full ">
          <div className="w-40 rounded-full mx-auto">
            <img src={store.user.avatar_url} />
          </div>
        </div>
      </div>
      <div className="edit-avatar flex flex-col justify-center">
        <h2>{watch("full_name") || store.user.full_name}</h2>
        <h4>{watch("city") || store.user.city}</h4>
      </div>

      <div className="flex flex-col">
        <label className="label">Name</label>
        <input
          type="text"
          className="input"
          maxLength={20}
          defaultValue={store.user.full_name}
          {...register("full_name", {
            required: "Campo requerido",
            maxLength: {
              value: 20,
              message: "El nombre no puede tener más de 25 carácteres.",
            },
            minLength: {
              value: 3,
              message: "El nombre no puede tener menos de 3 carácteres.",
            },
          })}
        />
        {errors.full_name && (
          <span className="text-red-500">{errors.full_name.message}</span>
        )}
      </div>
      <div className="flex flex-col">
        <label className="label">City</label>
        <input
          type="text"
          className="input"
          maxLength={20}
          defaultValue={store.user.city}
          {...register("city", {
            required: "Campo requerido",
            maxLength: {
              value: 20,
              message: "La ciudad no puede tener más de 15 carácteres.",
            },
          })}
        />
        {errors.city && (
          <span className="text-red-500">{errors.city.message}</span>
        )}
      </div>
      <div className="edit-btn">
        <button className="btn">Save</button>
      </div>
    </form>
  );
}
