import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import WeddingCollectionPage from './pages/WeddingCollectionPage'
import ProductDetails from './pages/ProductDetails'
import ContactUs from './pages/ContactUs'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections/wedding" element={<WeddingCollectionPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
