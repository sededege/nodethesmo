/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { data } from "./data";
import {
  AiOutlineShoppingCart,
  AiFillPlusCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { BsCartPlusFill } from "react-icons/bs";
import { Navigate, useNavigate } from "react-router";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { Pagination } from "flowbite-react";
import { motion } from "framer-motion";

const Products = ({ products, currentPage, postsPerPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const [images, setImages] = React.useState([]);
  const [cantidad, setCantidad] = React.useState(1);
  const [items, setItems] = React.useState([]);
  const [cargando, setCargando] = React.useState(false);
  const [{ cartItems }, dispatch] = useStateValue();

  /*   const imagen = (id) => {
    fetch(`https://api.mercadolibre.com/items?ids=${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && images.length === 0) {
          setImages((prev) => [...prev, data[0].body.pictures[0].url]);
        }
      });
  };
 */
  React.useEffect(() => {
    if (items && items.length > 0) {
      addtocart();
    }

    products ? setCargando(false) : setCargando(true)


  }, [images, items, products]);

  const addtocart = React.useCallback(() => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [dispatch, items]);

  const pedido = (item) => {
    const itemselect = [
      {
        item,
        unidades: cantidad,
      },
    ];
    setItems([...cartItems, itemselect]);
  };

  /*  var _foto = tendencia.results[i].thumbnail;
  var _nueva =
    _foto.substr(0, _foto.lastIndexOf("-") + 1) +
    "O" +
    _foto.substr(_foto.lastIndexOf(".")); */
  /*  const img = (img) => {
    let _foto = img;
    let nueva =
      _foto.substr(0, _foto.lastIndexOf("-") + 1) +
      "O" +
      _foto.substr(_foto.lastIndexOf("."));
    return nueva;
  }; */
  return (
    <div className="w-full h-full bg-white gap-4 p-4 rounded-br-lg md:shadow-lg">
      {/* <div className="flex items-center mb-4">
        <input
          className="w-full p-2 bg-white rounded-l-md"
          type="text"
          placeholder="Ingrese el producto deseado"
        />
        <AiOutlineSearch className="bg-pike2 text-[2.5rem] p-1 text-white rounded-r-md cursor-pointer" />
      </div> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 ">
        {products && products.length > 0 ? (
          products.map((a, index) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index / 10 }}
              key={a.id}
              className="md:px-0 h-full pb-4 shadow-md hover:shadow-2xl transition-all 1s ease-in rounded-lg cursor-pointer bg-white "
            >
              <p className="font-semibold rounded-t-lg bg-yellow-300 flex justify-center items-center p-2 rounded-t-3lg text-pike3 text-[0.8rem] pb-2 text-center  mx-auto w-full ">
                Pack x {a.attributes.qty} Unidades
              </p>
              <img
                onClick={() => navigate(`/detalle/${a.id}`)}
                src={a.attributes.thumbnail.data.attributes.url}
                className="h-[500px] md:h-[300px] px-4 object-contain md:object-contain 2xl:object-contain w-full "
              />
              <div className="md:px-5 px-10">
                <h2 className="md:text-[0.8rem] text-[1rem] font-semibold md:h-[60px] py-2 text-gray-500 text-center">
                  {a.attributes.Title}
                </h2>

                <div className="flex justify-between relative">
                  <p className="font-semibold text-pike3 text-[1.3rem] ">
                    $ {Math.round(a.attributes.price * a.attributes.qty)}{" "}
                    <span className="font-normal text-[0.8rem] text-gray-400">
                      IVA incl.
                    </span>
                  </p>

                  <motion.div
                    whileTap={{ scale: 0.8 }}
                    className="bg-pike absolute bottom-0 right-0 flex items-center p-2 rounded-full"
                  >
                    <BsCartPlusFill
                      onClick={() => pedido(a)}
                      className="text-[1.1rem] text-white"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="w-full h-[80vh] flex-col col-span-4 flex items-center text-center gap-2 justify-center">
          { cargando ?
            <><div role="status">
                  <svg
                    aria-hidden="true"
                    class="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-white fill-red-500"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor" />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill" />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div><p className=" text-center items-center justify-center">
                    Cargando productos...
                  </p></> :
             <p className=" text-center items-center justify-center">
           No hay productos con esas coincidencias.
           </p>
}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
