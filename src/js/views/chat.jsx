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

  useEffect(() => {
    getRooms();
  }, []);
  return (
    <div className="flex w-full ">
      <div className="flex flex-col p-3 sticky top-0 h-[90vh] w-[450px] gap-10 bg-black text-white ">
        <h5>Rooms</h5>
        <div className="flex flex-col gap-5">
          {rooms.map((room) => (
            <div key={room.id} className="flex flex-col">
              <span
                className="bg-primary rounded px-3 py-1 mx-auto w-full cursor-pointer hover:scale-105 "
                onClick={() => setRoom(room.id)}
              >
                <p>Donacion: {room.donations.name}</p>
                <p>Persona: {room.profiles.full_name} </p>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Messages */}
    </div>
  );
}
