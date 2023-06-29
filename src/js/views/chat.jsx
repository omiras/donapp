import { useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useState } from "react";

export default function Chat() {
  const { store, actions } = useContext(Context);
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState({ messages: [], room_id: "" });
  const [text, setText] = useState("");

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

  const getMessages = async (id) => {
    const { data, error } = await supabase
      .from("messages")
      .select(`*,profiles(*)`)
      .eq("room_id", id)
      .order("created_at", { ascending: true });

    if (error) console.log(error);
    setMessages({ messages: data, room_id: id });
  };
  const sendMessage = async (message, id) => {
    event.preventDefault();
    if (!message) return;
    const { data, error } = await supabase.from("messages").insert({
      message: message,
      room_id: id,
      user_id: store.user.id,
    });
    if (error) console.log(error);
    setText("");
  };

  useEffect(() => {
    getRooms();
    const channel = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => getMessages(payload.new.room_id)
      )
      .subscribe();
  }, []);
  return (
    <div className="flex w-full ">
      <div className="flex flex-col p-3 sticky top-0 min-h-screen w-[450px] gap-10 bg-black text-white ">
        <h5>Rooms</h5>
        <div className="flex flex-col gap-5">
          {rooms.map((room) => (
            <div key={room.id} className="flex flex-col">
              <span
                className="bg-primary rounded px-3 py-1 mx-auto w-full cursor-pointer hover:scale-105 "
                onClick={() => getMessages(room.id)}
              >
                <p>Donacion: {room.donations.name}</p>
                <p>Persona: {room.profiles.full_name} </p>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-col justify-between  w-full gap-16 p-3 relative ">
        <h5>CHAT</h5>
        {messages?.messages.map((message) => (
          <div key={message.id}>
            {message.profiles.id === store.user.id ? (
              <div className="chat chat-end ">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img src={message.profiles.avatar_url} />
                  </div>
                </div>
                <div className="flex gap-2 place-items-center chat-header">
                  {message.profiles.full_name}
                  <time className="text-xs opacity-50">
                    {message.created_at}
                  </time>
                </div>
                <div className="chat-bubble chat-bubble-secondary">
                  {message.message}
                </div>
              </div>
            ) : (
              <div className="chat chat-start w-fit">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img src={message.profiles.avatar_url} />
                  </div>
                </div>
                <div className="flex gap-1 place-items-center chat-header">
                  {message.profiles.full_name}
                  <time className="text-xs opacity-50">
                    {message.created_at}
                  </time>
                </div>
                <div className="chat-bubble chat-bubble-secondary">
                  {message.message}
                </div>
              </div>
            )}
          </div>
        ))}
        {messages.room_id && (
          <form action="" className="flex gap-2 ">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="input mx-auto input-primary input-bordered w-full"
            />
            <button
              className="btn btn-primary"
              onClick={() => sendMessage(text, messages.room_id)}
            >
              Enviar
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
