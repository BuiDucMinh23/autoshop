import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

function Header({ cartItems = [] }) {
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      setShowSearch(false);
      setSearchTerm('');
    }
  };

  // ✅ Bắt sự kiện click ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };

    if (showSearch) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearch]);

  return (
    <header className="bg-green-900 text-white px-6 py-4">
      <div className="grid grid-cols-3 items-center">
        {/* Left - Nav */}
        <nav className="flex gap-6 text-sm">
          <Link to="/">Trang chủ</Link>
          <Link to="/products">Sản phẩm</Link>
        </nav>

        {/* Center - Logo */}
        <div className="flex justify-center">
          <Link to="/" className="flex items-center gap-2">
            <img src="/img/logo.jpg" alt="Sovera Logo" className="h-16 w-auto" />
          </Link>
        </div>

        {/* Right - Tools */}
        <div className="flex justify-end items-center gap-4 text-sm relative" ref={searchRef}>
          {!showSearch && (
            <button onClick={() => setShowSearch(true)} className="hover:underline">
              Search
            </button>
          )}

          {showSearch && (
            <div className="absolute top-full right-0 mt-2 bg-white p-2 rounded shadow-md flex items-center gap-2 z-50">
              <input
                type="text"
                placeholder="Tìm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-2 py-1 rounded text-black border"
              />
              <button
                onClick={handleSearch}
                className="bg-green-900 text-white px-3 py-1 rounded"
              >
                Tìm
              </button>
            </div>
          )}

          <span>Login</span>
          <Link to="/cart" className="relative">
            <ShoppingCart size={20} />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
