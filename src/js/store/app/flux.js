import { supabase } from "../../../lib/supabaseClient";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      session: null,
      user: null,
      emailsNewsletter: [],
      donations: [
        {
          id: "1",
          name: "Ropa de invierno",
          description: "Abrigos, bufandas y guantes para proteger del frío.",
          imageURL: "https://ejemplo.com/ropa_invierno.jpg",
          productStatus: "usado",
          publishedDate: "2023-05-10",
          profile: {
            username: "zara",
            rating: 4.3,
            image: "https://randomuser.me/api/portraits/men/73.jpg",
            city: "Barcelona",
          },
        },
      ],
    },
    actions: {
      addNewDonation: (newDonation) => {
        const store = getStore();
        const updatedList = [...store.donations, newDonation];
        setStore({
          donations: updatedList,
        });
      },
      getDonations: async () => {
        const { data, error } = await supabase
          .from("products")
          .select(`*,profiles(*)`);
        if (error) return console.log(error);
        setStore({ donations: [...data] });
      },
      getUserSession: async () => {
        const actions = getActions();
        const { data, error } = await supabase.auth.getSession();
        if (error) return console.log(error);
        if (!data.session) return;
        await setStore({ session: { ...data.session } });
        await actions.setUser();
      },
      setUser: async () => {
        const store = getStore();
        const { data: user, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", store.session.user.id)
          .single();
        if (error) return console.log(error);
        setStore({ user: { ...user } });
      },
      signOut: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) return console.log(error);
        setStore({ session: null });
      },
      signInWithProvider: async (provider) => {
        const { user, session, error } = await supabase.auth.signInWithOAuth({
          provider,
        });
        if (error) return console.log(error);
        setStore({ session: { ...user } });
      },

      addNewsletterEmail: (email) => {
        //get the store
        // Obten la variable que contiene todas las variables globales
        const store = getStore();

        // Añadir el nuevo elemento a la variable global (emailsNewsletter); esta función recibe un 'email' nuevo. Tengo que crear una nueva copia del array original y añadir el nuevo email con el operador de spread
        const updatedEmails = [...store.emailsNewsletter, email];

        // update the global store
        // actualizamos la variable global emailsNewsletter con el nuevo valor
        setStore({
          emailsNewsletter: updatedEmails,
        });
      },
    },
  };
};

export default getState;
