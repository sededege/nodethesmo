import React from "react";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";

const Member = ({ photo, name, user, discord, details, curiosity }) => {
  return (
    <div className=" bg-[#151f2b] text-white text-[1.2rem] font text-center p-4 rounded-lg relative mt-20">
      <img
        className="rounded-full w-[120px] mx-auto absolute -top-[60px] left-[25%]"
        src={photo}
      />
      <div className="mt-16">
        <h1 className="font-bold">{name}</h1>
        {/* <h2>{user}</h2>
      <h2>{discord}</h2> */}
        <h2 className="text-[0.9rem]">{details}</h2>
        <h2 className="text-[1rem] mt-4">"{curiosity}"</h2>
        
        <h2 className="text-[1rem] mt-4 uppercase font-semibold text-red-500">
          CORE TEAM
        </h2>

        <a className="flex justify-center mt-4" href={`https://twitter.com/${user}`}>
          <AiOutlineTwitter />
        </a>
      </div>
    </div>
  );
};

export default Member;
