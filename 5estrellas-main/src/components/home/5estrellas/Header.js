import React from "react";
import logo from "./assets/logo.jpg";
import {
  AiOutlineShoppingCart,
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlineMenu,
} from "react-icons/ai";
import { useNavigate } from "react-router";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import Logo from './assets/logo.png'


const Header = () => {
  const [{ cartItems, cartShow }, dispatch] = useStateValue();
  const [menu, setMenu] = React.useState("Inicio");
  const [menuopen, setMenuopen] = React.useState(false);
  const navigate = useNavigate();
  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

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
      name: "Inicio",
    },
    {
      id: 1,
      name: "Catálogo",
    },
    {
      id: 2,
      name: "Sobre Nosotros",
    },
    {
      id: 3,
      name: "Contacto",
    },
  ];

  const Burgermenu = () => {
    return (
      <div className="h-[100vh] bg-white w-[100vw] fixed top-0 left-0 z-[2000] ">
        <AiOutlineClose
          onClick={() => setMenuopen(false)}
          className="absolute right-10 top-10 font-bold text-[2rem]"
        />
        {
          <ul className="flex flex-col gap-4 text-right text-pike2 cursor-pointer w-full h-full  items-center justify-center ">
            {menunav.map((a) => (
              <li
                onClick={() => navegar(a.name)}
                className={`${
                  menu === a.name
                    ? "text-pike font-bold"
                    : "text-pike2 font-medium"
                } `}
              >
                {a.name}
              </li>
            ))}
          </ul>
        }
      </div>
    );
  };
  React.useEffect(() => {
    setY(window.scrollY);
    window.addEventListener("scroll", handleNavigation);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);

  const scrollTo = () => {};

  const navegar = (a) => {
    setMenu(a);

    if (a === "Inicio") {
      navigate("/", { state: "inicio" });
    }
    if (a === "Catálogo") {
      navigate("/catalogo", { state: "catalogo" });
    }
    if (a === "Sobre Nosotros") {
      navigate("/SobreNosotros");
    }
    if (a === "Contacto") {
      navigate("/Contacto");
    }
  };
  return (
    <>
      {/* DESKTOP */}
      <nav
        className={`${
          scroll > 10
            ? "top-0  border-b-4 border-pike fixed "
            : "top-10 absolute "
        } w-full hidden md:flex z-[100] bg-white justify-between items-center px-40 2xl:px-60 h-30 transition-all ease-in 2s`}
      >
      
        <img  onClick={() => navigate("/")} src={Logo} alt='logo' className="w-[200px] "/>
        <div className="flex gap-4 mr-6">
          <ul className="flex gap-4 text-right text-pike2 cursor-pointer">
            {menunav.map((a) => (
              <li
                onClick={() => navegar(a.name)}
                className={`${
                  menu === a.name
                    ? "text-pike font-bold"
                    : "text-gray-500 font-medium"
                } `}
              >
                {a.name}
              </li>
            ))}
          </ul>
          <div
            onClick={() => showCart()}
            className="flex gap-2 items-center relative "
          >
            <p className="absolute left-8 bottom-1 bg-red-500 w-5 h-5 text-[12px] items-center flex justify-center text-white rounded-full ">
              {cartItems.length}
            </p>
            <AiOutlineShoppingCart className="flex z-100 cursor-pointer text-[1.8rem] text-gray-500" />
          </div>
        </div>
      </nav>

      {/* MOBILE */}
      <nav
         className={`${
          scroll > 10
            ? "top-0  border-b-4 border-pike fixed "
            : "top-0 absolute "
        } fixed w-full flex md:hidden z-[100] bg-white justify-between items-center px-4 h-16 transition-all ease-in 2s`}
      >
               <img  onClick={() => navigate("/")} src={Logo} alt='logo' className="w-[180px] relative right-2"/>

        {menuopen && <Burgermenu />}
        <div className="flex gap-2">
          <div
            onClick={() => showCart()}
            className="flex items-center relative "
          >
            {cartItems.length > 0 && (
              <p className="absolute  bottom-4 left-3 bg-red-500 w-5 h-5 text-[12px] items-center flex justify-center text-white rounded-full ">
                {cartItems.length}
              </p>
            )}

            <AiOutlineShoppingCart className="flex z-100 cursor-pointer text-[1.8rem] text-gray-500" />
          </div>
          <AiOutlineMenu
            onClick={() => setMenuopen(true)}
            className="flex z-100 cursor-pointer text-[1.8rem] text-gray-500"
          />
        </div>
      </nav>
    </>
  );
};

export default Header;
