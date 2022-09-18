import { BoltIcon } from "@heroicons/react/20/solid";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CardComponent({ data, index }: any) {
  const navigate = useNavigate();
  const navigateToDetails = () => {
    navigate(`/pokemon/${data.name}`);
  };
  return (
    <div
      className="rounded overflow-hidden shadow-lg cursor-pointer"
      onClick={navigateToDetails}
    >
      <img
        className="lg:h-48 md:h-36 w-full object-contain object-center"
        src={data.sprites?.front_default}
        alt="Mountain"
      />
      <div className="px-6 py-4">
        <div className="font-semibold text-lg mb-2 capitalize text-center">
          {data.name}
        </div>
        <div className="bg-slate-200 rounded-lg p-3">
          <div className="flex flex-wrap justify-between text-sm font-semibold">
            <span>Base-Xp</span>
            <span>{data.base_experience}</span>
          </div>
          <div className="flex flex-wrap justify-between text-sm font-semibold">
            <span>Height</span>
            <span>{data.height}</span>
          </div>
          <div className="flex flex-wrap justify-between text-sm font-semibold">
            <span>Weight</span>
            <span>{data.weight}</span>
          </div>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        {data.abilities?.map((item: any, index: number) => (
          <span
            key={index}
            className="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            <BoltIcon className="w-3 h-3 inline-block mr-1" />
            {item.ability?.name}
          </span>
        ))}
      </div>
    </div>
    // </div>

    // <div
    //   key={index}
    //   className="p-4 md:w-1/4 cursor-pointer"
    //   onClick={navigateToDetails}
    // >
    //   <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden shadow-2xl">
    //     <img
    //       className="lg:h-48 md:h-36 w-full object-cover object-center"
    //       src={data.sprites?.front_default}
    //       alt="blog"
    //     />
    //     <div className="p-6">
    //       <h2 className="tracking-widest text-sm title-font font-medium text-gray-400 mb-3 capitalize">
    //         {data.name}
    //       </h2>

    //       <p className="leading-relaxed mb-3">
    //         Photo booth fam kinfolk cold-pressed sriracha leggings jianbing
    //         microdosing tousled waistcoat.
    //       </p>
    //       <div className="flex items-center flex-wrap "></div>
    //     </div>
    //   </div>
    // </div>
  );
}
