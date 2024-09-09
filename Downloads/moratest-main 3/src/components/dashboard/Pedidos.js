/* eslint-disable array-callback-return */
/* eslint-disable no-return-assign */
/* eslint-disable react/no-unknown-property */
import React, { Fragment } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import {
  borrarorder,
  getAllOrders,
  getAllUsuarios,
  updatePagado,
} from "../utils/firebaseFunctions";
import {
  RiMoneyDollarCircleFill,
  RiBarChart2Fill,
  RiInboxUnarchiveFill,
} from "react-icons/ri";
import { useNavigate } from "react-router";
import { FiEye } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaBox } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { direccionentrega } from "../variables/variables";
/* import Listas from './Listas' */
const Pedidos = () => {
  const [{ orders, users }, dispatch] = useStateValue();
  const [expanded, setExpanded] = React.useState(false);
  const history = useNavigate();
  React.useEffect(() => {
    getAllOrders().then((data) => {
      dispatch({
        type: actionType.SET_ORDERS,
        orders: data,
      });
    });
    dispatch({
      type: actionType.SET_DONDE_ESTOY,
      dondeestoy: "Dashboard",
    });
    getAllUsuarios().then((data) => {
      dispatch({
        type: actionType.SET_USERS,
        users: data,
      });
    });
  }, []);

  const prueba = (b,d) => {

    const total = b.reduce(
      (prevValue, currentValue) => prevValue + currentValue.unit_price,
      0
    );

    return d ? total*d : total;
  };

  const datos = (e,b,c) => {
    const datosmostrar = users.filter((a) => a.user === e);
    return (
      <div>
        <ul className="text-[1rem] text-black font-normal">
          <li>
            <span className="font-bold">Alias:</span>{" "}
            {datosmostrar[0]?.alias}
          </li>
          <li>
            <span className="font-bold">Email:</span> {datosmostrar[0]?.user}
          </li>
          <li className="flex items-center gap-2 text-black w-full">
            <p>
              <span className="font-semibold">Celular:</span>{" "}
              {datosmostrar[0]?.cel}
            </p>
            <motion.div whileTap={{ scale: 0.75 }}>
              <a href={`https://wa.me/+598${datosmostrar[0]?.cel}`}>
                <BsWhatsapp className=" w-6 h-6 text-[0.8rem] text-green-400" />
              </a>
            </motion.div>
          </li>
          <li>
            <span className="font-semibold">Direccion:</span>{" "}
            {datosmostrar[0]?.dire}
          </li>
          <li>
            <span className="font-semibold">Puerta:</span>{" "}
            {datosmostrar[0]?.puerta}
          </li>
          <li>
            <span className="font-semibold">Barrio:</span>{" "}
            {datosmostrar[0]?.barrio}
          </li>
          <li>
            <span className="font-semibold">Apto:</span> {datosmostrar[0]?.apto}
          </li>
          <li>
            <span className="font-semibold">Notas:</span> {b}
          </li>
          <li>
            <span className="font-semibold">Descuento:</span> {100-(c*100)}%
          </li>
        </ul>
      </div>
    );
  };

  const pickup = (a) => {
    if (a === "trescruces") {
      return <p>{direccionentrega}</p>;
    } else {
      return <p>Envio</p>;
    }
  };
  const metodo = (a) => {
    if (a === "transferencia") {
      return (
        <p>
          Florencia Moraes<br></br>
          Banco ITAU 3614214 <br></br>
          Giro Abitab - Redpagos: 5.196.099-4
        </p>
      );
    } else if (a === "efectivo") {
      return <p>Efectivo en el lugar</p>;
    } else {
      return <p> Mercado Pago</p>;
    }
  };
  const colores = (a) => {
    if (a === "pendiente") {
      return "bg-yellow-400";
    }
    if (a === "Pagado") {
      return "bg-green-400";
    }
    if (a === "error") {
      return "bg-red-400";
    }
  };
  const navegar = (a) => {
    history(`/detalle/${a}`);
  };

  const pagado = (e) => {
    const dataa = {
      id: e,
      status: "Pagado",
    };
    updatePagado(dataa);
    getAllOrders().then((data) => {
      dispatch({
        type: actionType.SET_ORDERS,
        orders: data,
      });
    });
  };
  const pendiente = (e) => {
    const dataa = {
      id: e,
      status: "pendiente",
    };
    updatePagado(dataa);
    getAllOrders().then((data) => {
      dispatch({
        type: actionType.SET_ORDERS,
        orders: data,
      });
    });
  };
  const eliminarorder = (e) => {
    borrarorder(e);
    getAllOrders().then((data) => {
      dispatch({
        type: actionType.SET_ORDERS,
        orders: data,
      });
    });
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [mes, setMes] = React.useState(
    new Date().toLocaleDateString().split("/", 2)[1]
  );

  const Listas = (a) => {
    const pormes =
      a.lista &&
      a.lista.filter(
        (a) => new Date(a.creado).toLocaleDateString().split("/", 2)[1] === mes
      );

      const [open, setOpen] = React.useState(2000);
 
      const handleOpen = (value) => {
        setOpen(open === value ? 2000 : value);
      };
     
     
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
const customAnimation = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};

    return (
      <>
        {orders && pormes !== "" ? (
          pormes.map((a, index) => (
            <Fragment>
            <Accordion className="px-4 flex flex-col gap-4" open={open === index} animate={customAnimation}>
            <AccordionHeader onClick={() => handleOpen(index)}>
       {/*      <motion.div whileTap={{ scale: 0.75 }}>
                      <button
                        onClick={() => eliminarorder(a.id)}
                        className="bg-red-500 font-bold p-2  rounded-full text-white "
                      >
                      <DeleteForeverOutlined/>
                      </button>
                    </motion.div> */}
                <p className="flex items-center px-4">
                  <span
                    className={`${colores(
                      a.status
                    )} h-4 w-4 rounded-full flex `}
                  ></span>
                </p>

                {a.pickup === "envio" && (
                  <p className="flex items-center px-4">
                    <FaBox className=" text-booty " />
                  </p>
                )}
                <p className="flex px-4 items-center">
                  Total:{" "}
                  <span className="font-normal">
                    {Math.round(prueba(a.items, a.codigo))}
                  </span>
                </p>
                <p className="px-4 text-[0.9rem]">
                  {new Date(a.creado)
                    .toLocaleDateString()
                    .split("/", 2)
                    .join("/")}{" "}
                  {new Date(a.creado)
                    .toLocaleTimeString()
                    .split(":", 2)
                    .join(":")}
                </p>
              </AccordionHeader>
              <AccordionBody>
                <div
                 className="shadow-md p-2"
                >
                  <div className="flex flex-col gap-4 ">
                    {a.items.map((b, index) => (
                      <div
                        key={index}
                        className="flex  bg-white shadow-md rounded-lg h-full p-4  gap-2 relative "
                      >
                        <div className="flex flex-col font-bold text-black ">
                          <p>{b.title}</p>
                          <p>Talle: {b.size}</p>
                          <p>Color: {b.color}</p>
                        </div>

                        <div className="absolute right-3 items-center flex flex-col gap-1">
                          <FiEye
                            className="text-center font-bold text-[1.2rem] text-booty"
                            onClick={() => navegar(b.id)}
                          />

                          <p>Qty: {b.quantity}</p>
                        </div>
                        <div className="absolute right-3 bottom-3">
                          <p className="font-semibold">${b.unit_price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex   rounded-lg h-full p-4  gap-2 relative ">
                    <div
                      className=" absolute right-3"
                      sx={{
                        width: "55%",
                        fontFamily: "Poppins",
                        fontSize: "bold",
                      }}
                    >
                      Total:{" "}
                      <span className="font-bold">{prueba(a.items, a.codigo)}</span>
                    </div>
                  </div>

                  <div className=" p-4 ">{<p> {datos(a.email, a.notas, a.codigo)}</p>}</div>
                  <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-center w-full text-center mt-5">
                    <p
                      sx={{
                        width: "55%",
                        fontFamily: "Poppins",
                        fontSize: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Pick up:{" "}
                      <span className="font-bold text-[14px]">
                        {pickup(a.pickup)}
                      </span>
                    </p>
                    <p
                      sx={{
                        width: "55%",
                        fontFamily: "Poppins",
                        fontSize: "bold",
                      }}
                    >
                      Metodo:{" "}
                      <span className="font-bold text-[14px]">
                        {metodo(a.metodo)}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-4 justify-center p-5">
                    <motion.div whileTap={{ scale: 0.75 }}>
                      <button
                        onClick={() => eliminarorder(a.id)}
                        className="bg-red-500 font-bold py-2 px-4 rounded-lg text-white "
                      >
                        Borrar
                      </button>
                    </motion.div>
                    <motion.div whileTap={{ scale: 0.75 }}>
                      {a.status === "pendiente" ? (
                        <button
                          onClick={() => pagado(a.id)}
                          value={a.id}
                          className="bg-green-300 font-bold py-2 px-4 rounded-lg text-white"
                        >
                          Pagado
                        </button>
                      ) : (
                        <button
                          onClick={() => pendiente(a.id)}
                          value={a.id}
                          className="bg-yellow-300 text-black font-bold py-2 px-4 rounded-lg "
                        >
                          Pendiente
                        </button>
                      )}
                    </motion.div>
                  </div>
                </div>
              </AccordionBody>
            </Accordion>
            </Fragment>
          ))
        ) : (
          <p className="text-gray-400 justify-center w-full text-center font-bold p-2 rounded-lg ">
            No hay pedidos aún!
          </p>
        )}
      </>
    );
  };

  const pormes =
    orders &&
    orders.filter(
      (a) => new Date(a.creado).toLocaleDateString().split("/", 2)[1] === mes
    );
  /*  const ordersfilter = (a) => {
        dispatch({
            type: actionType.SET_ORDERS,
            orders: orders.filter(a => new Date(a.creado).toLocaleDateString().split("/", 2).join('/') === new Date(value).toLocaleDateString().split("/", 2).join('/'))
        })
    } */

  let initialValue = 0;
  let initialStock = 0;

  const ventas = pormes && pormes.filter((a) => a.status === "Pagado");

  pormes &&
    ventas.map((a) =>
      a.items.map((b) => {
        if (b.unit_price !== 200) {
          initialValue += b.unit_price;
        }
      })
    );

  pormes &&
    ventas.map((a) =>
      a.items.map((b) => {
        if (b.unit_price !== 200) {
          initialStock += b.quantity;
        }
      })
    );


  return (
    <div className="pb-20 mt-[10vh]  md:ml-[16vw]  bg-white  md:w-[80vw] rounded-lg py-10  ">
      {/*   <div>
                <Calendar onClick={ordersfilter()} onChange={onChange} value={value} />
            </div> */}
      <div className="flex gap-6 items-center justify-between bg-white">
        <div className="rounded-2xl drop-shadow-md h-[20vh] w-full items-center justify-center flex bg-[#937DC2] opacity-80">
          <RiBarChart2Fill className="text-[7rem] opacity-2 text-gray-800" />
          <div className="flex flex-col items-center justify-center">
            <p className="text-[1rem] font-semibold text-gray-800">
              {" "}
              Ventas sin envíos
            </p>
            <p className="text-[2rem] font-semibold text-gray-800">
              $ {initialValue}
            </p>
          </div>
        </div>
        <div className="rounded-2xl drop-shadow-md h-[20vh] w-full items-center justify-center flex gap-8 bg-[#FFABE1] opacity-80">
          <RiMoneyDollarCircleFill className="text-[7rem] opacity-2 text-gray-800" />
          <div className="flex flex-col items-center justify-center">
            <p className="text-[1rem] font-semibold text-gray-800">
              {" "}
              Ganancias
            </p>
            <p className="text-[2rem] font-semibold text-gray-800"> </p>
          </div>
        </div>
        <div className="rounded-2xl drop-shadow-md h-[20vh] w-full items-center justify-center flex bg-[#FFE6F7] opacity-80">
          <RiInboxUnarchiveFill className="text-[7rem] opacity-2 text-gray-800" />
          <div className="flex flex-col items-center justify-center">
            <p className="text-[1rem] font-semibold text-gray-800"> Stock</p>
            <p className="text-[2rem] font-semibold text-gray-800">
              {" "}
              - {initialStock}
            </p>
          </div>
        </div>
      </div>

      <h1 className="text-booty text-center font-bold p-4 text-[1rem] ">Pedidos</h1>
      <div className="justify-center flex">
        <select
          value={mes}
          onChange={(e) => setMes(e.target.value)}
          name="month"
          className="w-[500px] flex justify-center bg-gray-200 p-2 rounded-lg mb-10 font-semibold "
        >
          <option value="1">Enero</option>
          <option value="2">Febrero</option>
          <option value="3">Marzo</option>
          <option value="4">Abril</option>
          <option value="5">Mayo</option>
          <option value="6">Junio</option>
          <option value="7">Julio</option>
          <option value="8">Agosto</option>
          <option value="9">Septiembre</option>
          <option value="10">Octubre</option>
          <option value="11">Noviembre</option>
          <option value="12">Diciembre</option>
        </select>
      </div>
      <div className=" flex-col grid md:grid-cols-3 gap-2 bg-white ">
        <div className=" flex flex-col text-center gap-4">
          <p>
            Mercado Pago (
            {pormes && pormes.filter((a) => a.metodo === "mercadopago").length})
          </p>
          {orders && (
            <Listas
              lista={pormes && pormes.filter((a) => a.metodo === 'mercadopago')}
            />
          )}
        </div>
        <div className="flex flex-col text-center gap-4">
          <p>
            Efectivo (
            {pormes && pormes.filter((a) => a.metodo === "efectivo").length})
          </p>
           {pormes && (
            <Listas lista={pormes.filter((a) => a.metodo === 'efectivo')} />
          )}
        </div>
        <div className="flex flex-col text-center gap-4">
          <p>
            Transferencia (
            {pormes &&
              pormes.filter((a) => a.metodo === "transferencia").length}
            )
          </p>
       
          {pormes && (
            <Listas
            
              lista={
               pormes && pormes.filter((a) => a.metodo === "transferencia")
              }
            />
          )}
   
        </div>
      </div>
    </div>
  );
};

export default Pedidos;
