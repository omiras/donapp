import React, { useContext } from 'react';
import { Context } from "../store/appContext";
import Rating from '../component/Rating';


export const Profile = () => {

    const { store } = useContext(Context);
    console.log(store)


    return ( 
<div className='bg-[#C7F9CC]'>
    <div className="flex justify-center items-center flex-col m-4 pt-4">        
        <img className='w-206px h-216px rounded-full ring ring-[#57CC99] ring-offset-[#57CC99] ring-offset-2' src={store.profile.image}/>
    </div>
    <div className="flex justify-center items-center flex-col m-4">
    <h2 className='text-3xl text-center text-[#22577A]'>{store.profile.username}</h2>
    </div>    

</div>
    );
}