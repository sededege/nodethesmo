"use client";
import { HeroParallaxDemo } from "./pages/home";
import { useParallax } from "react-scroll-parallax";
import { useRef, useEffect, useState } from "react";

const Header = ({ handleClickdiv1, handleClickdiv2, handleClickdiv3 }) => {
  return (
    <header className="fixed z-[100] h-[100vh] border-2 w-full">
      <nav className="flex absolute left-6 bottom-6 gap-6 cursor-pointer">
        <button
          className="hover:border-b-2 border-b-2 border-slate-800 old text-2xl"
          onClick={handleClickdiv1}
        >
          home
        </button>
        <button
          className="cursor-pointer old text-2xl"
          onClick={handleClickdiv2}
        >
          art
        </button>
        <button
          className="cursor-pointer old text-2xl"
          onClick={handleClickdiv3}
        >
          about
        </button>
      </nav>
    </header>
  );
};

export default function Home() {
/*   const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
 */
  const div1ref = useRef(null);
  const div2ref = useRef(null);
  const div3ref = useRef(null);

  const handleClickdiv1 = () => {
    div1ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleClickdiv2 = () => {
    div2ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleClickdiv3 = () => {
    div3ref.current?.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <main className="h-[300vh]">
      <Header
        handleClickdiv1={handleClickdiv1}
        handleClickdiv2={handleClickdiv2}
        handleClickdiv3={handleClickdiv3}
      />
      <div ref={div1ref} className="border-2 border-blue-400 h-[100vh] top-[0]">
        <HeroParallaxDemo />
      </div>

      <div
        ref={div2ref}
        className="border-2 border-red-400 h-[100vh] top-[100vh]"
      ></div>
      <div
        ref={div3ref}
        className="border-2 border-green-400 h-[100vh] top-[200vh]"
      ></div>
    </main>
  );
}
