import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CheckoutPage({ cartItems = [], clearCart }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    district: '',
    address: '',
    note: '',
  });

  const [shippingMethod, setShippingMethod] = useState('fast');
  const shippingFee = shippingMethod === 'express' ? 35000 : 30000;
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const productTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const vatFee = productTotal * 0.1;
  const total = productTotal + vatFee + shippingFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckout = () => {
    alert(`Đơn hàng đã được đặt thành công!\nChúng tôi đã gửi email xác nhận tới ${formData.email}`);
    clearCart();
    navigate('/success');
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-10 gap-6">
      {/* Bên trái: Form nhập liệu 7 phần */}
      <div className="md:col-span-7 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Thông tin giao hàng</h2>

        {['name', 'phone', 'email', 'city', 'district', 'address'].map((field, i) => (
          <input
            key={i}
            type="text"
            name={field}
            placeholder={
              field === 'address'
                ? 'Nhập địa chỉ, tòa nhà...'
                : `Nhập ${field === 'name' ? 'họ và tên' : field}`
            }
            value={formData[field]}
            onChange={handleInputChange}
            className="w-full mb-3 px-4 py-2 border rounded"
          />
        ))}

        <h2 className="text-xl font-bold mt-6 mb-2">Phương thức giao hàng</h2>
        <div className="space-y-2">
          <label className="flex justify-between border px-4 py-2 rounded cursor-pointer">
            <div>
              <input
                type="radio"
                name="shipping"
                checked={shippingMethod === 'fast'}
                onChange={() => setShippingMethod('fast')}
              />{' '}
              Giao hàng tiêu chuẩn
            </div>
            <span>30.000₫</span>
          </label>

          <label className="flex justify-between border px-4 py-2 rounded cursor-pointer">
            <div>
              <input
                type="radio"
                name="shipping"
                checked={shippingMethod === 'express'}
                onChange={() => setShippingMethod('express')}
              />{' '}
              Giao hàng hỏa tốc
            </div>
            <span>35.000₫</span>
          </label>
        </div>

        <h2 className="text-xl font-bold mt-6 mb-2">Phương thức thanh toán</h2>
        <label className="flex items-center border px-4 py-2 rounded cursor-pointer">
          <input
            type="radio"
            name="payment"
            defaultChecked
            onChange={() => setPaymentMethod('cod')}
            className="mr-2"
          />
          Thanh toán khi giao hàng (COD)
        </label>

        <textarea
          name="note"
          value={formData.note}
          onChange={handleInputChange}
          className="w-full mt-4 px-4 py-2 border rounded"
          placeholder="Ghi chú đơn hàng"
        />
      </div>

      {/* Bên phải: 3 phần */}
      <div className="md:col-span-3 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h2>
        <ul className="space-y-4 max-h-72 overflow-y-auto pr-2">
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
              <div>
                <p className="font-semibold text-sm">{item.name}</p>
                <p className="text-sm text-gray-600">x{item.quantity}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="border-t mt-4 pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Phí sản phẩm:</span>
            <span>{productTotal.toLocaleString()}₫</span>
          </div>
          <div className="flex justify-between">
            <span>VAT (10%):</span>
            <span>{vatFee.toLocaleString()}₫</span>
          </div>
          <div className="flex justify-between">
            <span>Phí vận chuyển:</span>
            <span>{shippingFee.toLocaleString()}₫</span>
          </div>
          <div className="flex justify-between font-bold border-t pt-2">
            <span>Tổng cộng:</span>
            <span>{total.toLocaleString()}₫</span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          className="bg-black text-white px-6 py-3 mt-6 w-full rounded-full border border-gray-300 hover:bg-gray-800 transition duration-300 ease-in-out shadow-md"
        >
          Xác nhận mua hàng
        </button>
      </div>
    </div>
  );
}

export default CheckoutPage;
