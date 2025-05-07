import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Hero from '../Components/Layout/Hero'
import GenderCollection from '../Components/Product/GenderCollection'
import NewArrival from '../Components/Product/newArrivals'
import ProductDetails from '../Components/Product/ProductDetails'
import FeatureCollection from '../Components/Product/FeatureCollection'
import FeatureSection from '../Components/Product/FeatureSection'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductByFilters } from '../redux/Slice/product'

const Home = () => {
  const dispatch = useDispatch()
  const { product, loading, error } = useSelector((state) => state.product)
  const [bestSellerProducts, setBestSellerProducts] = useState(null)

  useEffect(() => {
    // Fetch specific product
    dispatch(fetchProductByFilters({
      gender: "Women",
      category: "Bottom Wear",
      limit: 8
    }))

    // Fetch best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/best-sellers`)
        setBestSellerProducts(response.data)
      } catch (error) {
        console.error("Error fetching best sellers:", error)
      }
    }

    fetchBestSeller()
  }, [dispatch])

  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrival />

      {/* Best Seller Section */}
      <h2 className='text-3xl text-center font-bold mb-4'>Best Sellers</h2>
      {bestSellerProducts ? (
        bestSellerProducts.map(product => (
          <ProductDetails key={product._id} productId={product._id} />
        ))
      ) : (
        <p className='text-center'>Loading best seller products...</p>
      )}

      <FeatureCollection />
      <FeatureSection />
    </div>
  )
}

export default Home
