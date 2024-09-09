import { fetchCart, fetchUser } from '../utils/fetchLocalStorageData'
const userInfo = fetchUser()
const cartInfo = fetchCart()

export const initialState = {
  user: userInfo,
  products: null,
  cartShow: false,
  cartItems: cartInfo,
  pedido: 'burger',
  editShow: false,
  users: null,
  selecteddetail: null,
  headerShow: true,
  loginShow: false,
  detalleShow: false,
  editar: null,
  userLogged: null,
  dondeestoy: null,
  categoryselect: null,
  orders: null,
  favorite: null
}
