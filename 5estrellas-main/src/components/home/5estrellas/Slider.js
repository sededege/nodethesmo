import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import banner1 from "./assets/summer2.jpg";
import {IoMdArrowDropleft,IoMdArrowDropright} from 'react-icons/io'
import banner2 from './assets/3.png'
import banner3 from './assets/4.png'
const Slider = () => {
  return (
    <>
      <Carousel
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        /* autoPlay={true} */
        interval={5000}
        showArrows={true}
        renderArrowPrev={(clickHandler, hasPrev) => {
          return (
            <div
              className={`${
                hasPrev ? "absolute" : "hidden"
              } md:top-0 top-[10vh] bottom-0 left-0 flex justify-center items-center  p-3 hover:opacity-80 cursor-pointer z-20`}
              onClick={clickHandler}
            >
              <IoMdArrowDropleft className="w-9 h-9 text-white fill-black" />
            </div>
          );
        }}
        renderArrowNext={(clickHandler, hasNext) => {
          return (
            <div
              className={`${
                hasNext ? "absolute" : "hidden"
              } md:top-0 top-[10vh] bottom-0 right-0 flex justify-center items-center  md:p-3 hover:opacity-80 cursor-pointer z-20`}
              onClick={clickHandler}
            >
              <IoMdArrowDropright className="w-9 h-9  fill-black" />
            </div>
          );
        }}
      >
   
        <div className="  md:h-full rounded-lg mb-4 cursor-pointer relative pt-[10vh] md:pt-0 shadow-xl">
{/*           <button className="absolute bottom-20 left-[20%] bg-black text-white py-2 px-4 cursor-pointer rounded-lg">Ver productos</button>
 */}          <img src={banner2} className="h-[200px] md:h-full rounded-lg object-contain md:object-cover shadow-lg"/>
        </div>
        <div className="  md:h-full rounded-lg mb-4 cursor-pointer relative pt-[10vh] md:pt-0 shadow-xl">
{/*           <button className="absolute bottom-20 left-[20%] bg-black text-white py-2 px-4 cursor-pointer rounded-lg">Ver productos</button>
 */}          <img src={banner3} className="h-[200px] md:h-full rounded-lg object-contain md:object-cover shadow-lg"/>
        </div>
      </Carousel>
    </>
  );
};

export default Slider;
