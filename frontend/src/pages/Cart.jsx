import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Cart() {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get('/cart');
        setCart(res.data.cart);
      } catch (err) {
        console.error('Failed to load cart');
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleCheckout = async () => {
    try {
      await api.post('/orders');
      alert('Order placed successfully!');
      navigate('/'); // or refresh cart
    } catch (err) {
      alert('Checkout failed');
    }
  };

  if (loading) return <p>Loading cart...</p>;

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.items.length === 0 ? (
        <p>Cart is empty. <Link to="/products">Add products</Link></p>
      ) : (
        <>
          <ul>
            {cart.items.map(item => (
              <li key={item.product}>
                Product ID: {item.product} - Qty: {item.quantity}
              </li>
            ))}
          </ul>
          <button
            onClick={handleCheckout}
            style={{ padding: '12px 24px', background: '#2196F3', color: 'white', border: 'none', marginTop: '20px' }}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}