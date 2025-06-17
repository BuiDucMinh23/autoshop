import { Link } from 'react-router-dom';

function OrderSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center p-8">
      <div className="text-green-600 text-5xl mb-4">✅</div>
      <h1 className="text-3xl font-bold mb-2">Đặt hàng thành công!</h1>
      <p className="text-gray-600 mb-6">Cảm ơn bạn đã tin tưởng Sovera. Đơn hàng của bạn sẽ được xử lý sớm nhất.</p>
      <div className="flex gap-4">
        <Link
          to="/"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Quay lại trang chủ
        </Link>
        <Link
          to="/products"
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300"
        >
          Xem thêm sản phẩm
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccessPage;
