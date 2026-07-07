import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import BrandRegister from './pages/BrandRegister'
import ManufacturerRegister from './pages/ManufacturerRegister'
import Dashboard from './pages/Dashboard'
import Chat from './pages/Chat'
import Pricing from './pages/Pricing'
import About from './pages/About'
import Admin from './pages/Admin'
import Layout from './components/Layout'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brand-register" element={<BrandRegister />} />
        <Route path="/manufacturer-register" element={<ManufacturerRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Layout>
  )
}
