/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { getAllOrders, getAllProductsItems } from "../utils/firebaseFunctions";
import { RiFilter2Fill } from "react-icons/ri";
import { motion } from "framer-motion";
import { categorias } from "../variables/variables";

const FiltrosHome = ({ setCurrentPage }) => {
  const [filtros, setFiltro] = React.useState("new");
  const [{ products, orders }, dispatch] = useStateValue();
  const [products2, setProducts2] = useState("");
  const titleRef = React.useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [colores2, setColores] = useState([]);
  const [colores, setColores2] = useState([]);
  const variants = {
    open: { width: "100%", height: 400, opacity: 1 },
    closed: { width: 0, height: 0, fontSize: "2px", opacity: 0 },
  };
  const variants2 = {
    open: { width: 300, height: 400, opacity: 1 },
    closed: { width: 0, height: 0, opacity: 0 },
  };

  React.useEffect(() => {
    getAllProductsItems().then((data) => {
      setProducts2(data);
    });

    products &&
      products.map((a) =>
        a.color.map(
          (b) =>
            colores2.indexOf(b.name) === -1 &&
            setColores((prev) => [...prev, b.name])
        )
      );

    const result = colores2.reduce((acc, item) => {
      if (!acc.includes(item)) {
        acc.push(item);
      }
      return acc;
    }, []);

    setColores2(result);
  }, [products, colores2]);

  const filtrarcolor = (b) => {
    setIsOpen(!isOpen);

    const array = [];

    products2.filter((a) => {
      for (let i = 0; i < a.color.length; i++) {
        if (a.color[i].name === b) {
          array.push({
            caracteristicas: a.caracteristicas,
            categoria: a.categoria,
            color: [a.color[i]],
            id: a.id,
            oferta: a.oferta,
            precio: a.precio,
            name: a.name,
          });
        }
      }
    });

    dispatch({
      type: actionType.SET_PRODUCTS,
      products: array,
    });
  };

  const filtrartalle = (b) => {
    setIsOpen(!isOpen);
    console.log(products2);
    const array = [];
    if (b === "S") {
      products2.filter((a) => {
        for (let i = 0; i < a.color.length; i++) {
          if (a.color[i].tallas[0].stock > 0) {
            array.push({
              caracteristicas: a.caracteristicas,
              categoria: a.categoria,
              color: [a.color[i]],
              id: a.id,
              oferta: a.oferta,
              precio: a.precio,
              name: a.name,
            });
          }
        }
      });
    } else if (b === "M") {
      products2.filter((a) => {
        for (let i = 0; i < a.color.length; i++) {
          if (a.color[i].tallas[1].stock > 0) {
            array.push({
              caracteristicas: a.caracteristicas,
              categoria: a.categoria,
              color: [a.color[i]],
              id: a.id,
              oferta: a.oferta,
              precio: a.precio,
              name: a.name,
            });
          }
        }
      });
    } else if (b === "L") {
      products2.filter((a) => {
        for (let i = 0; i < a.color.length; i++) {
          if (a.color[i].tallas[2].stock > 0) {
            array.push({
              caracteristicas: a.caracteristicas,
              categoria: a.categoria,
              color: [a.color[i]],
              id: a.id,
              oferta: a.oferta,
              precio: a.precio,
              name: a.name,
            });
          }
        }
      });
    }

    dispatch({
      type: actionType.SET_PRODUCTS,
      products: array,
    });
  };

  const categoria = (b) => {
    setCurrentPage(1);
    if (b === "ofertas") {
      dispatch({
        type: actionType.SET_PRODUCTS,
        products: products2.filter((a) => Number(a.oferta) !== 0),
      });
    } else if (b === "new") {
      dispatch({
        type: actionType.SET_PRODUCTS,
        products: products2.sort(() => Math.random() - 0.5),
      });
    } else if (b === "sales") {
      /*  dispatch({
        type: actionType.SET_PRODUCTS,
        products: products2.sort(() => Math.random() - 0.5)
      }) */
      getAllOrders().then((data) => {
        /*  dispatch({
          type: actionType.SET_ORDERS,
          orders: data,
        }); */
        let array = [];
        data.map((a) => a.items.map(b => array.push(b)));
      

        const counts = {};
        array.forEach(obj => {
          counts[obj.id] = (counts[obj.id] || 0) + 1;
        });
    
        const sortedIds = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
        /* setData(sortedIds); */
       /*  console.log(sortedIds) */

       const array2 = []

        products2 &&  sortedIds.map(b => products2.map(a => a.id.includes(b) === true && array2.push(a)))
       
        console.log(array);
        console.log(array2)
        dispatch({
          type: actionType.SET_PRODUCTS,
          products: array2.slice(0,10)
        })
      });

    } else {
      /*  dispatch({
                 type: actionType.SET_PRODUCTS,
                 products: null,
             }); */
      setTimeout(() => {
        dispatch({
          type: actionType.SET_PRODUCTS,
          products:
            b !== "todas"
              ? products2
                  .filter((a) => a.categoria === b)
                  .sort(() => Math.random() - 0.5)
              : products2.sort(() => Math.random() - 0.5),
        });
      }, 100);
    }

    setFiltro(b);

    const element = titleRef.current;
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };
  return (
    <>
      {/*         escritorio
       */}{" "}
      <div className="md:flex hidden justify-between relative">
        <p className=" items-center flex font-bold text-booty text-[1rem]">
          Catálogo
        </p>
        <ul
          ref={titleRef}
          className="flex overflow-auto gap-2 cursor-pointer h-[50px]  "
        >
          {categorias.map((a, index) => (
            <motion.li
              whileTap={{ scale: 0.3 }}
              key={index}
              onClick={() => categoria(a.param)}
              className={` ${
                filtros === a.param
                  ? "text-white bg-booty text-semibold"
                  : "text-gray-400 text-[1rem] cursor-pointer hover:border-2 bg-gray-100   hover:border-gray-200 box-border border-2 border-white"
              } : flex rounded-lg  md:w-[100px] opacity-70 items-center justify-center transition-all ease-in-out 2s`}
            >
              {a.name}
            </motion.li>
          ))}
        </ul>

        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex gap-2 items-center cursor-pointer bg-gray-100 rounded-md hover:shadow-md   text-gray-400  p-2"
        >
          <span>Filtros</span>
          <RiFilter2Fill />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isOpen ? "open" : "closed"}
          transition={{ ease: "easeIn", duration: 0.4 }}
          variants={variants2}
          className="absolute shadow-lg w-[30vw]  rounded-lg items-center p-5 bg-white  mt-[50px] z-20 right-0"
        >
          <p className="font-bold">Color</p>
          <ul>
            {colores.map((a, index) => (
              <li
                key={index}
                className="hover:underline"
                onClick={() => filtrarcolor(a)}
              >
                {a}
              </li>
            ))}
          </ul>
          <p className="font-bold">Talle</p>
          <ul className="flex gap-4">
            <li className="hover:underline" onClick={() => filtrartalle("S")}>
              S
            </li>
            <li className="hover:underline" onClick={() => filtrartalle("M")}>
              M
            </li>
            <li className="hover:underline" onClick={() => filtrartalle("L")}>
              L
            </li>
          </ul>
        </motion.div>
      </div>
      {/*     mobile */}
      <div className="flex flex-col md:hidden justify-between relative">
        <div className="flex items-center justify-between mb-4">
          <p className=" items-center flex text-[1rem] text-booty font-semibold">
            Catálogo
          </p>
          <motion.div
            whileTap={{ scale: 0.75 }}
            onClick={() => setIsOpen(!isOpen)}
            className="flex gap-2 items-center cursor-pointer bg-gray-100 rounded-md hover:shadow-md   text-gray-400  p-2"
          >
            <span>Filtros</span>
            <RiFilter2Fill />
          </motion.div>
        </div>

        <ul
          ref={titleRef}
          className="flex  overflow-x-auto gap-2 cursor-pointer h-[100px] py-6  "
        >
          {categorias.map((a, index) => (
            <motion.li
              whileTap={{ scale: 0.3 }}
              key={index}
              onClick={() => categoria(a.param)}
              className={` ${
                filtros === a.param
                  ? "text-white bg-booty font-bold border-white border-2"
                  : "text-black"
              } : flex rounded-lg opacity-70  text-white text-[0.8rem] items-center p-4 cursor-pointer hover:border-2 bg-gray-100   hover:border-gray-200  border-2 border-white transition-all ease-in-out 2s`}
            >
              <p>{a.name}</p>
            </motion.li>
          ))}
        </ul>
        {
          <motion.div
            initial={{ opacity: 0 }}
            animate={isOpen ? "open" : "closed"}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeIn", duration: 0.2 }}
            variants={variants}
            className="absolute shadow-lg w-0 rounded-lg items-center p-5 bg-white h-[40vh] mt-[50px] z-20 right-0"
          >
            <p className="font-bold">Color</p>
            <ul>
              {colores.map((a, index) => (
                <li
                  key={index}
                  className="hover:underline"
                  onClick={() => filtrarcolor(a)}
                >
                  {a}
                </li>
              ))}
            </ul>
          </motion.div>
        }
      </div>
    </>
  );
};

export default FiltrosHome;
