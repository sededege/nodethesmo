import React from "react";
import { send } from "emailjs-com";

export default function Contact() {
  const [toSend, setToSend] = React.useState({
    from_name: "Jessica",
    to_name: "Sebastian",
    message: "Hola crack",
    reply_to: "test",
  });

 
  
  const onSubmit = (e) => {
    /*  e.preventDefault(); */
   
   send("service_ckxcjw4", "template_b6xjpg5", toSend, "x1pZtczNJ6zBgwSUF")
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
      })
      .catch((err) => {
        console.log("FAILED...", err);
      });
  };

  React.useEffect(() => {
  
  }, []);

  return (
    <div >
      <section className="text-gray-700 body-font relative md:pt-0 pt-[10vh] md:h-[70vh] md:items-center flex">
        <form type="POST" className="container px-5 py-10 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-pike">
              Contacto
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Responderemos a la brevedad cualquiera de sus dudas!
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label for="name" className="leading-7 text-sm text-gray-600">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    required
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    for="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    for="message"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  type="submit"
                  className="flex mx-auto text-white bg-pike3 border-2 border-white hover:border-2 hover:border-pike2  py-2 px-8 focus:outline-none hover:bg-white hover:text-pike2 rounded-lg text-lg"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
