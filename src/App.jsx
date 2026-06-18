import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Products from './components/Products'
import Offers from './components/Offers'
import Reviews from './components/Reviews'
import Brands from './components/Brands'
import Footer from './components/Footer'

function App() {
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

export default App
