import { useParams } from 'react-router-dom';
import products from '../data/products';

function ProductDetailPage({ setCartItems }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div className="p-8 text-red-600">Sản phẩm không tồn tại.</div>;
  }

  const handleAddToCart = () => {
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

  return (
    <div className="p-8 flex flex-col md:flex-row gap-8">
      <img
        src={product.image}
        alt={product.name}
        className="w-full md:w-1/2 rounded-xl object-cover max-h-[500px]"
      />
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-xl font-semibold text-pink-600 mb-6">
          {product.price.toLocaleString()}₫
        </p>
        <button
          onClick={handleAddToCart}
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}

export default ProductDetailPage;
