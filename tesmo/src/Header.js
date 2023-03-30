import React from "react";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import logo from "./assets/logo.jpg";
import me from "./assets/me.png";

const Header = ( { setNumber } ) => {
  const [menu, setMenu] = React.useState("Vision");

  

  const [scroll, setY] = React.useState(window.scrollY);

  const handleNavigation = React.useCallback(
    (e) => {
      const window = e.currentTarget;
      setY(window.scrollY);
    },
    [scroll]
  );

  const menunav = [
    {
      id: 0,
      name: "Vision",
    },
    {
      id: 1,
      name: "Our History",
    },
    {
      id: 3,
      name: "Team",
    },
    {
      id: 2,
      name: "Roadmap",
    },
  ];
  React.useEffect(() => {
    setY(window.scrollY);
    window.addEventListener("scroll", handleNavigation);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);

  const scrollTo = () => {};

  return (
    <nav
      className={`${
        scroll > 10 ? "top-0  border-b-4 border-pike fixed " : "top-0 absolute "
      } : w-full flex z-[100] justify-between bg-tesmo items-center px-20 h-20 transition-all ease-in 2s`}
    >
      {/*       <img src={logo} alt="logo" className="flex w-20" />
       */}{" "}
      {/* <p
        className="font-bold text-[1.5rem] text-white cursor-pointer"
      >
        PIKE STORE
      </p> */}
      <div className=" flex gap-4 items-center cursor-pointer">
        <a href="https://magiceden.io/marketplace/tesmophoria">
          <img className="w-8 h-8 object-contain" src={me} alt="me" />
        </a>
        <a href="https://twitter.com/thesmophoria_">
          <AiOutlineTwitter className="text-[30px] text-white  hover:text-sky-500" />
        </a>
        <a href="https://discord.com/invite/tesmophoria">
          <FaDiscord className="text-[30px] text-white hover:text-purple-500" />
        </a>
      </div>
      <img
        src={logo}
        alt="logo"
        className="w-24 mt-20 rounded-full fixed left-[calc(50vw-48px)]"
      />
      <div className="flex gap-4 mr-6">
        <ul className="menu flex gap-4 text-right text-pike2 cursor-pointer text-[1.3rem]">
          {menunav.map((a,index) => (
            <li
              onClick={() => setNumber(index)}
              /* onClick={() => setMenu(a.name)} */
              
              className={`${
                menu === a.name ? "text-yellow-400" : "text-white"
              } `}
            >
              {a.name}
       
            </li>
          ))}
        </ul>
        {/*  <div
          className="flex gap-2 items-center relative "
        >         
          <AiOutlineShoppingCart className="flex z-100 cursor-pointer text-[1.8rem] text-red-500" />
        </div> */}
      </div>
    </nav>
  );
};

export default Header;
