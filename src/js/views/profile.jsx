import React, { useContext } from 'react';
import { Context } from "../store/appContext";
import StaticRating from '../component/StaticRating';
import DonationList from '../component/donationList';



export const Profile = () => {

    const { store } = useContext(Context);
    console.log(store)

    const donations = store.donations.filter(d => d.user_id === store.user.id);
 
    return (
        <div >
            <div className="flex justify-center items-center flex-col m-4 pt-4">
                <img className='w-206px h-216px rounded-full ring ring-secondary ring-offset-secondary ring-offset-2' src={store.user.avatar_url} />
            </div>
            <div className="flex justify-center items-center flex-col m-4 pt-4">
                <h2 className='text-3xl text-center text-primary'>{store.user.full_name}</h2>
            </div>
            <div className="flex justify-center items-center flex-col m-4 mb-12 ml-1 pt-4 gap-10 h-28">
                <StaticRating rating={4} />
            </div >
            <div className="flex bg-secondary justify-evenly text-primary w-full text-center place-items-center h-52">
            
                <div className="flex flex-col  ">
                    <span className='text-4xl'>35</span>
                    <span className='text-xl '>Donaciones</span>
                </div>

                <span className='h-24 border border-base-100'></span>

                <div className="flex flex-col">
                    <span className='text-4xl'>234</span>
                    <span className='text-xl'>Likes</span>
                </div>
                
            </div>
            <div>
            <DonationList items={donations} />
            </div>
        </div>
    );
}