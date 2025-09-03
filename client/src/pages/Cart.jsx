/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import { useEffect, useState } from "react"
import { useAppContext } from "../context/AppContext"
import { assets, dummyAddress} from "../assets/assets"
import toast from "react-hot-toast"


const Cart = () => {
    const [showAddress, setShowAddress] = React.useState(false)
    const {products,getTotalAmount,getCartCount,setCartItem,cartItems,user,navigate,removeFromCart,axios} = useAppContext()
    const [selectedAddress,setSelectedAddress] = useState(null);
    const [addresses,setAddresses] = useState([]);
    const [cartArray,setCartArray] = useState([]);
    const [paymentOption,setPaymentOption] = useState("COD")
    
    const getCart = ()=>{
        let tempArray = [];
        for(const items in cartItems){
            const product = products.find((key)=>key._id == items);
            product.quantity = cartItems[items];
            tempArray.push(product)
        }
        setCartArray(tempArray)
    }
    const getAddress = async ()=>{
        try {
            const {data} = await axios.get("api/address/get");
            // console.log("data from address",data)
            if(data.sucess){
                setAddresses(data.addres)
                if(data.addres.length >0){
                    setSelectedAddress(data.addres[0])
                }
            }
        } catch (error) {
            toast.error(error)
        }
    }
    // console.log("temp arry from cart ",cartArray)
    const handlePlaceOrder= async ()=>{
        try {
            if(!selectedAddress){
                return toast.error("please select address")
            }
            const {data} = await axios.post("/api/order/cod",{
                userId : user._id,
                items : cartArray.map(item=>({
                    product : item._id,
                    quantity : item.quantity
                })),
                address : selectedAddress
            });
            // console.log("data from place ",data)

            if(data.sucess){
                toast.success("order placed successfully")
                setCartItem({})
                navigate("/my-orders")
            }
        } catch (error) {
            toast.error(error)
        }
    }


    useEffect(()=>{
        if(products.length > 0 && cartItems){
            getCart();
        }
    },[products,cartItems])
    useEffect(()=>{
        if(user){
            getAddress()
        }
    },[user])

    
    return (products.length > 0 && cartItems) && (
        <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-primary">{getCartCount()} Items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div onClick={()=>{navigate(`/products/${product.category.toLowerCase()}/${product._id}`);scrollTo(0,0)}} className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                                <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-500/70">
                                    <p>weight : <span>{product.weight || "N/A"}</span></p>
                                    <div className='flex items-center'>
                                        <p>Qty: {product.quantity} </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">${product.offerPrice * product.quantity }</p>
                        <button onClick={()=>removeFromCart(product._id)} className="cursor-pointer mx-auto">
                            <img src={assets.remove_icon} alt="" />
                        </button>
                    </div>)
                )}

                <button onClick={()=>{navigate("/products");scrollTo(0,0)}} className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium">
                    <img className="group-hover:translate-x-1 transition" src={assets.arrow_right_icon_colored} alt="" />
                    Continue Shopping
                </button>

            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">{selectedAddress ? `${selectedAddress.street},${selectedAddress.city},${selectedAddress.state},${selectedAddress.country}`:"No address found"}</p>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-primary hover:underline cursor-pointer">
                            Change
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                               {addresses.map((addres)=>( <p onClick={() => {setSelectedAddress(addres);setShowAddress(false)}} className="text-gray-500 p-2 hover:bg-gray-100">
                                    {addres.street},{addres.city},{addres.state},{addres.country}
                                </p>))}
                               
                                <p onClick={() => {navigate("add-address");setShowAddress(false)}} className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10">
                                    Add address
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select onChange={e=>setPaymentOption(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>${getTotalAmount()}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>${getTotalAmount() *2 /100}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>${getTotalAmount() + getTotalAmount()*2/100}</span>
                    </p>
                </div>

                <button className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition"
                  onClick={handlePlaceOrder}
                >
                    {paymentOption === "COD" ? "Place Order" : "Procced To Cheakout" }
                </button>
            </div>
        </div>
    )
}

export default Cart;