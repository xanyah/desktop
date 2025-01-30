
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'
import Account from './account'
import Checkout from './checkout'
import CustomAttribute from './custom-attribute'
import Home from './home'
import Inventories from './inventories'
import Inventory from './inventory'
import Manufacturer from './manufacturer'
import Manufacturers from './manufacturers'
import Order from './order'
import Orders from './orders'
import Product from './product'
import Products from './products'
import Provider from './provider'
import Providers from './providers'
import Sale from './sale'
import Sales from './sales'
import Settings from './settings'
import Shipping from './shipping'
import Shippings from './shippings'
import SignIn from './sign-in'
import Clients from './clients'
import Client from './client'
import { OfflineLayout, OnlineLayout } from '../layouts'

const Router = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<OfflineLayout />}>
        <Route path="sign-in" element={<SignIn />} />
      </Route>
      <Route element={<OnlineLayout />}>
      <Route path="account" element={<Account />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="custom-attributes/:id" element={<CustomAttribute />} />
      <Route path="home" element={<Home />} />
      <Route path="inventories" element={<Inventories />} />
      <Route path="inventorys/:id" element={<Inventory />} />
      <Route path="manufacturers/:id" element={<Manufacturer />} />
      <Route path="manufacturers" element={<Manufacturers />} />
      <Route path="orders/:id" element={<Order />} />
      <Route path="orders" element={<Orders />} />
      <Route path="products/:id" element={<Product />} />
      <Route path="products" element={<Products />} />
      <Route path="providers/:id/edit" element={<Provider />} />
      <Route path="providers/new" element={<Provider />} />
      <Route path="providers" element={<Providers />} />
      <Route path="sales/:id" element={<Sale />} />
      <Route path="sales" element={<Sales />} />
      <Route path="settings" element={<Settings />} />
      <Route path="shipping" element={<Shipping />} />
      <Route path="shippings" element={<Shippings />} />
      <Route path="clients" element={<Clients />} />
      <Route path="clients/:id" element={<Client />} />
      </Route>
      </Routes>
  </BrowserRouter>
)
}

export default Router
