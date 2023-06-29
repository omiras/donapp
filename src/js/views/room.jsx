import { useState } from "react";
import { useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Context } from "../store/appContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";

export default function Room() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const { store, actions } = useContext(Context);

  const { id } = useParams();

  const getMessages = async (id) => {
    console.log("AAA");
    const { data, error } = await supabase
      .from("messages")
      .select(`*,profiles(*)`)
      .eq("room_id", id)
      .order("created_at", { ascending: true });

    if (error) console.log(error);
    setMessages(data);
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
    getMessages(id);
    const channel = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `room_id=eq.${id}`,
        },
        (payload) => getMessages(payload.new.room_id)
      )
      .subscribe();
  }, []);
  return (
    <div className="flex flex-col justify-between h-[90vh] w-full gap-16 p-3 relative ">
      <h5>CHAT</h5>
      {messages.map((message) => (
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
                <time className="text-xs opacity-50">{message.created_at}</time>
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
                <time className="text-xs opacity-50">{message.created_at}</time>
              </div>
              <div className="chat-bubble chat-bubble-secondary">
                {message.message}
              </div>
            </div>
          )}
        </div>
      ))}

      <form action="" className="flex gap-2 ">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input mx-auto input-primary input-bordered w-full"
        />
        <button
          className="btn btn-primary"
          onClick={() => sendMessage(text, id)}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
