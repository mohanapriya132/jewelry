import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Offers from '../components/Offers'
import Reviews from '../components/Reviews'
import Brands from '../components/Brands'
import Footer from '../components/Footer'

export default function Home() {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/test`)
      .then((res) => {
        if (!res.ok) throw new Error(`Network response was not ok (status: ${res.status})`)
        return res.json()
      })
      .then((data) => {
        console.log('✅ Backend Connected Successfully')
        console.log('Backend Response:', data.message || data)
      })
      .catch((err) => {
        console.error('❌ Backend Connection Failed')
        console.error(err)
        console.warn('Troubleshooting suggestions:')
        console.warn('- Check if VITE_API_URL is correctly set in .env')
        console.warn('- Ensure your backend is running and deployed successfully on Render')
        console.warn('- Verify that CORS is enabled on the backend for this origin')
      })
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Categories />
      <Products />
      <Offers />
      <Reviews />
      <Brands />
      <Footer />
    </div>
  )
}
