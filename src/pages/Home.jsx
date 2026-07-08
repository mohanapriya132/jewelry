import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Offers from '../components/Offers'
import Reviews from '../components/Reviews'
import Brands from '../components/Brands'
import Footer from '../components/Footer'

export default function Home() {
  const [backendMessage, setBackendMessage] = useState('')
  const [connectionStatus, setConnectionStatus] = useState('loading') // 'loading', 'success', 'error'

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/test`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then((data) => {
        setBackendMessage(data.message)
        setConnectionStatus('success')
      })
      .catch((err) => {
        console.error("Error fetching backend:", err)
        setConnectionStatus('error')
      })
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Backend Connection Status Banner */}
      {connectionStatus === 'success' && (
        <div className="bg-green-100 text-green-800 p-2 text-center text-sm font-medium border-b border-green-200">
          ✅ Backend Connected Successfully <br/>
          <span className="font-normal text-green-700">Response: {backendMessage}</span>
        </div>
      )}
      
      {connectionStatus === 'error' && (
        <div className="bg-red-100 text-red-800 p-2 text-center text-sm font-medium border-b border-red-200">
          ❌ Backend Connection Failed <br/>
          <span className="font-normal text-red-700">Check your API URL, CORS settings, or network connection.</span>
        </div>
      )}

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
