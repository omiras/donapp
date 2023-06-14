import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext";

export const Profiles = () => {

    const { store } = useContext(Context);
    console.log(store)


    return ( 
  <div>
    <img src={store.profile.image}/>
  </div>
    );
}