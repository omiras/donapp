import { useContext } from "react";
import { Context } from "../store/appContext";
import { useState } from "react";

export default function EditProfile() {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState(store.user.full_name);
  const [city, setCity] = useState(store.user.city || '');
  const [avatar, setAvatar] = useState(store.user.avatar_url);

  return (
    <div className="flow flex flex-col place-items-center pb-20 place-content-center">
      <div className="w-full">
        <img
          src={avatar}
          alt=""
          className="w-36 h-36 m-auto aspect-square object-cover"
        />
      </div>
      <div className="edit-avatar flex flex-col justify-center">
        <h2>{name}</h2>
        <h4>{city}</h4>
      </div>
      <div className="edit-img">
        <label className="label">Image url</label>
        <input
          type="text"
          value={avatar}
          className="input"
          onChange={(e) => setAvatar(e.target.value)}
        />
      </div>
      <div className="edit-name">
        <label className="label">Name</label>
        <input
          type="text"
          value={name}
          className="input"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="edit-city">
        <label className="label">City</label>
        <input
          type="text"
          value={city}
          className="input"
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className="edit-btn">
        <button
          className="btn"
          onClick={() =>
            actions.editProfile({ full_name: name, city, avatar_url: avatar })
          }
        >
          Save
        </button>
      </div>
    </div>
  );
}
