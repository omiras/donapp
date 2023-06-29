import { supabase } from "../../lib/supabaseClient";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      session: null,
      user: null,
      donations: [],
      categories: [],
     
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

      getCategories: async () => {
        const { data, error } = await supabase
          .from("categories")
          .select(); 
        if (error) return console.log(error);
        setStore({ categories: [...data] });
        console.log(data);
       
        
      },
      

      getDonations: async () => {
        const { data, error } = await supabase
          .from("donations")
          .select(`*,profiles(*)`);
        if (error) return console.log(error);
        setStore({ donations: [...data] });
      }, //Funsión creada por Hector para ayudarnos a Daniel y Nordim
      getUserById: async (id) => {
        const { data, error } = await supabase
          .from("profiles")
          .select(`*,donations(*)`)
          .eq("id", id)
          .single();
        return data;
      },

      getDonationCount: () => {
        const store = getStore();
        const numUserDonations = store.donations.filter(
          (donation) => store.user.id == donation.user_id
        );

        return numUserDonations.length;
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
      setDonationDate: async (date, idProduct) => {
        const store = getStore();

        const { data, error } = await supabase
          .from("donations")
          .update({ donation_at: date })
          .eq("id", idProduct)
          .select();
        if (error) return console.log(error);
      },
      setDeletedProduct: async (date, idProduct) => {
        const store = getStore();

        console.log(store.user);
        const { data, error } = await supabase
          .from("donations")
          .update({ deleted_at: date })
          .eq("id", idProduct)
          .select();
        if (error) return console.log(error);
        console.log(data);
        console.log(date);
      },
      editProfile: async (profile) => {
        const store = getStore();

        const { data, error } = await supabase
          .from("profiles")
          .update({ ...profile })
          .eq("id", store.user.id)
          .select();
        if (error) return console.log(error);
        console.log(data);
        setStore({ user: { ...data[0] } });
      },
    },
  };
};

export default getState;
