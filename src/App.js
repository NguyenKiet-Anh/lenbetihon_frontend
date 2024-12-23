import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Category from './pages/Category';
import Product from './pages/Product';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Signup from './pages/Signup';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Profile from './pages/Profile';
import { AuthProvider } from './AuthContext';
import Wishlist from './components/Wishlist/Wishlist';

function App() {
    return (
        <div>
            <BrowserRouter>
                <AuthProvider>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/small" element={<Category category="Móc nhỏ" />} />
                        <Route path="/big" element={<Category category="Móc lớn" />} />
                        <Route path="/product" element={<Product />}>
                            <Route path=":productId" element={<Product />} />
                        </Route>
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                    </Routes>
                    <Footer />
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
