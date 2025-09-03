/* eslint-disable no-unused-vars */
import React from "react"
// import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({product}) => {
    // console.log("product card prop :" ,product)
    const [count, setCount] = React.useState(0);
    const {currency,cartItems,addToCart,updateCart,removeFromCart,navigate,products} = useAppContext();
    const {name,category,_id,image,offerPrice,price} = products;
    // const products = du
    
    // console.log("product card ", category)
    return products[0] && (
        <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full mt-10">
            <div  onClick={()=>{
            navigate(`/products/${product.category}/${product._id}`);
            scrollTo(0,0)

        }} className="group cursor-pointer flex items-center justify-center px-2">
                <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" src={product.image[0]}  />
            </div>
            <div className="text-gray-500/60 text-sm">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (
                        (
                            <img src={i<4 ?assets.star_icon:assets.star_dull_icon} alt="" />
                        ) 
                    ))}
                    <p>(4)</p>
                </div>
                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium text-primary">
                      ${product.offerPrice}{" "} <span className="text-gray-500/60 md:text-sm text-xs line-through">${product.price}</span>
                    </p>
                    <div className="text-primary">
                        {!cartItems[product._id]?(
                            <button className="flex items-center justify-center gap-1 bg-primary/10 border border-primary md:w-[80px] w-[64px] h-[34px] rounded text-primary font-medium" onClick={() => addToCart(product._id)} >
                               <img src={assets.cart_icon} alt="" />
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                                <button onClick={() => removeFromCart(product._id)} className="cursor-pointer text-md px-2 h-full" >
                                    -
                                </button>
                                <span className="w-5 text-center">{cartItems[product.   _id]}</span>
                                <button onClick={() => addToCart(product._id)} className="cursor-pointer text-md px-2 h-full" >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductCard;