/* eslint-disable no-unreachable-loop */
/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace, MdModeEdit } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { AiOutlineArrowDown, AiOutlineArrowUp  } from "react-icons/ai";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import EmptyCart from "../img/emptyCart.svg";
import CartItem from "./CartItem";
import { saveOrder } from "../utils/firebaseFunctions";
import { useNavigate } from "react-router-dom";
import { send } from "emailjs-com";
import { envio, enviogratis } from "../variables/variables";

const CartContainer = () => {
  const [{ cartShow, cartItems, user, users }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);
  const [datos, setDatos] = useState(true);
  const [checkbox, setCheckbox] = useState("");
  const [pickup, setPickUp] = useState("");
  const [codigo, setCodigo] = useState("");
  const [notas, setNotas] = useState("");
  const url = "https://nodemoratest-e307c79d1de3.herokuapp.com";
  /* const url = 'https://d036-2800-a4-1439-3300-94bd-a7fa-a0f8-a6c0.sa.ngrok.io' */
  const codigos = ["FIOMORA10", "MORA10"];
  const [descuento, setDescuento] = useState("");
  const Swal = require("sweetalert2");
  const tallasfiltro = (a, b, c) => {
    return {
      id: c,
      size: a,
      unidades: b,
    };
  };
  /* console.log(cartItems.map(a => a)) */

  const [toSend, setToSend] = React.useState("");

  const variants = {
    open: {  bottom: 0, position: 'absolute', opacity: 100},
    closed: { bottom:(-450), position: 'absolute', },
  };

  const [isOpen, setIsOpen] = useState("closed");

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
  };
  console.log(notas);

  const mensaje = (a) => {
    return `  
    Retiro: ${pickup} \n
    Metodo: ${checkbox} \n
    producto: ${a.map((a) => a.title)} \n
    cantidad: ${a.map((a) => a.quantity)} \n
    talle: ${a.map((a) => a.size)} \n
    color: ${a.map((a) => a.color)} \n
    precio: ${a.map((a) => a.unit_price)} \n
    descuento: ${a.map((a) => a.unit_price)} \n
    total: ${a.descuento ? tot * a.descuento : tot},
    notas: ${notas}
      `;
  };
  useEffect(() => {
    if (codigos.indexOf(codigo) === -1) {
      const totalPrice = cartItems.reduce(function (accumulator, item) {
        return accumulator + item.unidades * item.precio;
      }, 0);
      setTot(totalPrice);
    }
    if (users && user) {
      setDatos(users.filter((a) => a.user === user.email));
    }
    const producto = cartItems.map((item) => ({
      id: item.item.id,
      title: item.item.name,
      description: item.item.descripcion,
      category_id: item.item.categoria,
      quantity: parseInt(item.unidades),
      currency_id: "UYU",
      unit_price: parseInt(item.precio),
      tallas: tallasfiltro(
        item.size,
        parseInt(item.unidades),
        item.item.id
      ),
      size: item.size,
      color: item.colorselected,
      idorden: `${Date.now()}`,
    }));
    setToSend({
      from_name: user && user.displayName,
      message: mensaje(producto),
      reply_to: "test",
    });
  }, [tot, flag, user, users, cartItems, checkbox, codigo, notas]);

  const onSubmit = () => {
    send("service_9022eik", "template_h8f2pjg", toSend, "6nMZvPwmx9KtZzOQm")
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
      })
      .catch((err) => {
        console.log("FAILED...", err);
      });
  };

  const checkout = () => {
    if (pickup === "envio" && checkbox === "efectivo") {
      Swal.fire(
        "Error!",
        "No puedes seleccionar envío y pago en efectivo juntos!",
        "error"
      );
    } else {
      if (pickup !== "" && checkbox !== "") {
        if (checkbox === "mercadopago") {
          mercadopago();
          onSubmit();
        } else if (checkbox === "efectivo") {
          efectivo();
          onSubmit();
          console.log(toSend);
        } else {
          transferencia();
          onSubmit();
        }
      } else {
        Swal.fire(
          "Error!",
          "Debes seleccionar un medio de pago y una forma de entrega!",
          "error"
        );
      }
    }
  };

  const promo = (e) => {
    setCodigo(e.target.value);
    if (codigos.indexOf(e.target.value) !== -1) {
      setTot(tot * 0.9);
      setDescuento(0.9);
    }
  };

  const efectivo = () => {
    const envio = {
      id: "1",
      title: "Envio",
      currency_id: "UYU",
      unit_price: tot > enviogratis ? 0 : envio,
      quantity: 1,
    };

    const producto = cartItems.map((item) => ({
      id: item.item.id,
      title: item.item.name,
      description: item.item.descripcion,
      category_id: item.item.categoria,
      quantity: parseInt(item.unidades),
      currency_id: "UYU",
      unit_price: parseInt(item.precio),
      tallas: tallasfiltro(
        item.size,
        parseInt(item.unidades),
        item.item.id
      ),
      size: item.size,
      color: item.colorselected,
      idorden: `${Date.now()}`,
    }));
    const dataa = {
      id: Date.now().toString(),
      creado: `${new Date()}`,
      items: pickup === "envio" ? [...producto, { ...envio }] : producto,
      status: "pendiente",
      metodo: checkbox,
      pickup,
      total: pickup === "envio" ? tot + 220 : tot,
      email: user.email,
      name: user && user.displayName,
      phone: users.filter((a) => a.user === user.email).cel,
      codigo: descuento,
      notas: notas,
    };

    saveOrder(dataa);

    const options = {
      method: "POST",
      body: JSON.stringify(dataa),
      headers: new Headers({ "content-type": "application/json" }),
    };

    fetch(`${url}/ordencreada`, options)
      .then((response) => response.text())
      .then((data) => {});

    navigate("/ordenes/gracias");
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: false,
    });
  };

  const transferencia = () => {
    const envio = {
      id: "1",
      title: "Envio",
      currency_id: "UYU",
      unit_price: tot > enviogratis ? 0 : envio,
      quantity: 1,
    };

    const producto = cartItems.map((item) => ({
      id: item.item.id,
      title: item.item.name,
      description: item.item.descripcion,
      category_id: item.item.categoria,
      quantity: parseInt(item.unidades),
      currency_id: "UYU",
      unit_price: parseInt(item.precio),
      tallas: tallasfiltro(
        item.size,
        parseInt(item.unidades),
        item.item.id
      ),
      size: item.size,
      color: item.colorselected,
      idorden: `${Date.now()}`,
      descuento: descuento,
    }));
    const dataa = {
      id: Date.now().toString(),
      creado: `${new Date()}`,
      items: pickup === "envio" ? [...producto, { ...envio }] : producto,
      status: "pendiente",
      metodo: checkbox,
      pickup,
      total: pickup === "envio" ? tot + 220 : tot,
      email: user.email,
      name: user && user.displayName,
      phone: users.filter((a) => a.user === user.email).cel,
      codigo: descuento,
      notas: notas,
    };
    saveOrder(dataa);
    const options = {
      method: "POST",
      body: JSON.stringify(dataa),
      headers: new Headers({ "content-type": "application/json" }),
    };

    fetch(`${url}/ordencreada`, options)
      .then((response) => response.text())
      .then((data) => {});
    navigate("/ordenes/graciastr");
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: false,
    });
  };

  const mercadopago = () => {
    const producto = cartItems.map((item) => ({
      id: item.item.id,
      title: item.item.name,
      description: item.item.descripcion,
      category_id: item.item.categoria,
      quantity: parseInt(item.unidades),
      currency_id: "UYU",
      unit_price:
        descuento !== ""
          ? parseInt(item.precio * descuento * 1.1)
          : parseInt(item.precio * 1.1),
      tallas: tallasfiltro(
        item.size,
        parseInt(item.unidades),
        item.item.id
      ),
      size: item.size,
      color: item.colorselected,
      idorden: `${Date.now()}`,
    }));

    const envio = {
      id: "1",
      title: "Envio",
      currency_id: "UYU",
      unit_price: tot > enviogratis ? 0 : envio,
      quantity: 1,
    };
    /*     pickup === 'envio' && producto.push(envio)
     */

    const producto2 = [...producto, { ...envio }];
    const dataa = {
      id: Date.now().toString(),
      creado: `${new Date()}`,
      items: pickup === "envio" ? producto2 : producto,
      status: "pendiente",
      total: tot,
      email: user.email,
      metodo: checkbox,
      pickup,
      codigo: descuento,
      notas: notas,
    };

    saveOrder(dataa);

    const options4 = {
      method: "POST",
      body: JSON.stringify(dataa),
      headers: new Headers({ "content-type": "application/json" }),
    };

    fetch(`${url}/ordencreada`, options4)
      .then((response) => response.text())
      .then((data) => {});

    const options = {
      method: "POST",
      body: JSON.stringify(producto),
      headers: new Headers({ "content-type": "application/json" }),
    };
    const options3 = {
      method: "POST",
      body: JSON.stringify(producto2),
      headers: new Headers({ "content-type": "application/json" }),
    };

    fetch(`${url}/checkout`, pickup === "envio" ? options3 : options)
      .then((response) => response.text())
      .then((data) => {
        window.location.assign(data);
      });
  };

  const comprar = async () => {
    !user &&
      dispatch({
        type: actionType.SET_LOGIN_SHOW,
        loginShow: true,
      });
  };

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
        damping: 40,
      }}
      className="fixed z-[120] top-0 right-0 w-[100vw] md:w-[26vw] h-screen bg-white drop-shadow-md flex flex-col"
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
        // eslint-disable-next-line multiline-ternary
        <div className="w-full h-full bg-white rounded-t-[2rem] flex flex-col">
          {/* cart Items section */}
          <div className="w-full h-[20vh] md:h-[40vh] px-6 py-4 flex flex-col gap-1 overflow-y-scroll scrollbar-none">
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
          <motion.div
            animate={ isOpen ? "open" : "closed"}
            transition={{ ease: "easeIn", duration: 0.4 }}
            variants={variants}
            className="w-full flex-1 bg-cartTotal overflow-auto rounded-t-xl flex flex-col items-center justify-evenly px-8 py-2 "
          >
            <div className="w-full  flex  flex-col">
            <div className="flex  justify-between">

         
              <p className="text-gray-400 text-lg">Medio de pago</p>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-800 text-sm mt-2 flex gap-2 items-center bg-white rounded-full px-2"
              >
              
                {
                  !isOpen ?  
                 <> <p>Expandir</p>
                  <AiOutlineArrowUp /> </> : 
                  
                  <><p>Cerrar</p>
                  <AiOutlineArrowDown/></>
                }
              
              </button>
              </div>
              {/* <div className="flex items-center rounded">
                <input
                  id="bordered-radio-1"
                  type="radio"
                  value="efectivo"
                  selected
                  onClick={() => setCheckbox("efectivo")}
                  name="bordered-radio"
                  className="w-4 h-4 text-booty bg-gray-100 border-gray-300 focus:ring-transparent  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="bordered-radio-1"
                  className="py-2 ml-2 w-full text-sm font-medium text-white"
                >
                  Efectivo
                </label>
              </div> */}
              <div className="flex items-center rounded">
                <input
                  id="bordered-radio-2"
                  type="radio"
                  value="asdd"
                  onClick={() => setCheckbox("mercadopago")}
                  name="bordered-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-transparent dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="bordered-radio-2"
                  className="py-2 ml-2 w-full text-sm font-medium text-white"
                >
                  Mercado pago (+10%){" "}
                </label>
              </div>
              <div className="flex items-center rounded">
                <input
                  id="bordered-radio-3"
                  type="radio"
                  value="asdd"
                  onClick={() => setCheckbox("transferencia")}
                  name="bordered-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-transparent  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="bordered-radio-3"
                  className="py-2 ml-2 w-full text-sm font-medium text-white"
                >
                  Transferencia Bancaria / Giro Abitab-RedPagos
                </label>
              </div>
            </div>

            {/* <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">$ 200</p>
            </div> */}
            <div className="w-full  flex  flex-col">
              <p className="text-gray-400 text-lg">Pick Up</p>
              <div className="flex items-center rounded">
                <input
                  id="bordered-radio-4"
                  type="radio"
                  value="efectivo"
                  selected
                  onClick={() => setPickUp("trescruces")}
                  name="bordered-radio1"
                  className="w-4 h-4 text-booty bg-gray-100 border-gray-300 focus:ring-transparent  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="bordered-radio-4"
                  className="py-2 ml-2 w-full text-sm font-medium text-white"
                >
                  Retiro en Tres Cruces
                </label>
              </div>
              {/* <div className="flex items-center rounded">
                <input id="bordered-radio-5" type="radio" value="asdd" onClick={() => setPickUp('malvin')} name="bordered-radio1" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-transparent dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="bordered-radio-5" className="py-2 ml-2 w-full text-sm font-medium text-white">Retiro en Malvin</label>
              </div> */}
              <div className="flex items-center rounded">
                <input
                  id="bordered-radio-6"
                  type="radio"
                  value="asdd"
                  onClick={() => setPickUp("envio")}
                  name="bordered-radio1"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-transparent  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                {/*                 <label for="bordered-radio-6" class="py-2 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Envío (Costo extra <span className='underline cursor-pointer'>Ver zonas</span>)</label>
                 */}{" "}
                <label
                  htmlFor="bordered-radio-6"
                  className="py-2 ml-2 w-full text-sm font-medium text-white"
                >
                  Envío (+${envio})
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <textarea
                className="w-full text-center p-2 rounded-lg h-[100px]"
                onChange={(e) => setNotas(e.target.value)}
                placeholder="Nota del pedido - (En caso de comprar un conjunto, especificar el talle de la parte superior)"
              />
              {codigos.indexOf(codigo) === -1 ? (
                <input
                  className="w-full text-center p-2 rounded-full"
                  onChange={(e) => promo(e)}
                  placeholder="Código promocional"
                />
              ) : (
                <input
                  disabled="disabled"
                  className="w-full text-center p-2 rounded-full"
                  value="10% de descuento aplicado!"
                  placeholder="10% de descuento aplicado!"
                />
              )}
            </div>
            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">${tot}</p>
            </div>

            {pickup === "envio" && (
              <div className="w-full flex items-center justify-between">
                <p className="text-gray-400 text-lg">Dirección</p>
              </div>
            )}
            {user && datos.length > 0 && datos.barrio !== ""
              ? datos.map(
                  (a, index) =>
                    pickup === "envio" && (
                      <div
                        key={index}
                        className="w-full flex items-center justify-between"
                      >
                        <div className=" w-full">
                          <p className="text-gray-400 font-bold">{a.alias}</p>
                          <p className="text-gray-400 text-lg">
                            {a.dire} {a.puerta}, {a.apto}, {a.barrio}
                          </p>
                        </div>
                        <div>
                          <div className="bg-yellow-200 p-2 rounded-full cursor-pointer  shadow-md">
                            {" "}
                            <MdModeEdit
                              onClick={() => abrirEdit()}
                              className=" text-textColor "
                            />
                          </div>
                        </div>
                      </div>
                    )
                )
              : pickup === "envio" && (
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    type="button"
                    onClick={() => abrirEdit()}
                    className="w-full p-2 rounded-full bg-gradient-to-tr from-gray-200 to-gray-400 text-textColor text-lg my-2 hover:shadow-lg"
                  >
                    Cargar direccion
                  </motion.button>
                )}
            {user ? (
              <motion.button
                onClick={() => checkout()}
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-purple-400 to-purple-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-purple-400 to-purple-600 text-gray-50 text-lg my-2 hover:shadow-lg"
                onClick={comprar}
              >
                Ingresa para comprar!
              </motion.button>
            )}
          </motion.div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl text-textColor font-semibold">
            Añade productos al carrito
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
