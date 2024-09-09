import React from 'react'
import { useStateValue } from '.././context/StateProvider'
import { FiShoppingCart } from 'react-icons/fi'
import Carrousel from './Carousel'

const Favoritos = () => {
  const [{ products, favorite }] = useStateValue()
  const [existeuser, setExisteUsuario] = React.useState(null)

  React.useEffect(() => {
    if (favorite && favorite !== '') {
      setExisteUsuario(favorite)
    }
    console.log(existeuser)
    console.log(favorite)
  }, [])

  const productos = (c) => {
    const mostrar = products.filter(b => String(b.id) === String(c))
    /*  console.log(c)

        console.log(mostrar) */

    return (
            <div>
                {
                    mostrar[0] &&
                    (<div key={mostrar[0].id} className='h-full mb-5'>
                        <div className='gap-2 flex flex-col'>
                            <div>
                                <Carrousel imagenes={mostrar[0].color} id={mostrar[0].id} />
                            </div>
                            <div className='p-2 rounded-b-lg relative'>
                                <div className='flex justify-between items-center'>
                                    <p className='font-regular text-textColor w-[200px] text-[1.rem]'>{mostrar[0].name}</p>
                                </div>
                                <div className='flex mt-2 h-full justify-between  items-center '>
                                    <p className='font-bold text-[1.2rem] text-black'>$ {mostrar[0].precio}</p>

                                    <FiShoppingCart className='text-[1.4rem] text-booty  ' />
                                </div>

                            </div>
                        </div>
                    </div>)
                }
            </div>

    )
  }

  /*     console.log(existeuser)
 */ return (
        <div className='gap-6 flex flex-col mt-[10vh]  w-full px-4 md:px-20 '>
            <p className='text-white bg-booty items-center justify-center w-[100px] text-center font-bold p-2 rounded-lg ' >Favoritos</p>
            <div className=' grid grid-cols-2 md:grid-cols-5 gap-8'>
                {
                    existeuser
                      ? existeuser.map((a, index) => (
                        a.favoritos !== '' && a.favoritos && (a.favoritos.map(b =>
                            <p key={index}>{productos(b)}</p>
                        ))

                      ))
                      : <p className='text-gray-400 items-center justify-center w-full text-center font-bold p-2 rounded-lg ' >No tienes prendas favoritas :(</p>

                }
            </div>
        </div>

  )
}

export default Favoritos
