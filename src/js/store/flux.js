import { supabase } from "../../lib/supabaseClient";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      session: null,
      user: null,
      donations: [],
    },
    actions: {
      addNewDonation: async (newDonation) => {
        const actions = getActions();
        const { data, error } = await supabase
          .from("donations")
          .insert({ ...newDonation })
          .select();
        if (error) return error;
        actions.getDonations();
      },
      getDonations: async () => {
        const { data, error } = await supabase
          .from("donations")
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
      // La función supabase.auth nos autentifica usando Google
      signInWithProvider: async (provider) => {
        const { user, session, error } = await supabase.auth.signInWithOAuth({
          provider,
        });
        if (error) return console.log(error);
        setStore({ session: { ...user } });
      },
    },
  };
};

export default getState;
