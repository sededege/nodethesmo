import React, { useCallback, useEffect } from 'react'
import Header from './components/navs/Header'
import MainContainer from './components/home/MainContainer'
import {
  Route,
  Routes,
  useLocation
} from 'react-router-dom'
import imagen from './asdf.png'
import { AnimatePresence } from 'framer-motion'
import { useStateValue } from './components/context/StateProvider'
import { getAllProductsItems, getAllUsuarios } from './components/utils/firebaseFunctions'
import { actionType } from './components/context/reducer'
import Dashboard from './components/dashboard/Dashboard'
import Headerleft from './components/navs/Headerleft'
import CartContainer from './components/cart/CartContainer'
import SetAddres from './components/cart/setAddres'
import Detalle from './components/producto/Detalle'
import Favoritos from './components/home/Favoritos'
import CreateContainer from './components/dashboard/createContainer'
import EditItem from './components/dashboard/editItem'
import Ordenes from './components/producto/Ordenes'
import Pre from './components/utils/Pre'
import ScrollToTop from './components/utils/scrolltotop'
import ShowLogin from './components/home/login'
import Pedidos from './components/dashboard/Pedidos'
import Usuarios from './components/dashboard/Usuarios'
import Armatuoutfit from './components/home/Armatuoutfit'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App () {
  const [{ dondeestoy, cartShow, editShow, loginShow, user }, dispatch] = useStateValue()
  const [load, upadateLoad] = React.useState(true)

  const fetchData = useCallback(() => {
    getAllProductsItems().then((data) => {
      const newArray = [...data];
      // Shuffle the array using Fisher-Yates (Knuth) shuffle algorithm
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      dispatch({
        type: actionType.SET_PRODUCTS,
        products: newArray
      })
    })
  }, [])

  const fetchUsers = useCallback(() => {
    getAllUsuarios().then((data) => {
      dispatch({
        type: actionType.SET_USERS,
        users: data
      })
      if (user && user != null) {
        dispatch({
          type: actionType.SET_FAVORITE,
          favorite: data.filter(a => a.user === user.email)
        })
      } else {
        dispatch({
          type: actionType.SET_FAVORITE,
          favorite: ''
        })
      }
    })
  }, [])

  const location = useLocation()

  useEffect(() => {
    setTimeout(() => {
      upadateLoad(false)
    }, 2000)

    fetchData()
    fetchUsers()
  }, [fetchUsers])

  return (
    <div className='w-screen h-screen bg-white'>
      <ToastContainer/>
      <main >
        {
          loginShow && (<ShowLogin />)
        }
        {
          editShow && (<SetAddres />)
        }
        <AnimatePresence>
          {cartShow && (
            <CartContainer />
          )}
        </AnimatePresence>
        <Header />
        {
          dondeestoy === 'Dashboard' && (<Headerleft />)
        }
{/* <div  className='bg-[#d1afdc] w-full h-full flex items-center justify-center fixed top-0 z-[999999999]'>
  <img src={imagen} className='w-full h-full object-contain' alt='asd'/>
</div> */}
        <AnimatePresence>
          <Pre load={load} />
        </AnimatePresence>

        <ScrollToTop />
        <Routes location={location} key={location.pathname}>
          <Route path='/*' element={<MainContainer />} />
          <Route path="/detalle/:productId" element={<Detalle />} />
          <Route path='/Favoritos' element={<Favoritos />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/Nuevoproducto' element={<CreateContainer />} />
          <Route path='/armatuoutfit' element={<Armatuoutfit/>} />
          <Route path='/edititem' element={<EditItem />} />
          <Route path='/Ordenes/:type' element={<Ordenes />} />
          <Route path='/Dashboard/Pedidos' element={<Pedidos />} />
          <Route path='/Dashboard/Usuarios' element={<Usuarios/>} />
        </Routes>

      </main>
    </div>
  )
}

export default App
