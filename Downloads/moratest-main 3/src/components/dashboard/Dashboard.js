import React from "react";
import { useStateValue } from ".././context/StateProvider";
import { MdOutlineSearch } from "react-icons/md";
import { getAllOrders } from "../utils/firebaseFunctions";
import { actionType } from ".././context/reducer";
import TablaListados from "./TablaListados";
import { categorias } from "../variables/variables";

const Dashboard = () => {
  const [category, setCategory] = React.useState(null);
  const [buscar, setBuscar] = React.useState("");
  const [{ products }, dispatch] = useStateValue();
  const [products2, setProducts2] = React.useState("");

  const [modal] = React.useState(false);
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    dispatch({
      type: actionType.SET_DONDE_ESTOY,
      dondeestoy: "Dashboard",
    });

    getAllOrders().then((data) => {
      setOrders(data.filter((a) => a.status === "pagado"));
    });
    buscar === "" && setProducts2(products);
  }, [dispatch, buscar, products]);

  const filtrarpornombre = () => {
    console.log(products2)
   setProducts2(products2.filter((a) => a.name.toLowerCase().includes(buscar.toLowerCase())))
  };
  return (
    <div className="md:px-8 h-[90vh] md:mt-[10vh] w-full flex fixed gap-4">
      <div className="flex flex-col w-[86vw] ml-[14vw]">
        <div className="flex mt-5 gap-20">
          <p className="font-bold text-textColor">Todos los productos</p>
          <p className="font-semibold text-textColor">Por categoria</p>
        </div>
        <div className="p-2 flex items-center justify-between">
          <div className="flex items-center justify-center">
            <input
              value={buscar}
              onChange={(e) => setBuscar(e.target.value)}
              className="p-1 rounded-lg drop-shadow-lg outline-none px-2"
              type="text"
              placeholder="buscar"
            />
            <div className="p-2 bg-textColor rounded-lg cursor-pointer">
              <MdOutlineSearch
                onClick={() => filtrarpornombre()}
                className="text-white cursor-pointer"
              />
            </div>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="ml-8 outline-none text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
            >
              {categorias &&
                categorias.map((a) => (
                  <option
                    key={a.id}
                    value={a.urlParamName}
                    className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  >
                    {" "}
                    {a.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className=" flex ">
          <TablaListados
            ventas={orders.map((a) => a.items)}
            newitem={modal}
            data={
              category === "Todas" || category == null
                ? products2
                : products2.filter((n) => n.categoria === category)
            }
            filter={category}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
