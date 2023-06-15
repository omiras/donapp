const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
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
        {
          id: "2",
          name: "Juguetes educativos",
          description: "Juguetes didácticos para el aprendizaje de los niños.",
          imageURL: "https://ejemplo.com/juguetes_educativos.jpg",
          productStatus: "nuevo",
          publishedDate: "2023-05-12",
          profile: {
            username: "sara",
            rating: 4.3,
            image: "https://randomuser.me/api/portraits/men/73.jpg",
            city: "Barcelona",
          },
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      addNewDonation: (d) => {
        const store = getStore();
        const updatedList = [...store.donations, d];
        console.log(d);
        setStore({
          donations: updatedList,
        });
      },

      loadSomeData: () => {
        /**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
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
