import React from 'react'
import Hero from '../Components/Layout/Hero'
import GenderCollection from '../Components/Product/GenderCollection'
import NewArival from '../Components/Product/newArrivals'
import ProductDetails from '../Components/Product/ProductDetails'
import FeatureCollection from '../Components/Product/FeatureCollection'
import FeatureSection from '../Components/Product/FeatureSection'
const Home = () => {
  return (
    <div>
      <Hero/>
      <GenderCollection/>
      <NewArival/>  
      
    {/* best seller */}
    <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
    
    <ProductDetails/>
    <FeatureCollection/>
    <FeatureSection/>
    </div>
  )
}

export default Home
