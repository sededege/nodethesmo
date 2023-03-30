import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import EmptyCart from "../img/emptyCart.svg";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

const CartContainer = () => {
  const [{ cartShow, cartItems }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);
  const Swal = require('sweetalert2')

  const navigate = useNavigate();

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };
  const abrirEdit = () => {
    dispatch({
      type: actionType.SET_EDIT_SHOW,
      editShow: true,
    });
  }
  useEffect(() => {

     

      let totalPrice = cartItems.reduce(function (accumulator, item) {
        return accumulator + item[0].unidades * (item[0].item.attributes.price*item[0].item.attributes.qty);
      }, 0);
      setTot(Math.round(totalPrice));
    
 



  }, [tot,flag, cartItems]);






  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  return (
    <motion.div
      key="1"
      initial={{ opacity: 0, x: 500 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 500 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 40
      }}


      className=" fixed md:w-[30vw] drop-shadow-lg top-0 right-0 w-[100vw] h-full z-[1000] bg-white flex flex-col"
    >
      <div className="w-full  z-[10] flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Carrito</p>

        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base"
          onClick={clearCart}
        >
          Borrar <RiRefreshFill />
        </motion.p>
      </div>

      {/* bottom section */}
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-white rounded-t-[2rem] flex flex-col">
          {/* cart Items section */}
          <div className="w-full h-[70vh] md:h-42 px-6 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* cart Item */}
            {cartItems &&
              cartItems.length > 0 &&
              cartItems.map((item, index) => (
                <CartItem
                  key={index}
                  item={item}
                  setFlag={setFlag}
                  flag={flag}
                />
              ))}
          </div>

          {/* cart total section */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem]  flex flex-col items-center justify-evenly px-8">

           
           
            <div className="w-full border-b border-gray-600"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-pike3 text-xl font-semibold">Total</p>
              <p className="text-pike3 text-xl font-semibold">
                ${tot}
              </p>

            </div>

        
      
              <motion.button
               /*  onClick={() => checkout()} */
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr bg-pike text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Realizar pedido
              </motion.button>
            
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-10">
          <img src={EmptyCart} className="w-full object-contain" alt="add" />
          <p className="text-xl text-textColor font-semibold">
            Añade productos al carrito
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
