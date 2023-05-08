import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import HomeScreen from './screens/Homescreen';
import ProductScreen from './screens/ProductScreen';

import { Provider } from 'react-redux';
import store from './store.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen/>}></Route>
      <Route path="/product/:id" element={<ProductScreen/>}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>,
)