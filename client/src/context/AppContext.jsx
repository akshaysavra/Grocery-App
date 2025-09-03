/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { dummyProducts } from "../assets/assets";
import { useEffect } from "react";
import axios from "axios";
import { dummyProducts } from "../assets/assets";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = "$";
  const [user, setUser] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [cartItems, setCartItem] = useState({});
  const [searchQuery, setSearchQuery] = useState({});
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  

  //for fetching product data from db
  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      // console.log("data",data)
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
      // setProducts(dummyProducts)
    } catch (error) {
      toast.error(error.message);
    }
  };

  //fetching user login status and  setting user cart item
  const fetchUser = async ()=>{
    try {
      const {data} = await axios.get("/api/user/is-auth");
      console.log("dataUser : ",data)
      if(data.success){
        setUser(data.user);
        setShowUserLogin(false)
        console.log("from fetch user",data)
        setCartItem(data.user.cartItems)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
 

  const fetchSeller = async () => {
    const { data } = await axios.get("/api/seller/is-auth");
    // console.log(data);
    if (data.success) {
      setIsSeller(true);
    } else {
      setIsSeller(false);
    }
  };
  // const products = dummyProducts;
  useEffect(() => {
    fetchData();
    
    fetchSeller();
    
  }, []);
  useEffect(()=>{
    fetchUser();

  },[])

  //for updating cart items of user
  useEffect(() => {
    const updateCartu = async () => {
      try {
        const { data } = await axios.post("/api/cart/update", { cartItems });
        // console.log("data of cart : ", data);
        if (!data.sucess) {
          toast.success(data.message);
        }
      } catch (error) {
        console.log("error : ", error.message);
        toast.error(error.message);
      }
    };
    if (user) {
      updateCartu();
    }
  }, [cartItems]);
  //adding item to cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItem(cartData);
    toast.success("Added to cart");
  };

  // updating cart
  const updateCart = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItem(cartData);
    toast.success("Cart updated");
  };

  //remove from cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    console.log("data : ", cartData);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      console.log("id : ", cartData[itemId]);
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    setCartItem(cartData);
    toast.success("removed Successfully");
  };
  // function to find total item in cart
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      totalCount += cartItems[items];
    }
    return totalCount;
  };

  //function to find total aamout of item in cart;
  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      // console.log("product of totalamount ",product)
      let itemInfo = products.find((product) => product._id === items);
      // console.log("cart items : ", cartItems);
      // console.log("item info: ", itemInfo);
      // console.log("item info op: ", itemInfo.offerPrice);
      if (cartItems[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  // console.log(products)
  // console.log("✅ AppContextProvider mounted");

  // console.log(products)
  // console.log(dummyProducts)
  const value = {
    user,
    setUser,
    isSeller,
    setIsSeller,
    navigate,
    setShowUserLogin,
    cartItems,
    showUserLogin,
    removeFromCart,
    currency,
    addToCart,
    updateCart,
    products,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getTotalAmount,
    axios,
    setCartItem,
    fetchData,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
