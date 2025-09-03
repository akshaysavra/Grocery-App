import React from "react";
import { categories} from "../assets/assets";
import { useAppContext } from "../context/AppContext";



const Cetagories = () => {
    const {navigate} = useAppContext();
  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Categories</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6">
        { categories.map((cetagory,index)=> (<div key={index} onClick={()=>{
            navigate(`/products/${cetagory.path.toLowerCase()}`)
            scrollTo(0,0)
        }} style={{background : cetagory.bgColor}} className="group cursor-pointer py-5 px-3 gap-2 rounded-1g flex flex-col justify-center items-center">
          <img
            src={cetagory.image}
            alt={cetagory.text}
            
            
            className="group-hover:scale-108 transition max-w-28"
          />
          <p className="text-sm font-medium">{cetagory.text}</p>
        </div>))}
      </div>
    </div>
  );
};

export default Cetagories;
