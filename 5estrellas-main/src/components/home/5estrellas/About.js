import React from "react";
import logo from "./assets/logo5.png";
const About = () => {
  const Card = ({ title, text }) => {
    return (
      <div className="rounded-lg w-full shadow-lg p-4">
        <h1 className="font-bold text-pike ">{title}</h1>
        <p>{text}</p>
      </div>
    );
  };
  return (
    <div className="w-full md:pt-0 pt-[10vh] md:px-[15vw] px-8 text-center text-gray-500  flex flex-col justify-between gap-4 pb-20 md:h-[90vh] 2xl:h-[70vh] items-center">
      <img className="w-[300px] mx-auto" src={logo} alt="logo" />
      <div className="flex md:flex-row flex-col gap-4">
        <Card
          title="Quienes somos"
          text="Somos una empresa uruguaya líder en la fabricación y distribución de productos de limpieza desde hace más de 15 años. Nos enfocamos en brindar productos de alta calidad y servicio de primer nivel para satisfacer las necesidades de nuestros clientes."
        />
        <Card
          title="Misión"
          text="Nuestra misión es ofrecer productos de limpieza de alta calidad y efectividad para mantener ambientes limpios y saludables en hogares y empresas. Nos esforzamos por brindar un servicio personalizado y eficiente que permita a nuestros clientes encontrar los productos que necesitan de manera rápida y fácil."
        />
        <Card
          title="Visión"
          text="Nos esforzamos por ser reconocidos como la empresa líder en la venta de productos de limpieza en Uruguay, y expandir nuestra presencia en la región. Buscamos innovar constantemente en la selección de productos y en la forma en que brindamos el servicio para satisfacer las necesidades de nuestros clientes y mantenernos a la vanguardia del mercado."
        />
      </div>
    </div>
  );
};

export default About;
