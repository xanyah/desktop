import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Account from './account'
import Categories from './categories'
import Category from './category'
import Checkout from './checkout'
import CustomAttribute from './custom-attribute'
import CustomAttributes from './custom-attributes'
import Customer from './customer'
import Customers from './customers'
import Inventories from './inventories'
import Inventory from './inventory'
import Manufacturer from './manufacturer'
import Manufacturers from './manufacturers'
import Order from './order'
import OrderNew from './order-new'
import Orders from './orders'
import PaymentType from './payment-type'
import PaymentTypes from './payment-types'
import Product from './product'
import Products from './products'
import Provider from './provider'
import Providers from './providers'
import Sale from './sale'
import Sales from './sales'
import Shipping from './shipping'
import ShippingNew from './shipping-new'
import Shippings from './shippings'
import SignIn from './sign-in'
import { OfflineLayout, OnlineLayout } from '../layouts'
import Settings from './settings'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<OfflineLayout />}>
          <Route path="sign-in" element={<SignIn />} />
        </Route>
        <Route element={<OnlineLayout />}>
          <Route path="" element={<Navigate to="/checkout" />} />
          <Route path="account" element={<Account />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/:id/edit" element={<Category />} />
          <Route path="categories/new" element={<Category />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="custom-attributes/new" element={<CustomAttribute />} />
          <Route
            path="custom-attributes/:id/edit"
            element={<CustomAttribute />}
          />
          <Route path="custom-attributes" element={<CustomAttributes />} />
          <Route
            path="custom-attributes/:id/edit"
            element={<CustomAttribute />}
          />
          <Route path="custom-attributes/new" element={<CustomAttribute />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers/:id/edit" element={<Customer />} />
          <Route path="customers/new" element={<Customer />} />
          <Route path="inventories" element={<Inventories />} />
          <Route path="inventories/:id" element={<Inventory />} />
          <Route path="manufacturers" element={<Manufacturers />} />
          <Route path="manufacturers/:id/edit" element={<Manufacturer />} />
          <Route path="manufacturers/new" element={<Manufacturer />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<Order />} />
          <Route path="orders/new" element={<OrderNew />} />
          <Route path="payment-types" element={<PaymentTypes />} />
          <Route path="payment-types/:id/edit" element={<PaymentType />} />
          <Route path="payment-types/new" element={<PaymentType />} />
          <Route path="products" element={<Products />} />
          <Route path="products/new" element={<Product />} />
          <Route path="products/:id/edit" element={<Product />} />
          <Route path="products/new" element={<Product />} />
          <Route path="providers" element={<Providers />} />
          <Route path="providers/:id/edit" element={<Provider />} />
          <Route path="providers/new" element={<Provider />} />
          <Route path="sales" element={<Sales />} />
          <Route path="sales/:id" element={<Sale />} />
          <Route path="settings" element={<Settings />} />
          <Route path="shippings" element={<Shippings />} />
          <Route path="shippings/:id" element={<Shipping />} />
          <Route path="shippings/new" element={<ShippingNew />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
