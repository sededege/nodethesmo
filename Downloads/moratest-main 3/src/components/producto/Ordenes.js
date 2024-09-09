/* eslint-disable react/no-unknown-property */
/* eslint-disable multiline-ternary */
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { getAllOrders, updatePayment } from "../utils/firebaseFunctions";
import { useNavigate, useParams } from "react-router";
import { FiEye } from "react-icons/fi";

const Ordenes = () => {
  const history = useNavigate();
  const type = useParams();
  const Swal = require("sweetalert2");
  const [{ orders, user }, dispatch] = useStateValue();
  const [expanded, setExpanded] = React.useState(false);
  const [dataa, setData] = React.useState("");
  const [payment, setPayment] = React.useState("");

  const pickup = (a) => {
    if (a === "malvin") {
      return <p>Av. Italia 4240. Apto 1910</p>;
    } else if (a === "trescruces") {
      return <p>Cassinoni 1684, entre Colonia y Victor Haedo. Tres Cruces.</p>;
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
      return "text-orange-500";
    }
    if (a === "Pagado") {
      return "text-green-500";
    }
    if (a === "error") {
      return "text-red-500";
    }
  };
  const navegar = (a) => {
    history(`/detalle/${a}`);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const prueba = (b,d) => {
console.log(d)
    console.log("prueba", b);
    const total = b.reduce(
      (prevValue, currentValue) =>
        prevValue + currentValue.unit_price * currentValue.quantity,
      0
    );

    return d ? total*d : total;
  };

  React.useEffect(() => {
    console.log(orders);
    if (type.type === "gracias") {
      Swal.fire(
        "Gracias por tu compra!",
        "Nos comunicaremos contigo a la brevedad para coordinar el retiro!",
        "success"
      );
    }
    if (type.type === "graciastr") {
      Swal.fire(
        "Gracias por tu compra!",
        "Realiza la transferencia a los datos indicados en la orden y envia el comprobante a nuestro correo: morafit.uy@gmail.com o por whatsapp al 098 626 100!",
        "success"
      );
    }
    if (type.type === "fail") {
      Swal.fire(
        "Tuvimos un problema!",
        "Intenta realizar el pago denuevo o contactate con nosotros!",
        "error"
      );
    }
    if (type.type === "pendiente") {
      Swal.fire(
        "Su pago esta pendiente!",
        "Una vez que se acredite el pago nos comunicaremos contigo!",
        "warning"
      );
    }
    const options = {
      method: "GET",
      headers: new Headers({ "content-type": "application/json" }),
    };
    const options2 = {
      method: "GET",
      headers: {
        Authorization:
          "Bearer TEST-4263842648119825-061517-b60e93e2733eaec4605949e6274da2e3-239337438",
      },
    };

    if (dataa === "") {
      fetch(`http://localhost:3500/Ordenes${window.location.search}`, options)
        .then((response) => response.text())
        .then((data) => {
          setData(JSON.parse(data));
        });
    } else {
      if (payment === "") {
        fetch(
          `https://api.mercadopago.com/v1/payments/${dataa.Payment}`,
          options2
        )
          .then((response) => response.text())
          .then((data2) => {
            setPayment(JSON.parse(data2));
          });
      } else {
        const data3 = {
          id: payment.metadata.idorden,
          status: "Pagado",
        };
        updatePayment(data3);
      }
    }

    if (user != null) {
      console.log(user)
      getAllOrders().then((data) => {
        console.log(data)
        dispatch({
          type: actionType.SET_ORDERS,
          orders:
            user === null
              ? "Inicie sesion para ver sus ordenes"
              : data.filter((a) => a.email === user?.email),
        });
      });
    }

    /* if (user != null) {
            getAllOrders().then((data) => {
                dispatch({
                    type: actionType.SET_ORDERS,
                    orders: data.filter(a => a.email === user.email)
                })
            })

        } */
  }, [user, dataa, payment]);

  /*  console.log(orders)

     console.log(dataa) */

     console.log(orders)
  return (
    <div className="gap-6 flex mt-[10vh] px-5 flex-col md:px-20  ">
      <h1 className="text-booty ">Pedidos</h1>

      {orders != null ? (
        orders !== "" ? (
          orders.map((a, index) => (
            <Accordion
              key={index}
              sx={{
                paddingLeft: 4,
                paddingRight: 4,
              }}
              className="justify-between"
              expanded={expanded === a.id}
              onChange={handleChange(a.id)}
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
                  Id {index}
                </Typography>
                <Typography
                  sx={{
                    width: "55%",
                    fontFamily: "Poppins",
                    fontSize: "bold",
                  }}
                >
                  <span className={colores(a.status)}>{a.status}</span>
                </Typography>

                <Typography
                  className="hidden md:flex"
                  sx={{
                    width: "55%",
                    fontFamily: "Poppins",
                    fontSize: "bold",
                  }}
                >
                  Total: <span className="font-bold">{Math.floor(prueba(a.items, a.codigo))}</span>
                </Typography>

                <Typography
                  sx={{
                    width: "55%",
                    fontFamily: "Poppins",
                    fontSize: "bold",
                  }}
                >
                  {new Date(a.creado)
                    .toLocaleDateString()
                    .split("/", 2)
                    .join("/")}{" "}
                  {new Date(a.creado)
                    .toLocaleTimeString()
                    .split(":", 2)
                    .join(":")}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div
                  sx={{
                    width: "55%",
                    fontFamily: "Poppins",
                    fontSize: "bold",
                  }}
                >
                  <table className="w-full text-center text-[0.6rem] md:text-[1rem]">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Color</th>
                        <th>Talle</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Ver</th>
                      </tr>
                    </thead>
                    <tbody>
                      {a.items.map((b, index) => (
                        <tr key={index}>
                          <td>{b.title}</td>
                          <td>{b.color}</td>
                          <td>{b.size}</td>
                          <td>{b.quantity}</td>
                          <td>{b.unit_price}</td>
                          <td className="text-center justify-center flex">
                            <FiEye
                              className="text-center font-bold text-[1.5rem] text-booty"
                              onClick={() => navegar(b.id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/*
                                <p className='font-light text-gray-400'>
                                    Total: {a.total}
                                </p>
                                <p className='font-light text-gray-400'>
                                    Status: {a.status}
                                </p> */}
                  <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-center w-full text-center mt-5">
                    <Typography
                      sx={{
                        width: "55%",
                        fontFamily: "Poppins",
                        fontSize: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Pick up:{" "}
                      <span className="font-bold">{pickup(a.pickup)}</span>
                    </Typography>
                    <Typography
                      sx={{
                        width: "55%",
                        fontFamily: "Poppins",
                        fontSize: "bold",
                      }}
                    >
                      Metodo:{" "}
                      <span className="font-bold">{metodo(a.metodo)}</span>
                    </Typography>
                    {a.metodo === "transferencia" && (
                      <Typography
                        sx={{
                          width: "55%",
                          fontFamily: "Poppins",
                          fontSize: "bold",
                        }}
                      >
                        Enviar comprobante:{" "}
                        <span className="font-bold">morafit.uy@gmail.com</span>
                        <br></br> <span className="font-bold">098 626 100</span>
                      </Typography>
                    )}

                    <Typography
                      sx={{
                        width: "55%",
                        fontFamily: "Poppins",
                        fontSize: "bold",
                      }}
                    >
                      Notas:{" "}
                      <span className="font-bold">{a?.notas}</span>
                    </Typography>
                    {
                      a.codigo &&    <Typography
                      sx={{
                        width: "55%",
                        fontFamily: "Poppins",
                        fontSize: "bold",
                      }}
                    >
                      Descuento:{" "}
                      <span className="font-bold">{100-(a.codigo*100)}%</span>
                    </Typography>
                    }
                  
                    <Typography
                      sx={{
                        width: "55%",
                        fontFamily: "Poppins",
                        fontSize: "bold",
                      }}
                    >
                      Total:{" "}
                      <span className="font-bold">{Math.floor(prueba(a.items, a.codigo))}</span>
                    </Typography>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <p className="text-gray-400 items-center justify-center w-full text-center font-bold p-2 rounded-lg ">
            No tienes pedidos
          </p>
        )
      ) : (
        <p className="text-gray-400 items-center justify-center w-full text-center font-bold p-2 rounded-lg ">
          Ingresa en tu cuenta para ver tus ordenes!
        </p>
      )}
    </div>
  );
};

export default Ordenes;
