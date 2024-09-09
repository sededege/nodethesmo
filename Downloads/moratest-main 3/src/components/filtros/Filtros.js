import React, { useState } from 'react'
import { categorias, talla } from '../../components/utils/databooty'
import Range from './Range'
import { HiSearch } from 'react-icons/hi'
import { useStateValue } from '.././context/StateProvider'
import { actionType } from '.././context/reducer'

const Filtros = () => {
  const [{ products }, dispatch] = useStateValue()
  const [categoriaselect, setCategoriaSelect] = useState('todas')
  const [products2, setProducts2] = useState([])

  React.useEffect(() => {
    setProducts2(products)
  }, [products2])

  const categoria = (b) => {
    if (b === 'ofertas') {
      dispatch({
        type: actionType.SET_PRODUCTS,
        products: products2.filter(a => a.oferta !== 0)
      })
    } else if (products2 !== '') {
      dispatch({
        type: actionType.SET_PRODUCTS,
        products: b !== 'todas' ? products2.filter(a => a.categoria === b) : products2
      })
    }
    setCategoriaSelect(b)
  }

  const filtrocolor = (b) => {
    console.log(b)

    if (products2 !== '') {
      /*  const colorr = products2.map(a => a.color.filter(c => c.name === b))
             const results = colorr.filter(element => {
                 if (Object.keys(element).length !== 0) {
                   return true;
                 }

                 return false;
               });
               console.log(results[0])   */
      console.log(products2.includes(b))
      dispatch({
        type: actionType.SET_PRODUCTS,
        products: b !== 'todas' ? <></> : products2
      })
    }
  }

  return (
        <div className='rounded-lg h-screen flex-col flex  border-lg gap-4 p-10'>
            <div className="flex flex-col">
                <label className="relative block">
                    <span className="sr-only">Search</span>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <HiSearch className="text-booty text-2xl  cursor-pointer" />
                    </span>
                    <input className="placeholder:italic p-5 placeholder:text-slate-400 block bg-bghome w-full h-12  border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-gray-100 focus:ring-gray-100 focus:ring-1 sm:text-sm" placeholder="Buscador..." type="text" name="search" />
                </label>
            </div>
            <div className='flex flex-col  '>
                <p className=' font-semibold'>Categorias</p>
                <div className='px-4 gap-1 flex flex-col'>
                    {
                        categorias && categorias.map((a, index) => (
                            <div key={a.id} className='flex'>
                                <p onClick={() => { categoria(a.param) }} key={index} className={` ${categoriaselect === a.param ? 'text-textColor underline' : 'text-gray-400 cursor-pointer hover:underline '} : px-2 py-1rounded-full flex gap-2 justify-center items-center `}>{a.name}</p>
                            </div>

                        ))
                    }
                </div>
            </div>
            <div className='flex flex-col '>

                <p className='font-semibold'>Talle</p>
                <div className='px-4 gap-4 flex'>
                    {
                        talla && talla.map(a => (
                            <div key={a.id} className='flex w-8 h-8 rounded-lg bg-white items-center justify-center'>
                                <p>{a.name}</p>
                            </div>

                        ))
                    }
                </div>
            </div>
            <div className='flex flex-col'>
                <p className='font-semibold'>Color</p>
                <div className='px-4 gap-1 flex flex-col'>
                    {/*                     {
                        colores && colores.map(a => (
                            <div key={a.id} className='flex'>
                                <p>{a.name}</p>
                            </div>

                        ))
                    } */}
                    {
                        products2 !== ''
                          ? products2.map(a =>
                            <div key={a.id} className='flex flex-col'>
                                {a.color.map((b, index) => <p key={index} onClick={() => filtrocolor(b.name)} className=''>{b.name}</p>)}
                            </div>
                          )
                          : <></>
                    }
                </div>
            </div>
            <div className='flex flex-col'>
                <p className='font-semibold'>Precio</p>
                <Range />
            </div>
        </div>
  )
}

export default Filtros
