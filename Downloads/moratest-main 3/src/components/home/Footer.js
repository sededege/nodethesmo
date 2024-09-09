import React from 'react'
import { RiInstagramLine } from 'react-icons/ri'
import { enviogratis } from '../variables/variables'

const Footer = () => {
  return (
    <div className='h-[80px] py-6  items-center flex justify-between border-red-100 bottom-0 w-full bg-white px-5'>
      <div className='hidden md:flex'>
        <p></p>
      </div>
      <div className='flex'>
        <p className='md:ml-20 text-gray-300 text-[0.9rem]'>
          *** Envío gratis en compras mayores a ${enviogratis}! ***
        </p>
      </div>
      <div className='flex gap-2 items-center'>
        <p className='text-gray-300 md:flex hidden'>Seguinos en</p>
        <a href='https://www.instagram.com/morafit.uy/'>
          <RiInstagramLine className='text-[24px] text-booty' />
        </a>
      </div>
    </div>
  )
}

export default Footer
