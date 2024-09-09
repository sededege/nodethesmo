import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Carrousel = (c) => {
  const history = useNavigate()

  const navegar = (a, index) => {
    history(`/detalle/${a}`, { state: index })
  }

  const colores = (color) => {
    if (color === 'Negro') {
      return 'bg-black'
    }
    if (color === 'Morado') {
      return 'bg-[#c7acbf]'
    }
    if (color === 'Verde') {
      return 'bg-green-100'
    }
    if (color === 'Gris') {
      return 'bg-gray-400'
    }
    if (color === 'Purple') {
      return 'bg-[#9c78a8]'
    }
    if (color === 'Blue') {
      return 'bg-blue-500'
    }
    if (color === 'Azul-Oscuro') {
      return 'bg-blue-900'
    }
    if (color === 'Rosado') {
      return 'bg-[#da9bc1]'
    }
    if (color === 'Purpura') {
      return 'bg-[#977baf]'
    }
    if (color === 'Camuflado') {
      return 'bg-[#acbeaf]'
    }
    if (color === 'Turquesa') {
      return 'bg-[#60ceb9]'
    }
    if (color === 'Verde-Fluor') {
      return 'bg-[#d4e693]'
    }
  }

  return (
        <Carousel
            showStatus={false}
            showThumbs={false}
            renderIndicator={(onClickHandler, isSelected, index, label) => {
              const handleChange = (a) => {
                onClickHandler()
              /*   console.log(a)
                setColor(a) */
              }
              return (
                    <>
                        {
                            index > 0 &&
                            <div
                                onClick={handleChange}
                                onKeyDown={onClickHandler}
                                value={index}
                                onChange={handleChange}
                                key={index}
                                role="button"
                                tabIndex={0}
                                aria-label={`${label} ${index + 1}`}
                                className={`mt-2 ml-4 shadow-md ${isSelected ? 'border-2 border-slate-400 ' : 'border-gray-400 border-1'} ${colores(c.imagenes[index].name)}  h-4 w-4 rounded-full border-1`}>

                            </div>
                        }

                    </>

              )
            }}
        >
            {/*             ${borderselect(c.imagenes[index].name)}
 */}
            {
                c.imagenes.length > 0 && (c.imagenes.map((a, index) =>
                    <motion.div
                        key={index}
                        className='h-[300px] md:lg:h-[400px] 2xl:h-[500px] rounded-lg z-[10] cursor-pointer' onClick={() => navegar(c.id, c.imagenes[index].name)}>
                        <img className=' rounded-lg   w-full h-full object-cover' src={a.images[0]} />

                    </motion.div>
                ))
            }

        </Carousel >
  )
}

export default Carrousel
