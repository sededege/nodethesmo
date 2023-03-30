import React from "react";
import logo from "./assets/logo.jpg";
import {
  AiOutlineInfoCircle,
  AiOutlineWhatsApp,
  AiOutlineMail,
} from "react-icons/ai";

const Headerup2 = () => {
  return (
    <nav className="w-full hidden md:flex mb-20 items-center justify-end px-40 2xl:px-60 bg-pike p-2">
      <div className="flex gap-4 text-[0.8rem] ">
        <div className="flex items-center  ">
          <AiOutlineInfoCircle className="text-white" />

          <p className="text-white ml-2 ">
            Horarios de Lunes a Viernes - 8 a 18 hs / Av. Burgues 3610
          </p>
        </div>
        <div className="flex items-center">
          <AiOutlineWhatsApp className="text-white" />

          <p className="text-white ml-2">+598 99 613 252</p>
        </div>
        <div className="flex items-center">
          <AiOutlineMail className="text-white" />

          <p className="text-white ml-2">danielgventas@hotmail.com</p>
        </div>
      </div>
    </nav>
  );
};

export default Headerup2;
