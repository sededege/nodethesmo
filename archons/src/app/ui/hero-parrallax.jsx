
"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const HeroParallax = ({products}) => {
  
  return (
    <div
      className="h-[100vh] py-40 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
    <Image src={'/logo.png'} width={100} height={100} className='absolute right-10 top-10 rounded-lg'/>
      <Header />
      
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-xl relative mx-auto py-20  px-4 w-full  left-0 top-0">
      <h1 className="text-2xl text-center old md:text-9xl font-bold text-black ">
       Archons
      </h1>
      <p className="max-w-2xl text-base text-center md:text-xl mt-8 text-black">
        We build beautiful products, <br></br>
        with the latest technologies and frameworks.<br></br>
        We are a team of passionate developers.
      </p>
    </div>
  );
};
