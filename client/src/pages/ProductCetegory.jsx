import React from 'react'
import { categories, dummyProducts } from './../assets/assets';
import { useParams } from 'react-router-dom';
import ProductCard from '../component/ProductCard';

const ProductCetegory = () => {

    const products = dummyProducts;
    const {category} = useParams();
    const searchProduct = categories.find((item)=>item.path.toLowerCase() === category)
    const filteredProducts = products.filter((product)=>product.category.toLowerCase()===category)
  return (
    <div  className='mt-16 flex flex-col'>
         {searchProduct && (<div className='flex flex-col  w-max'>
            <p className='tex-2xl font-medium uppercase '>{searchProduct.text.toUpperCase()}</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'> 
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 mb-20'>
                 {filteredProducts.filter((product)=>product.inStock).map((product,index)=>(
                    <ProductCard key = {index} product={product}/>
                ))}
            </div>
        </div>)}
    </div>
  )
}

export default ProductCetegory