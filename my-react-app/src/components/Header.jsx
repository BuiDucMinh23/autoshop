import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

function Header({ cartItems = [] }) {
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
        <div className="flex justify-end items-center gap-4 text-sm">
          <span>Search</span>
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
