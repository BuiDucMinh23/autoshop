import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ProductDetailPage({ setCartItems }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // ✅ URL của Google Apps Script Web API
  const sheetURL = 'https://script.google.com/macros/s/AKfycbxPXFW4qcR_lQfUzx_-pQ-H1gjxDf55i54v_KuB-_44ZuwKhRA8aZ9w96hjByMB5qME/exec';

  useEffect(() => {
    fetch(sheetURL)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p.id.toString() === id.toString());
        setProduct(found);
      })
      .catch((err) => {
        console.error('Lỗi khi tải sản phẩm:', err);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
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

  if (!product) {
    return <div className="p-8 text-gray-500">Đang tải sản phẩm...</div>;
  }

  return (
    <div className="p-8 flex flex-col md:flex-row gap-8">
      <img
        src={product.image}
        alt={product.name}
        className="w-full md:w-1/2 rounded-xl object-cover max-h-[500px]"
      />
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description || 'Không có mô tả'}</p>
        <p className="text-xl font-semibold text-pink-600 mb-6">
          {Number(product.price).toLocaleString()}₫
        </p>
        <p className="text-sm text-gray-500 mb-2">Đã bán: {product.sold || 0}</p>
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
