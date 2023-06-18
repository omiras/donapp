import { supabase } from "../../../lib/supabaseClient";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      session: null,
      user: null,
      emailsNewsletter: [],
      donations: [],
    },
    actions: {
      addNewDonation: async (newDonation) => {
        const actions = getActions();
        const { data, error } = await supabase
          .from("products")
          .insert({ ...newDonation })
          .select();
        if (error) return error;
        actions.getDonations();
      },
      deleteDonation: async (id) => {
        const actions = getActions();
        const { data, error } = await supabase
          .from("products")
          .delete()
          .eq("id", id);
        if (error) return error;
        actions.getDonations();
      },
      updateDonation: async (id, updatedDonation) => {
        const actions = getActions();
        const { data, error } = await supabase
          .from("products")
          .update({ ...updatedDonation })
          .eq("id", id);
        if (error) return error;
        actions.getDonations();
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
