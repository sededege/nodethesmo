import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useStateValue } from "./components/context/StateProvider";
import CartContainer from "./components/cart/CartContainer";
import Home from "./components/home/5estrellas/Home";
import Header from "./components/home/5estrellas/Header";
import Detalle from "./components/home/5estrellas/Detalle";
import Headerup2 from "./components/home/5estrellas/Headerup2";
import Footer from "./components/home/5estrellas/Footer";
import Contact from "./components/home/5estrellas/Contact";
import About from "./components/home/5estrellas/About";
import { WhatsAppWidget } from "react-whatsapp-widget";
import "react-whatsapp-widget/dist/index.css";

function App() {

 
  const [
    {
   
      cartShow,
    
    },
    dispatch,
  ] = useStateValue();
  const location = useLocation();

React.useEffect(() => {
  location.pathname === '/admin' && window.location.replace('https://mysterious-caverns-45525.herokuapp.com/admin');
 
}, [])


console.log()
 

  return (
    <div className="w-screen h-screen bg-white">
      <main className=" ">
        <div className="z-[1000] fixed">
          <WhatsAppWidget
            className="z-[10000]"
            phoneNumber="+59899613252"
            sendButton="Enviar"
            message="Hola! 👋🏼 En que te podemos ayudar?"
            replyTimeText="Suele responder dentro de 1 hora"
            companyName="5 estrellas"
          />
        </div>

        <AnimatePresence>{cartShow && <CartContainer />}</AnimatePresence>
        <Headerup2 />
        <Header />
        <Routes location={location} key={location.pathname}>
          <Route path="/*" element={<Home />} />
          <Route path="/detalle/:productId" element={<Detalle />} />
          <Route path="/SobreNosotros" element={<About />} />
          <Route path="/Contacto" element={<Contact />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
}

export default App;
