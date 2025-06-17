import { Link, useNavigate } from 'react-router-dom';

function CartPage({ cartItems, setCartItems }) {
  const navigate = useNavigate();

  const handleQuantityChange = (productId, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemove = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Giỏ hàng</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Giỏ hàng của bạn đang trống. <Link to="/" className="text-blue-600 underline">Tiếp tục mua sắm</Link></p>
      ) : (
        <>
          <div className="grid gap-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border p-4 rounded">
                <div className="flex gap-4 items-center">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-600">{item.price.toLocaleString()}₫</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >−</button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >+</button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="ml-4 text-red-500 hover:underline text-sm"
                  >Xoá</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <p className="text-lg font-bold">Tổng cộng: {total.toLocaleString()}₫</p>
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Thanh toán
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
