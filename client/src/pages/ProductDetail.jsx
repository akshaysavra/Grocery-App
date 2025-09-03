import React, { useEffect } from "react"

import { Link, useParams } from "react-router-dom";
import { assets} from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../component/ProductCard";

const ProductDetail = () => {

   const {products,addToCart ,navigate} = useAppContext()
   const {id} = useParams();

    const [thumbnail, setThumbnail] = React.useState(null);
    const [relatedProducts, setRelatedProducts] = React.useState([]);
    const product = products.find((item)=>item._id == id)
    useEffect(()=>{
        let productCopy = products.slice();
        productCopy = productCopy.filter((item)=>item.category.toLowerCase() === product.category.toLowerCase() )
        setRelatedProducts(productCopy)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[products])
    useEffect(()=>{
        setThumbnail(product?.image[0] ? product.image[0] : null)
    },[product])
    console.log("product : ",relatedProducts)

    

    return product && (
        <div className="mt-10">
            <p>
                <Link to='/'>Home</Link> /
                <Link to='/products'> Products</Link> /
                <Link to={`/products/${product.category.toLowerCase()}`}> {product.category}</Link> /
                <span className="text-primary"> {product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {product.image.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                        <img src={thumbnail} alt="Selected product" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{product.name}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill('').map((_, i) => (
                           
                               <img src={i<4 ? assets.star_icon : assets.star_dull_icon} alt="" />
                            
                        ))}
                        <p className="text-base ml-2">(4)</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">MRP: ${product.price}</p>
                        <p className="text-2xl font-medium">MRP: ${product.offerPrice}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                        {product.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div className="flex items-center mt-10 gap-4 text-base">
                        <button onClick={()=>addToCart()} className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
                            Add to Cart
                        </button>
                        <button  onClick={()=>{
                            navigate("/cart");
                            scrollTo(0,0)}}
             className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition" >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex flex-col items-center w-max mt-10 '>
            <p className='tex-3xl items-center font-medium uppercase '>Related Products</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'></div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 mb-20'>
                {relatedProducts.filter((item)=>item.inStock).slice(0,5).map((product,index)=>(
                    <ProductCard key={index} product={product} />
                ))}
            </div>
            <button onClick={()=>navigate("/products")} className="mx-auto cursor-pointer px-12 my-5 border rounded text-primary hover:bg-primary/10 transition"
            >See More</button>
        </div>
        </div>
    );
};

export default ProductDetail;