import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import HomeScreen from './screens/Homescreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ShippingScreen from './screens/ShippingScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import ProductListScreen from './screens/admin/ProductListScreen.jsx';
import ProductEditScreen from './screens/admin/ProductEditScreen.jsx';
import UserListScreen from './screens/admin/UserListScreen.jsx';
import UserEditScreen from './screens/admin/UserEditScreen.jsx';
import PaymentScreen from './screens/PaymentScreen.jsx';
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx';
import OrderScreen from './screens/OrderScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';

import { Provider } from 'react-redux';
import store from './store.js';
import OrderListScreen from './screens/admin/OrderListScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen/>}></Route>
      <Route path="/page/:pageNumber" element={<HomeScreen/>}></Route>
      <Route path="/product/:id" element={<ProductScreen/>}></Route>
      <Route path="/cart" element={<CartScreen/>}></Route>
      <Route path='/login' element={<LoginScreen/>}></Route>
      <Route path='/register' element={<RegisterScreen/>}></Route>

      <Route path='' element={<PrivateRoute></PrivateRoute>}>
        <Route path='/shipping' element={<ShippingScreen/>}></Route>
        <Route path='/payment' element={<PaymentScreen/>}></Route>
        <Route path='/placeorder' element={<PlaceOrderScreen/>}></Route>
        <Route path='/order/:id' element={<OrderScreen/>}></Route>
        <Route path='/profile' element={<ProfileScreen/>}></Route>
      </Route>

      <Route path='' element={<AdminRoute></AdminRoute>}>
        <Route path='/admin/orderlist' element={<OrderListScreen/>}></Route>
        <Route path='/admin/productlist' element={<ProductListScreen/>}></Route>
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>}></Route>
        <Route path='/admin/userlist' element={<UserListScreen/>}></Route>
        <Route path='/admin/user/:id/edit' element={<UserEditScreen/>}></Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router}></RouterProvider>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>,
)
