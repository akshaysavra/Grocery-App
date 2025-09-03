import React from 'react'
import MainBanner from './../component/MainBanner';
import Cetagories from '../component/Cetagories';
import BestSeller from '../component/BestSeller';
import BottomBanner from '../component/BottomBanner';
import NewsLatter from '../component/NewsLatter';

const Home = () => {
  return (
    <div className='m-10'>
        <MainBanner/>
        <Cetagories/>
        <BestSeller/>
        <BottomBanner/>
        <NewsLatter />
    </div>
  )
}

export default Home