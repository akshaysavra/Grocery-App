import React from 'react'
import NavigationBar from './component/NavigationBar'
import {Routes,Route, useLocation} from "react-router-dom"
import Home from "./pages/Home"
import Footer from './component/Footer'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext'
import Login from './component/Login'
import AllProducts from './pages/AllProducts'
import ProductCetegory from './pages/ProductCetegory'
import ProductDetail from './pages/ProductDetail'
import Cart from "./pages/Cart"
import AddAddress from "./pages/AddAddress"
import MyOrders from './pages/MyOrders';
import SellerLogin from './component/seller/SellerLogin';
import SellerLayout from './pages/seller/SellerLayout'
import AddProduct from './pages/seller/AddProduct'
import ProductList from './pages/seller/ProductList'
import Orders from './pages/seller/Orders';



const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller")
  const {showUserLogin,isSeller} = useAppContext()
  return (
    <div>
      {isSellerPath ? null : <NavigationBar />}
      {showUserLogin ? <Login/> : false}
      <Toaster/>
    
      

      <div className={`${isSellerPath ? "": "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/products" element={<AllProducts/>} />
            <Route path="/products/:category" element={<ProductCetegory/>} />
            <Route path="/products/:category/:id" element={<ProductDetail/>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/add-address" element={<AddAddress />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/seller" element={isSeller? <SellerLayout/>:<SellerLogin />} >
              <Route index element={isSeller ? <AddProduct/> : null}/>
              <Route path="product-list" element={<ProductList />} />
              <Route path="orders" element={<Orders />} />
            </Route>
        </Routes>
      </div>
      {!isSellerPath && <Footer/>}

    </div>
  )
}

export default App