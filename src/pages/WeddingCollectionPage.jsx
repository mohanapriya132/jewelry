import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WeddingCollection from '../components/WeddingCollection'

export default function WeddingCollectionPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <WeddingCollection />
      <Footer />
    </div>
  )
}
