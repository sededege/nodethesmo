import { useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import Objects from "./Objects";
import {
  getAllObjectsFilter,
  getAllObjectsFilterMas,
  saveObject,
} from "./utils/firebaseFunctions";
import { motion } from "framer-motion";

//Setear la variable param con el parametro a filtrar deseado:
//estos pueden ser name/socialreason/nit/tel/code
let param = "name";

const Dropdown = () => {
  //Variable del texto a buscar
  const [text, setText] = useState("");
  //Boolean para mostrar el boton de añadir un cliente nuevo
  const [add, setAdd] = useState(false);
  //Array de objectos consultados
  const [objects, setObjects] = useState([]);
  //Variable del último documento de firebase.
  const [lastdocument, setLastdocument] = useState(null);
  //Boolean que permite abrir y cerrar el modal
  const [showModal, setShowModal] = useState(false);
  //Boolean que controla el dropdown
  const [isOpen, setIsOpen] = useState(false);

  //Variables de animación dropdown.
  const variants = {
    open: { height: "180px" },
    closed: { height: 0 },
  };

  //Retorna el parametro seleccionado
  const paramselect = (e) => {
    if (e === "name") {
      return "Nombre";
    }
    if (e === "socialreason") {
      return "Razón Social";
    }
    if (e === "nit") {
      return "NIT";
    }
    if (e === "tel") {
      return "Teléfono";
    }
    if (e === "code") {
      return "Código";
    }
  };

  //Funcion para obtener los objetos.
  const filter = () => {
    setIsOpen(!isOpen);
    //limpio todo antes de cargar
    setAdd(false);
    setObjects("");
    //cargoo objetos segun el parametro seteado por código
    getAllObjectsFilter({ text, param}).then((data) => {
      if (data.length > 0) {
        //filtro los objetos por el tipo de parametro y los despliego con map en un array.
        if (param === "name") {
          setObjects(data.map((a) => a.name));
        }
        if (param === "socialreason") {
          setObjects(data.map((a) => a.socialreason));
        }
        if (param === "nit") {
          setObjects(data.map((a) => a.nit));
        }
        if (param === "tel") {
          setObjects(data.map((a) => a.tel));
        }
        if (param === "code") {
          setObjects(data.map((a) => a.code));
        }
      } else {
        setAdd(true);
      }
      //seteo el ultimo documento
      data.length > 0 && setLastdocument(data[data.length - 1].id);

    });
  };

  //Funcion para mostrar los siguientes 20 objetos.
  const mostrarmas = () => {
    getAllObjectsFilterMas(lastdocument).then((data) => {
      if (param === "name") {
        setObjects([...objects, ...data.map((a) => a.name)])
     }
      if (param === "socialreason") {
        setObjects([...objects, ...data.map((a) => a.socialreason)]);
      }
      if (param === "nit") {
        setObjects([...objects, ...data.map((a) => a.nit)]);
      }
      if (param === "tel") {
        setObjects([...objects, ...data.map((a) => a.tel)]);
      }
      if (param === "code") {
        setObjects([...objects, ...data.map((a) => a.code)]);
      }
      data.length > 0 && setLastdocument(data[data.length - 1].id);
    });
  };

  //obtengo la posicion del scroll.
  const onScrollHandler = () => {
    const el = document.getElementById("scroll");
    //llegando al final del div, llamo a la funcion de mostrarmas() objetos.
    let number = 600
    if (el.scrollTop > number) {
      mostrarmas();
      number = number+600
     /*  setTimeout(() => {
        el.scrollTop = 0
      }, 500); */
    }
  };

  //componente Modal
  const Modal = (props) => {
    //Carga el valor segun el parametro seteado.
    const [name, setName] = useState(props.param === "name" ? props.dato : "");
    const [socialreason, setSocialReason] = useState(
      props.param === "socialreason" ? props.dato : ""
    );
    const [nit, setNit] = useState(props.param === "nit" ? props.dato : "");
    const [tel, setTel] = useState(props.param === "tel" ? props.dato : "");
    const [code, setCode] = useState(props.param === "code" ? props.dato : "");

    //Guardar en Firebase el nuevo cliente
    const guardarEdit = () => {
      const data = {
        id: `${Date.now()}`,
        name: name,
        socialreason: socialreason,
        nit: nit,
        tel: tel,
        code: code,
      };
      saveObject(data);
      alert("Ingreso correcto!");
      setObjects("");
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    };

    return (
      <div className="w-full h-full items-center flex justify-center fixed z-[200] top-0 bg-black bg-opacity-25 ">
        <div className="flex flex-col rounded-md bg-white p-10 flex-wrap -mx-3 mb-6">
          {/*Nombre*/}

          <div className="w-full ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Nombre
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Escribe un nombre"
            />
          </div>

          {/* Razón Social */}

          <div className="w-full ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Razón Social
            </label>
            <input
              value={socialreason}
              onChange={(e) => setSocialReason(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Escribe la razón social"
            />
          </div>

          {/* NIT */}

          <div className="w-full">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              NIT
            </label>
            <input
              value={nit}
              onChange={(e) => setNit(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="number"
              placeholder="Escribe el NIT"
            />
          </div>

          {/* Teléfono */}

          <div className="w-full ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Teléfono
            </label>
            <input
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="number"
              placeholder="Escribe un teléfono"
            />
          </div>

          {/* Código */}

          <div className="w-full ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Código
            </label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="number"
              placeholder="Escribe el código"
            />
          </div>

          {/* Acciones */}

          <div className="justify-end gap-2 flex items-center mt-4">
            <button
              onClick={() => setShowModal(!showModal)}
              className="relative  items-center justify-center ml-100 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="button"
            >
              Cancelar{" "}
            </button>
            <button
              onClick={guardarEdit}
              className="relative  items-center justify-center ml-100 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="button"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      {/* Modal */}
      {showModal && <Modal param={param} dato={text} />}

      {/* Title */}

      <h2 className="mb-2">
        {" "}
        Mostrando objetos por parametro{" "}
        <span className="font-bold">{paramselect(param)}</span>
      </h2>

      {/* DropDown */}

      <div className="flex">
        <input
          className="w-[400px]  p-2.5 text-gray-500 bg-white rounded-l-md shadow-sm outline-none appearance-none focus:border-sky-300 border-2 "
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder={`Ingrese un ${paramselect(param)}`}
        />

        {/* Arrow icon */}

        <div
          onClick={() => filter()}
          className="cursor-pointer flex items-center justify-center w-[40px] h-[50px] bg-gray-200 rounded-r-md"
        >
          <AiOutlineCaretDown className="text-[1.5rem] text-gray-400 " />
        </div>
      </div>

      {/* Lista de objetos */}

      <motion.div
        animate={isOpen ? "open" : "closed"}
        transition={{ ease: "easeIn", duration: 0.4 }}
        variants={variants}
        id="scroll"
        onScroll={onScrollHandler}
        className="overflow-auto bg-gray-100 w-full  "
      >
        {/* Componente object */}
        <button
            onClick={() => setShowModal(true)}
            className="p-2 w-full rounded-lg bg-red-600 "
          >
            <span className="font-bold text-white">Añadir cliente</span>
          </button>
        {objects &&
          objects.length > 0 &&
          objects.map((e,index) => <Objects key={index} list={e} />)}

        {/* Btn Añadir Cliente */}

        {add && (
          <p className="p-2 text-center">No hay coincidencias</p>
        )}
      </motion.div>
    </div>
  );
};

export default Dropdown;
