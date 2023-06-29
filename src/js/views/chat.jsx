import { useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const { store, actions } = useContext(Context);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const getRooms = async () => {
    const owned = await supabase
      .from("rooms")
      .select(`*,messages(*),donations(*),profiles!rooms_user2_id_fkey(*)`)
      .eq(`user1_id`, store.user.id);

    if (owned.error) console.log(owned.error);

    const wanted = await supabase
      .from("rooms")
      .select(`*,messages(*),donations(*),profiles!rooms_user1_id_fkey(*)`)
      .eq(`user2_id`, store.user.id);

    if (wanted.error) console.log(wanted.error);
    setRooms([...owned.data, ...wanted.data]);
  };

  const setRoom = async (id) => {
    navigate(`/chat/${id}`);
  };

  function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // Los meses en JavaScript son base 0
  
    return dia + '/' + mes;
  }

  useEffect(() => {
    getRooms();
  }, []);
  return (
    
    <div className="flex flex-col w-full p-3 gap-12" >
      
        <h3>Notificaciones</h3>
        <div className="flex flex-col gap-3 w-full">
          {rooms.map((room) => (
              <span key={room.id}
                className="bg-primary rounded px-3 py-1 mx-auto w-full cursor-pointer  flex place-items-center gap-5 relative "
                onClick={() => setRoom(room.id)}
              >
                <div className="">
                  <img className="rounded-lg w-full object-cover w-24 h-24"  src={room.donations.image_url} alt="" />
                </div>
                <div className="text-white "> 
                  <p className="font-bold text-lg capitalize"> {room.donations.name}</p>
                <p className="capitalize"> {room.profiles.full_name} </p>
                </div>
               <p className="absolute top-5 right-5 text-white">{formatearFecha(room.created_at)}</p>
              </span>
          ))}
        </div>
      </div>
  );
}
