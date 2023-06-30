import { useState } from "react";
import { useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Context } from "../store/appContext";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";

export default function Room() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [donation, setDonation] = useState({});
  const { store, actions } = useContext(Context);

  const { id } = useParams();

  const getDonacion = async (id) => {
    const { data, error } = await supabase
      .from("rooms")
      .select(`*,donations(*)`)
      .eq("id", id)
      .single();

    if (error) console.log(error);
    console.log('data getDonacion', data)
    setDonation(data);
  };

  const getMessages = async (id) => {
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
    getDonacion(id);
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
    <>
      <div className="flex flex-col justify-between w-full gap-16 p-3 relative ">        <div className="flex gap-5 items-start">
        <div className="flex flex-col">
          <h3>CHAT</h3>

          {/* Restante do conteúdo do chat */}
        </div>
        <div className="ml-auto">
          <h5>{donation?.donations?.name}</h5>
        </div>
        <div className="ml-auto">
          <img
            src={donation?.donations?.image_url}
            alt="Product"
            className="w-12 h-12"
          />
        </div>
        {/* {!donation.donations?.donation_at && donation.donations?.user_id == store.user.id && (
          <button
            className="btn btn-primary"
            onClick={() => {
              actions.setDonationDate(new Date(), donation.id);
              setDonation({ ...donation, donation_at: new Date() });
            }}
          >
            Entregado
          </button>
        )} */}
        {/* {donation.donation_at && donation.user_id != donation.user2_id && (
          <>
            <StaticRating rating={4} isEditable={false} />
          </>
        )} */}
      </div>
        <div className="flex flex-col h-[90vh] overflow-auto">
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
                    <time className="text-xs opacity-50">{new Date(message.created_at).toLocaleString()}</time>
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
                    <time className="text-xs opacity-50">{new Date(message.created_at).toLocaleString()}</time>
                  </div>
                  <div className="chat-bubble chat-bubble-secondary">
                    {message.message}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <form action="" className="flex gap-2 fixed bottom-20 right-2 left-2 ">
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
    </>
  );
}
