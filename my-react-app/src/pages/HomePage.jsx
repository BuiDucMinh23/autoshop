import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

function HomePage({ setCartItems }) {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [maxPrice, setMaxPrice] = useState(1000000);
  const navigate = useNavigate();

  // Fetch dữ liệu từ Google Sheets hoặc API khác
  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbxPXFW4qcR_lQfUzx_-pQ-H1gjxDf55i54v_KuB-_44ZuwKhRA8aZ9w96hjByMB5qME/exec')
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((item, index) => ({
          id: item.id || index,
          name: item.name,
          price: Number(item.price),
          image: item.image,
          category: item.category,
          reviews: Number(item.reviews || 0),
          sold: Number(item.sold || 0),
        }));
        setProducts(mapped);
      })
      .catch((err) => console.error('Lỗi khi load sản phẩm:', err));
  }, []);

  const categories = ['Tất cả', ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      selectedCategory === 'Tất cả' || product.category === selectedCategory;
    const matchPrice = product.price <= maxPrice;
    return matchCategory && matchPrice;
  });

  const handleAddToCart = (product, e) => {
    e.stopPropagation(); // tránh chuyển trang khi bấm nút giỏ hàng
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="p-6 font-sans">
      {/* Banner */}
      <div className="w-full mb-6">
        <img
          src="/img/banner.jpg"
          alt="Banner Sovera"
          className="w-full h-90 object-cover rounded-xl shadow-md"
        />
      </div>

      {/* Bộ lọc */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
        <div>
          <label className="mr-2 font-semibold">Loại sản phẩm:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1 rounded border"
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mr-2 font-semibold">Giá tối đa:</label>
          <input
            type="range"
            min="0"
            max="1000000"
            step="50000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-60"
          />
          <span className="ml-2 text-sm">{maxPrice.toLocaleString()}₫</span>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => handleCardClick(product.id)}
            className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-52 object-cover"
            />
            <div className="p-4 relative">
              <h2 className="text-[16px] font-semibold text-gray-800">
                {product.name}
              </h2>
              <p className="text-[18px] font-bold text-gray-900 mt-1">
                {product.price.toLocaleString()}₫
              </p>

              {/* Sao + đã bán */}
              <div className="flex items-center justify-between mt-2 text-sm">
                <div className="text-green-500">
                  {'★'.repeat(5)} <span className="text-gray-500 ml-1">({product.reviews})</span>
                </div>
                <span className="text-gray-500">Đã bán: {product.sold}</span>
              </div>

              {/* Nút giỏ hàng */}
              <button
                onClick={(e) => handleAddToCart(product, e)}
                className="absolute bottom-4 right-4 bg-pink-100 text-pink-500 p-2 rounded-full hover:bg-pink-200"
              >
                <ShoppingCart size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
