/* eslint-disable eqeqeq */
/* eslint-disable react/no-unknown-property */
/* eslint-disable multiline-ternary */
import React, { useCallback, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useStateValue } from ".././context/StateProvider";
/* import Rating from '@mui/material/Rating';
 */

import Typography from "@mui/material/Typography";
import { actionType } from ".././context/reducer";
import Galeria2 from "./Galeria2";
import Galeria from "./Galeria";
import Comentarios from "./Comentarios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import mp from "../../components/img/mp.webp";
import efectivo from "../../components/img/efectivo.png";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { colors } from "../variables/variables";
import { AiFillBackward, AiOutlineArrowLeft } from "react-icons/ai";


const Detalle = () => {
  const location = useLocation();

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [{ products, cartItems }, dispatch] = useStateValue();
  const { productId } = useParams();
  const [thisProduct, setThisProduct] = React.useState([]);
  const [cantidad, setCantidad] = React.useState(1);
  const [filtrocolorselect, setFiltroColor] = React.useState("");
  const [selectedsize, setSelectedSize] = React.useState("S");
  const [items, setItems] = useState([]);
  const [toggle] = useState("Info");
  const history = useNavigate();

  const addtocart = useCallback(() => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [dispatch, items]);

  React.useEffect(() => {
    if (products && products.length > 0) {
      setThisProduct(
        products.find((prod) => String(prod.id) === String(productId))
      );
    }
    if (items && items.length > 0) {
      addtocart();
    }

    if (thisProduct != "") {
      if (location.state != null) {
        setFiltroColor(location.state);
      } else {
        setFiltroColor(thisProduct.color[0].name);
      }
    }

    dispatch({
      type: actionType.SET_DONDE_ESTOY,
      dondeestoy: "Detalle",
    });
  }, [products, items, dispatch, productId, thisProduct]);

  const pedido = (item) => {
    const itemselect = {
      id: Date.now(),
      item,
      colorselected: filtrocolorselect,
      size: selectedsize,
      unidades: cantidad,
      precio:
        thisProduct.oferta !== 0
          ? Math.round((thisProduct.precio * (100 - thisProduct.oferta)) / 100)
          : thisProduct.precio,
    };
  
    // Verificar si el item ya está en el carrito
    const itemExists = cartItems.find(
      (cartItem) =>
        cartItem.item === item &&
        cartItem.colorselected === filtrocolorselect &&
        cartItem.size === selectedsize
    );
  
    if (itemExists) {
      
      // Si el item ya está en el carrito, aumentar la cantidad
      const updatedItems = cartItems.map((cartItem) =>
        cartItem === itemExists
          ? { ...cartItem, unidades: cartItem.unidades + cantidad }
          : cartItem
      );
      setItems(updatedItems);
      console.log('El artículo ya está en el carrito, cantidad aumentada');
    } else {
      // Si el item no está en el carrito, agregarlo
      setItems([...cartItems, itemselect]);
      console.log('El artículo no estaba en el carrito, ha sido agregado');
    }

    toast.success(`x${cantidad} ${item.name} ${filtrocolorselect} ${selectedsize} agregado!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  
  

  React.useEffect(() => {
    setSelectedSize(
      thisProduct &&
        thisProduct.color &&
        thisProduct?.color[0].tallas?.filter((a) => a.stock > 0)[0].name
    );
  }, [thisProduct]);

  const colorselect = (color) => {
  return colors.filter(a => a.name === color)[0].color
  };
  

  function esLink(texto) {
    // Expresión regular para detectar enlaces HTTP/HTTPS
    const regex = /^(http|https):\/\/[^ "]+$/;

    // Comprueba si el texto coincide con la expresión regular
    return regex.test(texto);
  }
  return (
    <div>
      {/*     escritorio */}

      <div className="fixed">
        <div className=" md:flex hidden w-[100vw]  md:px-20 justify-start mt-[9vh] overflow-hidden">
          <nav className="flex p-2 mb-4  " aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <button
                  onClick={() => history(-1)}
                  className="inline-flex cursor-pointer items-center text-sm font-regular bg-gray-200 p-2 rounded-lg shadow-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                 <AiOutlineArrowLeft/>
                  Volver
                </button>
              </li>

              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="ml-1  text-sm font-medium text-booty md:ml-2 ">
                    Detalle de {thisProduct.name}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        {thisProduct ? (
          <div className="md:flex hidden   w-[100vw] h-full px-5 md:px-20 ">
            <div className="flex ">
              <Galeria
                images={thisProduct.color}
                filtrocolor={filtrocolorselect}
              />
            </div>

            <div className=" flex-col md:flex hidden w-full  items-center gap-6">
              {toggle === "Info" ? (
                <div className="   p-5 h-full ">
                  <div className="flex flex-col gap-6">
                    <div className="flex  gap-6">
                      <div className="flex">
                        <p className="font-semibold text-textColor text-[1.3rem]">
                          {thisProduct.name}{" "}
                        </p>
                      </div>
                      {thisProduct.oferta != 0 && (
                        <div className="flex gap-4 items-center">
                          <p className="text-[14px]  font-bold bg-booty px-2 rounded-lg text-white">
                            {thisProduct.oferta} % OFF
                          </p>
                        </div>
                      )}
                      {/* <div className='flex gap-4'>

                                                        <Rating

                                                            name="simple"
                                                            value={5}

                                                            sx={{
                                                                "& .MuiRating-iconFilled": {
                                                                    color: "#ffb381"
                                                                },
                                                                "& .MuiRating-iconHover": {
                                                                    color: "purple"
                                                                }
                                                            }}
                                                        /> <p className='font-light text-gray-400'>(5 reviews)</p>
                                                    </div> */}
                    </div>
                    <div className="flex flex-col gap-6 mr-10">
                      <p className="font-normal text-[0.9rem] text-gray-600">
                        {thisProduct.descripcion}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center gap-20 mt-10">
                      <div className=" flex flex-col gap-4">
                        <p className="font-bold text-textColor">Color</p>
                        <div className="flex gap-2 w-full">
                          {thisProduct.color &&
                            thisProduct.color.map((a) => (
                              <div
                                key={a.id}
                                onClick={() => setFiltroColor(a.name)}
                                className={` ${
                                  filtrocolorselect === a.name
                                    ? `border-2
                                             border-${colorselect(
                                               a.name
                                             )} rounded-full`
                                    : "border-2 border-white rounded-full"
                                } `}
                              >
                                <div
                                  className={` bg-${colorselect(
                                    a.name
                                  )} h-4 w-4 rounded-full border-2`}
                                ></div>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <p className="font-semibold text-textColor">Talle</p>
                        <div className="gap-4 flex">
                          {thisProduct.color && filtrocolorselect ? (
                            thisProduct.color
                              .filter((a) => a.name === filtrocolorselect)[0]
                              .tallas.map((a) =>
                                a.stock > 0 ? (
                                  <div
                                    key={a.id}
                                    onClick={() => setSelectedSize(a.name)}
                                    className={` ${
                                      selectedsize === a.name
                                        ? "text-white bg-booty"
                                        : "bg-white border-2"
                                    }  flex cursor-pointer w-8 h-8 rounded-lg  items-center justify-center transition-all ease-in-out `}
                                  >
                                    <p className="cursor-pointer  ">{a.name}</p>
                                  </div>
                                ) : (
                                  <div
                                    key={a.id}
                                    className="bg-gray-200 border-2 flex cursor-pointer w-8 h-8 rounded-lg  items-center justify-center"
                                  >
                                    <p className="cursor-pointer text-gray-400">
                                      {a.name}
                                    </p>
                                  </div>
                                )
                              )
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 ">
                        <p className="font-semibold text-textColor">Unidades</p>
                        <div className="flex  gap-4">
                          <motion.div
                            whileTap={{ scale: 0.75 }}
                            onClick={
                              cantidad > 1
                                ? () => setCantidad(cantidad - 1)
                                : undefined
                            }
                            className="flex cursor-pointer w-8 h-8 rounded-lg bg-booty items-center justify-center"
                          >
                            <p className="cursor-pointer text-white font-bold">
                              -
                            </p>
                          </motion.div>
                          <motion.div className="flex cursor-pointer w-8 h-8 rounded-lg border-2 items-center justify-center">
                            <p className="cursor-pointer">{cantidad}</p>
                          </motion.div>
                          <motion.div
                            whileTap={{ scale: 0.75 }}
                            onClick={() => setCantidad(cantidad + 1)}
                            className="flex cursor-pointer w-8 h-8 rounded-lg bg-booty items-center justify-center"
                          >
                            <p className="text-white font-bold">+</p>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <Accordion
                        sx={{
                          border: "none",
                          dropShadow: "none",
                          boxShadow: "none",
                          padding: 0,
                        }}
                        expanded={expanded === "panel1"}
                        onChange={handleChange("panel1")}
                      >
                        <AccordionSummary
                          sx={{
                            padding: 0,
                          }}
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography
                            sx={{
                              width: "55%",
                              fontFamily: "Poppins",
                              fontSize: "bold",
                            }}
                          >
                            Guía de talles
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div
                            onClick={() => alert(thisProduct?.caracteristicas)}
                          >
                            {esLink(thisProduct?.caracteristicas) ? (
                              <img
                                src={thisProduct?.caracteristicas}
                                alt="guia de talles"
                              />
                            ) : (
                              <p>No existe guía de talles</p>
                            )}
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                    {/*  <div className='flex flex-col gap-4'>
                                                    <Accordion
                                                        sx={{
                                                            border: 'none',
                                                            dropShadow: 'none',
                                                            boxShadow: 'none',
                                                            padding: 0,

                                                        }}
                                                        expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                                        <AccordionSummary
                                                            sx={{

                                                                padding: 0,

                                                            }}
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1bh-content"
                                                            id="panel1bh-header"
                                                        >
                                                            <Typography sx={{

                                                                width: '55%',
                                                                fontFamily: 'Poppins',
                                                                fontSize: 'bold'

                                                            }}>
                                                                Comentarios
                                                            </Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <div>
                                                                <Comentarios comentarios={thisProduct.comentarios} />
                                                            </div>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </div> */}
                    <div className="flex flex-col gap-4">
                      <Accordion
                        sx={{
                          border: "none",
                          dropShadow: "none",
                          boxShadow: "none",
                          padding: 0,
                        }}
                        expanded={expanded === "panel3"}
                        onChange={handleChange("panel3")}
                      >
                        <AccordionSummary
                          sx={{
                            padding: 0,
                          }}
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography
                            sx={{
                              width: "55%",
                              fontFamily: "Poppins",
                              fontSize: "bold",
                            }}
                          >
                            Medios de pago
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className="flex gap-4 items-center p-2">
                            <img alt="mercadopago" className="w-40 " src={mp} />
                            <img
                              alt="efectivo"
                              className="w-20 "
                              src={efectivo}
                            />
                            <img
                              alt="efectivo"
                              className="w-20 "
                              src="https://market.xperience.uy/system/images/inscriptions/redpagos.png"
                            />
                            <img
                              alt="efectivo"
                              className="w-20 "
                              src="https://upload.wikimedia.org/wikipedia/commons/1/1e/Abitab_S.A.png"
                            />
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                    {/*  <div className='flex flex-col gap-4 w-full px-10 '>
                                                <p className='font-bold text-textColor'>Caracteristicas</p>
                                                <ul className='font-light text-gray-400'>
                                                    <li className='font-light'>Tipo de estampado:<span> {thisProduct.estampado}</span></li>
                                                    <li className='font-light'>Longitud:<span> {thisProduct.longitud}</span></li>
                                                    <li className='font-light'>Material:<span> {thisProduct.material}</span></li>
                                                    <li className='font-light'>Color:<span> {filtrocolorselect}</span></li>
                                                    <li className='font-light'>Composicion:<span> {thisProduct.composicion}</span></li>
                                                    <li className='font-light'>Actividad:<span> {thisProduct.actividad}</span></li>
                                                </ul>
                                            </div> */}
                  </div>
                  <div className="flex items-center  fixed right-20 bottom-20 ">
                    <div className="flex gap-8 mt-10  items-center">
                      <div className="">
                        {thisProduct.oferta != 0 ? (
                          <div className="flex gap-4 items-center">
                            <p className="text-black text-[2rem]">
                              ${" "}
                              {Math.round(
                                (thisProduct.precio *
                                  (100 - thisProduct.oferta)) /
                                  100
                              )}
                            </p>
                            <p className="text-[1.2rem] text-gray-400 line-through">
                              $ {thisProduct.precio}
                            </p>
                          </div>
                        ) : (
                          <p className="text-black text-[2rem]">
                            $ {thisProduct.precio}
                          </p>
                        )}
                      </div>

                      {/*
                                                    <motion.div
                                                        whileTap={{ scale: 0.75 }}
                                                        className=' group  bg-gray-200 hover:bg-gray-400 p-3 items-center justify-center flex cursor-pointer rounded-lg'>
                                                        <button className='text-gray-400 group-hover:text-white'>Añadir a deseados</button>
                                                    </motion.div> */}
                      <motion.button
                        whileTap={{ scale: 0.75 }}
                        onClick={() => pedido(thisProduct)}
                        className=" group  font-bold bg-booty shadow-md p-3 justify-end flex cursor-pointer rounded-lg hover:bg-white hover:border-booty border-2 border-booty hover:border-2 "
                      >
                        <span className="text-white group-hover:text-booty ">
                          Añadir al carro
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              ) : (
                <Comentarios comentarios={thisProduct.comentarios} />
              )}
            </div>
          </div>
        ) : (
          <></>
        )}

        {/*           <p className='font-bold'>Reviews</p>
            <Comentarios comentarios={thisProduct.comentarios} /> */}
      </div>

      {/*   mobile */}
      <div className=" md:fixed md:hidden pb-10 ">
        <div className=" w-[100vw] flex  mt-[10vh] overflow-hidden ">
          {/*                 <p className=' font-light w-full ml-3 text-gray-500'>Detalle del producto</p>
           */}{" "}
          <nav className="flex p-2 ml-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <div
                  onClick={() => history("/Home")}
                  className="inline-flex items-center text-sm font-regular text-gray-300 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                  Home
                </div>
              </li>

              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-booty md:ml-2 ">
                    Detalle de producto
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        {thisProduct ? (
          <div className="flex flex-col md:hidden  w-[100vw] h-full ">
            <div className="flex ">
              <Galeria2
                images={thisProduct.color}
                filtrocolor={filtrocolorselect}
              />
            </div>

            {/*        <div className='flex items-center gap-4'>
                                <p onClick={() => setToggle('Info')} className={` ${toggle === 'Info' ? 'text-booty border-b-booty border-b-4 py-2  font-bold' : 'text-gray-400 py-2 font-bold'} `}>Informacion</p>
                                <p onClick={() => setToggle('Reviews')} className={` ${toggle === 'Reviews' ? 'text-booty border-b-booty border-b-4 py-2  font-bold' : 'text-gray-400 py-2 font-bold'} `}>Comentarios ({thisProduct.comentarios ? thisProduct.comentarios.length : console.log('no existe')})</p>

                            </div> */}

            {/* <div className='flex gap-4'>
                                <Rating
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    sx={{
                                        "& .MuiRating-iconFilled": {
                                            color: "#ffb381"
                                        },
                                        "& .MuiRating-iconHover": {
                                            color: "purple"
                                        }
                                    }}
                                />
                                <p className='font-light text-gray-400'>({thisProduct.comentarios ? thisProduct.comentarios.length : console.log('no existe')} reviews)</p>
                            </div> */}
            <div className="flex flex-col  items-center gap-6">
              {toggle === "Info" ? (
                <div className=" w-[100vw]  p-5 h-full ">
                  <div className="flex flex-col gap-6">
                    <div className="flex  gap-6">
                      <div className="flex">
                        <p className="font-semibold text-textColor text-[1.3rem]">
                          {thisProduct.name}{" "}
                        </p>
                      </div>

                      {/* <div className='flex gap-4'>

                                                        <Rating

                                                            name="simple"
                                                            value={5}

                                                            sx={{
                                                                "& .MuiRating-iconFilled": {
                                                                    color: "#ffb381"
                                                                },
                                                                "& .MuiRating-iconHover": {
                                                                    color: "purple"
                                                                }
                                                            }}
                                                        /> <p className='font-light text-gray-400'>(5 reviews)</p>
                                                    </div> */}
                    </div>
                    <div className="flex flex-col gap-6 mr-10">
                      <p className="font-normal text-[0.9rem] text-gray-400">
                        {thisProduct.descripcion}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="flex mt-4 justify-between items-center gap-4">
                      <div className=" flex flex-col gap-4">
                        <p className="font-semibold text-textColor ">Color</p>
                        <div className="flex gap-1">
                          {thisProduct.color &&
                            thisProduct.color.map((a) => (
                              <div
                                key={a.id}
                                onClick={() => setFiltroColor(a.name)}
                                className={` ${
                                  filtrocolorselect === a.name
                                    ? `border-2
                                             border-${colorselect(
                                               a.name
                                             )} rounded-full`
                                    : "border-2 border-white rounded-full"
                                } `}
                              >
                                <div
                                  className={` bg-${colorselect(
                                    a.name
                                  )} h-4 w-4 rounded-full border-2`}
                                ></div>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 ">
                        <p className="font-semibold text-textColor mt-3">
                          Talle
                        </p>
                        <div className="gap-2 flex">
                          {/*  {
                                                        thisProduct.talles ? thisProduct.talles.map(a => (
                                                            a.stock > 0 ?
                                                                <div onClick={() => setSelectedSize(a.name)} className={` ${selectedsize === a.name ? 'text-white bg-booty' : 'bg-white border-2'}  flex cursor-pointer w-8 h-8 rounded-lg  items-center justify-center`}>
                                                                    <p className='cursor-pointer  '>{a.name}</p>
                                                                </div> : <div className='bg-gray-200 border-2 flex cursor-pointer w-8 h-8 rounded-lg  items-center justify-center'>
                                                                    <p className='cursor-pointer text-gray-400'>{a.name}</p>
                                                                </div>

                                                        )) : <></>

                                                    } */}
                          {thisProduct.color && filtrocolorselect ? (
                            thisProduct.color
                              .filter((a) => a.name === filtrocolorselect)[0]
                              .tallas.map((a) =>
                                a.stock > 0 ? (
                                  <div
                                    key={a.id}
                                    onClick={() => setSelectedSize(a.name)}
                                    className={` ${
                                      selectedsize === a.name
                                        ? "text-white bg-booty"
                                        : "bg-white border-2"
                                    }  flex cursor-pointer w-8 h-8 rounded-lg  items-center justify-center`}
                                  >
                                    <p className="cursor-pointer  ">{a.name}</p>
                                  </div>
                                ) : (
                                  <div
                                    key={a.id}
                                    className="bg-gray-200 border-2 flex cursor-pointer w-8 h-8 rounded-lg  items-center justify-center"
                                  >
                                    <p className="cursor-pointer text-gray-400">
                                      {a.name}
                                    </p>
                                  </div>
                                )
                              )
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <p className="font-semibold text-textColor mt-3">
                          Unidades
                        </p>
                        <div className="flex  gap-2">
                          <div
                            onClick={
                              cantidad > 1
                                ? () => setCantidad(cantidad - 1)
                                : undefined
                            }
                            className="flex cursor-pointer w-8 h-8 rounded-lg bg-booty items-center justify-center"
                          >
                            <p className="cursor-pointer text-white font-bold">
                              -
                            </p>
                          </div>
                          <div className="flex cursor-pointer w-8 h-8 rounded-lg border-2 items-center justify-center">
                            <p className="cursor-pointer">{cantidad}</p>
                          </div>
                          <div
                            onClick={() => setCantidad(cantidad + 1)}
                            className="flex cursor-pointer w-8 h-8 rounded-lg bg-booty items-center justify-center"
                          >
                            <p className="text-white font-bold">+</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 ">
                      <Accordion
                        sx={{
                          border: "none",
                          dropShadow: "none",
                          boxShadow: "none",
                          padding: 0,
                        }}
                        expanded={expanded === "panel1"}
                        onChange={handleChange("panel1")}
                      >
                        <AccordionSummary
                          sx={{
                            padding: 0,
                          }}
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography
                            sx={{
                              width: "55%",
                              fontFamily: "Poppins",
                              fontSize: "bold",
                            }}
                          >
                            Guía de talles
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div
                            onClick={() => alert(thisProduct?.caracteristicas)}
                          >
                            {esLink(thisProduct?.caracteristicas) ? (
                              <img
                                src={thisProduct?.caracteristicas}
                                alt="guia de talles"
                              />
                            ) : (
                              <p>No existe guía de talles</p>
                            )}
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    </div>

                    <div className="flex flex-col gap-4">
                      <Accordion
                        sx={{
                          border: "none",
                          dropShadow: "none",
                          boxShadow: "none",
                          padding: 0,
                        }}
                        expanded={expanded === "panel3"}
                        onChange={handleChange("panel3")}
                      >
                        <AccordionSummary
                          sx={{
                            padding: 0,
                          }}
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography
                            sx={{
                              width: "55%",
                              fontFamily: "Poppins",
                              fontSize: "bold",
                            }}
                          >
                            Medios de pago
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className="flex overflow-auto gap-2 items-center ">
                            <img alt="mercadopago" className="w-40 " src={mp} />
                            <img
                              alt="efectivo"
                              className="w-20 "
                              src={efectivo}
                            />
                            <img
                              alt="efectivo"
                              className="w-20 "
                              src="https://market.xperience.uy/system/images/inscriptions/redpagos.png"
                            />
                            <img
                              alt="efectivo"
                              className="w-20 "
                              src="https://upload.wikimedia.org/wikipedia/commons/1/1e/Abitab_S.A.png"
                            />
                          </div>
                     
                        </AccordionDetails>
                      </Accordion>
                    </div>
                    {/*  <div className='flex flex-col gap-4 w-full px-10 '>
                                                <p className='font-bold text-textColor'>Caracteristicas</p>
                                                <ul className='font-light text-gray-400'>
                                                    <li className='font-light'>Tipo de estampado:<span> {thisProduct.estampado}</span></li>
                                                    <li className='font-light'>Longitud:<span> {thisProduct.longitud}</span></li>
                                                    <li className='font-light'>Material:<span> {thisProduct.material}</span></li>
                                                    <li className='font-light'>Color:<span> {filtrocolorselect}</span></li>
                                                    <li className='font-light'>Composicion:<span> {thisProduct.composicion}</span></li>
                                                    <li className='font-light'>Actividad:<span> {thisProduct.actividad}</span></li>
                                                </ul>
                                            </div> */}
                  </div>

                  <div className="flex  mt-10 items-center justify-between">
                    {thisProduct.oferta != 0 ? (
                      <div className="flex gap-4 items-center">
                        <p className="text-black text-[2rem]">
                          ${" "}
                          {Math.round(
                            (thisProduct.precio * (100 - thisProduct.oferta)) /
                              100
                          )}
                        </p>
                        <p className="text-[1.2rem] text-gray-400 line-through">
                          $ {thisProduct.precio}
                        </p>
                      </div>
                    ) : (
                      <p className="text-black text-[2rem]">
                        $ {thisProduct.precio}
                      </p>
                    )}

                    <motion.div
                      whileTap={{ scale: 0.75 }}
                      onClick={() => pedido(thisProduct)}
                      className=" group  bg-booty p-3 items-center justify-center flex cursor-pointer rounded-lg hover:bg-white hover:border-booty border-2 border-booty hover:border-2 "
                    >
                      <span className="text-white group-hover:text-booty">
                        Añadir al carro
                      </span>
                    </motion.div>
                  </div>
                </div>
              ) : (
                <Comentarios comentarios={thisProduct.comentarios} />
              )}
            </div>
          </div>
        ) : (
          <></>
        )}

        {/*           <p className='font-bold'>Reviews</p>
            <Comentarios comentarios={thisProduct.comentarios} /> */}
      </div>
    </div>
  );
};

export default Detalle;
