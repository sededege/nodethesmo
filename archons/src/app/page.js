// Photos from https://citizenofnowhe.re/lines-of-the-city
"use client";
import "./styles.css";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import { FaDiscord, FaSquareXTwitter } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";

function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function Image1({ id }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 100);

  return (
    <section>
      <div
        className="overlayContainer h-[50vh] w-[100vw] md:h-[100vh] md:w-[50vw] items-center justify-center flex "
        ref={ref}
      >
       
      </div>
      {/*       <motion.h2 style={{ y }}>{`#00${id}`}</motion.h2>
       */}{" "}
    </section>
  );
}

function Image2({ id }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 100);
  return (
    <section className=" z-[2000000]">
      <div
        ref={ref}
        className="container flex gap-4  h-full items-center w-full px-6 absolute "
      >
        {
         [1, 2, 3, 4, 5].map(a => (
          <motion.img
            key={a}  
            whileHover={{ scale: 1.1 }}
            src={`/${a}.png`}
            className="cursor-pointer hover:opacity-60 object-cover rounded-lg h-[400px]"
            alt={`A London skyscraper ${a}`}
          />
        ))
        }
      
        
      </div>
    </section>
  );
}

function Image3({ id }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 100);

  return (
    <section>
      <div ref={ref} className="md:w-1/4 h-[100vh] w-full  items-center justify-center flex flex-col">
        <div className="text-4xl old text-black text-center mb-4">
          What is Archons?
        </div>
        <p className="text-xl old text-black text-center">
          
Months of meticulous design and curation have been spent to create some of the finest art available as a Digital Collectible on Solana. A predominantly female collection, Archons is unlike any other in the NFT space with its unique appeal to the collectors of web3. Aside from fantastic art that will catch the eye of any observer, we also strive to bring value to our community of over a year in the making. Our thesis; utilizing the brand of Archons to create avenues that will return value to our native web3 users.
        </p>
        <button className=" hover:bg-white hover:text-black mt-4 w-full bg-black p-2 old text-xl rounded-lg cursor-pointer">
          Join us
        </button>
      </div>
    </section>
  );
}

const Header = ({ handleScrollTo }) => {
  const [select, setSelect] = useState("home");

  return (
    <header className="fixed z-[990000009] pointer-events-none h-[100vh]  w-full">
      <nav className="flex absolute right-6 pointer-events-auto top-6 gap-4 cursor-pointer">
        {/* <buttonut
          className="hover:border-b-2 flex gap-2 items-center  rounded-lg px-2 border-slate-800 old text-2xl text-black"
          onClick={() => {
            setSelect('home')
          }}
        >
          <FaShoppingCart className="text-2sm" /> buy an anchor
        </buttonut> */}
        <a
          href="https://twitter.com/solarchons"
          className=" old text-2xl text-black hover:text-white transition-all 1s cursor-pointer"
          onClick={() => handleScrollTo(2)}
        >
          <FaSquareXTwitter />
        </a>
        <a
          href="https://discord.gg/DM35wu5wn8"
          className=" old text-2xl text-black hover:text-white transition-all 1s cursor-pointer"
          onClick={() => handleScrollTo(2)}
        >
          <FaDiscord />
        </a>
      </nav>
      <nav className="flex absolute pointer-events-auto left-6 bottom-6 gap-6 cursor-pointer">
        <button
          className={`${
            select === "home"
              ? "border-b-2 border-slate-800"
              : " border-transparent hover:border-b-2 hover:border-slate-800"
          } box-content cursor-pointer old text-2xl text-black`}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth", // for smooth scrolling
            });
            setSelect("home");
          }}
        >
          home
        </button>
        <button
          className={`${
            select === "art"
              ? "border-b-2 border-slate-800"
              : " border-transparent hover:border-b-2 hover:border-slate-800"
          } box-content cursor-pointer old text-2xl text-black`}
          /*      onClick={() => setSelect("art")} */
          onClick={() => {
            window.scrollTo({
              top: 1000,
              behavior: "smooth", // for smooth scrolling
            });
            setSelect("art");
          }}
        >
          art
        </button>
        <button
          className={`${
            select === "about"
              ? "border-b-2 border-slate-800"
              : " border-transparent hover:border-b-2 hover:border-slate-800"
          } box-content cursor-pointer old text-2xl text-black`}
          onClick={() => {
            window.scrollTo({
              top: 2000,
              behavior: "smooth", // for smooth scrolling
            });
            setSelect("about");
          }}
        >
          about
        </button>
      </nav>
    </header>
  );
};

export default function Home() {
  return (
    <>
      <Header />
      <Image1 id={1} />
      <Image2 id={2} />
      <Image3 id={3} />
      {/*       <motion.div className="progress" style={{ scaleX }} />
       */}{" "}
    </>
  );
}
