import React, { useEffect, useState } from 'react'
import { dummyProducts } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../component/ProductCard';

const AllProducts = () => {

    const [filteredProducts,setFilteredProduct] = useState([]);
    // const products = dummyProducts;
    const {searchQuery,products} = useAppContext();

    //this useEffect is used for filter out  product from value in serchQuery wich is inputed in search ba
    useEffect(()=>{
        if(searchQuery.length > 0){
            setFilteredProduct(products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
        ))}else{
            setFilteredProduct(products)
        }
        
    },[products,searchQuery])
    console.log("filter : ",filteredProducts)

  return (
    <div className='mt-16 flex flex-col'>
        <div className='flex flex-col items-end w-max'>
            <p className='tex-2xl font-medium uppercase '>All Products</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 mb-20'>
            {filteredProducts.filter((product)=>product.inStock).map((product,index)=>(
                <ProductCard key = {index} product = {product}/> 
            ))}


        </div>
    </div>
  )
}

export default AllProducts