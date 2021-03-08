import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import('../views/home/Home')
const ShopCart = () => import('../views/shopCart/ShopCart')
const Order = () => import('../views/order/Order')
const Mine = () => import('../views/mine/Mine')
const Login = () => import('../views/login/Login')
const Register = () => import('../views/register/Register')
const Shop = () => import('../views/shop/Shop')
const CartConfirm = () => import('../views/cartConfirm/CartConfirm')


const routes = [{
  path: '',
  name: 'Home',
  component: Home,
}, {
  path: '/login',
  name: 'Login',
  component: Login
}, {
  path: '/register',
  name: 'Register',
  component: Register
}, {
  path: '/shop/:id',
  name: 'Shop',
  component: Shop
}, {
  path: '/shopcart',
  name: 'ShopCart',
  component: ShopCart
}, {
  path: '/cartconfirm/:id',
  name: 'CartConfirm',
  component: CartConfirm
}
  ,
{
  path: '/order',
  name: 'Order',
  component: Order
}, {
  path: '/mine',
  name: 'Mine',
  component: Mine
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register') return next();
  const isPass = window.localStorage.getItem('key')
  if (!isPass) return next({ name: 'Login' })
  next()
})
export default router
