import React from "react";
import { assets } from "./../assets/assets";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <div className="relative">
      <img
        src={assets.main_banner_bg}
        alt="banner"
        className="w-full hidden md:block"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="sm_banner"
        className="w-full md:hidden"
      />
      <div className="m-25  absolute inset-0 flek flex-col items-center md:items-start justify-end  md:justify-center pb-24 md:pb-0 px-4 md:p1-18 1g:p1-24">
        <h1 className="text-4xl md:text-4x1 lg:text-5x1 font-bold text-center md:text-left max-w-72 md:max-w-80 1g:max-w-105 leading-tight 1g:leading-15">
          Freshness You Can Trust, Saving You Wii Love!
        </h1>
        <div className="flex items-center mt-6 font-medium  ">
          <Link
            to="/products"
            className="flex group items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer"
          >
            Shop Now
            <img
              className="md:hidden transition group-focus:translate-x-1"
              src={assets.white_arrow_icon}
              alt="arrow"
            />
          </Link>
          <Link
            to="/products"
            className="group hidden md:flex  gap-2 px-9 py-3 cursor-pointer"
          >
            Explore Deals
            <img
              className=" transition  group-hover:translate-x-1"
              src={assets.black_arrow_icon}
              alt="arrow"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
