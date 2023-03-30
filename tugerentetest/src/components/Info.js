import React from 'react'
import {
    AiFillLinkedin,
    AiOutlineGlobal,
    AiOutlineWhatsApp,
    AiOutlineMail,
  } from "react-icons/ai";
  
const Info = () => {
  return (
   <div>
     <h2 className="mt-16 text-center">
        Code Challenge by{" "}
        <span className="font-bold text-blue-500">Sebagtech</span>
      </h2>
      <div className="absolute bottom-10">
        <h2 className="text-center mb-4  text-gray-300">Conectemos!</h2>
        <div className="flex gap-10 ">
          <a href="https://www.linkedin.com/in/sebagtech/">
            {" "}
            <AiFillLinkedin className="text-[2rem] text-purple-800" />
          </a>
          <a href="http://sebag.tech">
            {" "}
            <AiOutlineGlobal className="text-[2rem] text-purple-800" />
          </a>
          <a href="https://wa.me/+59898412760">
            {" "}
            <AiOutlineWhatsApp className="text-[2rem] text-purple-800" />
          </a>
          <a href="mailto:sebagonzalez_97@hotmail.com">
            {" "}
            <AiOutlineMail className="text-[2rem] text-purple-800" />
          </a>
             
        </div>
      </div>
    </div>
  )
}

export default Info