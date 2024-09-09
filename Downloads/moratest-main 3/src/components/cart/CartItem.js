/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { motion } from 'framer-motion'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

let items = []

const CartItem = ({ item, setFlag, flag }) => {
  const [{ cartItems }, dispatch] = useStateValue()

  const cartDispatch = () => {
    console.log('LO QUE SUBO', items)
    localStorage.setItem('cartItems', JSON.stringify(items))
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items
    })
  }

  const updateQty = (action, product) => {
    console.log(cartItems)
    console.log(product)
    if (action === 'add') {
     
      // eslint-disable-next-line array-callback-return
      cartItems.map((item) => {
        if (item.id === product.id) {
          item.unidades = item.unidades + 1
          setFlag(flag + 1)
        }
      })
  /*     cartDispatch() */
    } else {
      // initial state value is one so you need to check if 1 then remove it
      if (item.unidades === 1) {
        items = cartItems.filter((item) => item.id !== product.id)
        /* setFlag(flag + 1) */
        cartDispatch()
      

      } else {
        // eslint-disable-next-line array-callback-return
        cartItems.map((item) => {
          if (item.id === product.id) {
            item.unidades = item.unidades - 1
            setFlag(flag + 1)
          }
        })
       /*  cartDispatch() */
      }
    }
  }

  useEffect(() => {
    items = cartItems
  }, [items])

  return (
    <div className="w-full p-4 px-2 rounded-lg shadow-md flex items-center gap-2">
       <img
        src={item && (item.item.color.filter(a => a.name === item.colorselected)[0].images)}
        className="w-20 h-20 max-w-[60px]  object-contain"
        alt={item && (item.item.name)}
      />

      {/* name section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-[0.8rem] text-gray-500">{item.item.name}</p>
        <div className="flex flex-col">

          <p className="text-[0.8rem] font-semibold">
            Talle: <span>{item.size}</span>
          </p>
          <p className="text-[0.8rem] font-semibold">
            Color: <span>{item.colorselected}</span>
          </p>

        </div>

      </div>

      {/* button section */}
      <div className="group flex flex-col items-center  ml-auto cursor-pointer">
        <div className="flex gap-2">
          <motion.div
            className="bg-booty  p-1 items-center rounded-lg"
            whileTap={{ scale: 0.75 }}
            onClick={() => updateQty('remove', item)}
          >
            <BiMinus className="text-white " />
          </motion.div>

          <p className="w-6 h-6 rounded-lg bg-white border-2  text-textColor flex items-center justify-center">
            {item.unidades}
          </p>

          <motion.div
            className="bg-booty  p-1 items-center rounded-lg"
            whileTap={{ scale: 0.75 }}
            onClick={() => updateQty('add', item)}
          >
            <BiPlus className="text-white " />
          </motion.div>

        </div>
        <div className="flex mt-8">
          <p className="text-sm block text-gray-800 font-semibold">
            $ {parseFloat(item.precio) * item.unidades}
          </p>
        </div>

      </div>
    </div>
  )
}

export default CartItem
