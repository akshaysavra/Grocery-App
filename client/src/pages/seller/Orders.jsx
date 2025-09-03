import React, { useEffect, useState } from 'react'
import { assets, dummyOrders } from '../../assets/assets'
import { useAppContext } from './../../context/AppContext';
import toast from 'react-hot-toast';

const Orders = () => {

  const [orders,setOrders] = useState([]);
  const {axios,isSeller} = useAppContext()

  const fetchOrders = async ()=>{
    // setOrders(dummyOrders)
    try {
        const {data} = await axios.get("/api/order/seller");
        console.log("data from se.ler ",data)
        if(data.sucess){
            setOrders(data.orders)
            // console.log("from inside of componeent ",data.orders[0].items[0].product.image)
        }
    } catch (error) {
        toast.error(error)
    }
  }

  useEffect(()=>{
    if(isSeller){fetchOrders()}
  },[isSeller])
  return orders && (
    <div className='no-scrollbar flex-1 h-[95vh] '>
     <div className="md:p-10 p-4 space-y-4">
            <h2 className="text-lg font-medium">Orders List</h2>
             {orders.map((order, index) => (
                <div key={index} className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800">
                    <div className="flex gap-5">
                        <img className="w-12 h-12 object-cover opacity-60" src={order?.items[0].product?.image[0]} alt="boxIcon" />
                        {/* {console.log("from inside of componeent ",order.items.product)} */}
                        {/* {console.log("from inside of componeent 2 ",order.items.product.image)} */}
                        <>
                            {order.items.map((item, index) => (
                                <div key={index} className="flex flex-col justify-center">
                                    <p className="font-medium">
                                        {item.product.name} <span className={`text-indigo-500 ${item.quantity < 2 && "hidden"}`}>x {item.quantity}</span>
                                    </p>
                                </div>
                            ))}
                        </>
                    </div>

                    <div className="text-sm md:text-base text-black/60">
                        <p className='font-medium mb-1'>{order.address.firstName} {order.address.lastName}</p>
                        <p>{order.address.street}, {order.address.city}, {order.address.state},{order.address.zipcode}, {order.address.country}</p>
                    </div>

                    <p className="font-medium text-base my-auto text-black/70">${order.amount}</p>

                    <div className="flex flex-col text-sm">
                        <p>Method: {order.paymentType}</p>
                        <p>Date: {order.orderDate}</p>
                        <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
                    </div>
                </div>
            ))}
        </div>
        </div>
  )
}

export default Orders