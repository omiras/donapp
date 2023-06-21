
import { Profile } from "../views/profile";

import { Link } from "react-router-dom";


export default function DonationList ({items}){
    return(
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {items.map((donation, index) => (
          <Link
            to={"/product/" + donation.id}
            className="group relative"
            key={donation.id}
          >
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 relative">
              <img
                src={donation.image_url}
                alt="..."
                className="image h-full w-full object-cover object-center group-hover:opacity-75"
              />
              <p className="absolute bottom-3 left-3 badge-lg badge">
                {donation.product_status}
              </p>
            </div>
          </Link>
        ))}
      </div>
    )}
