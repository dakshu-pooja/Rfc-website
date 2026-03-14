import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import Deals from './pages/Deals'
import Layout from './components/Layout'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { LocationProvider } from './context/LocationContext'

function AppContent() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="menu" element={<Menu />} />
                        <Route path="cart" element={<Cart />} />
                        <Route path="deals" element={<Deals />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

function App() {
    return (
        <AuthProvider>
            <LocationProvider>
                <CartProvider>
                    <AppContent />
                </CartProvider>
            </LocationProvider>
        </AuthProvider>
    )
}

export default App
