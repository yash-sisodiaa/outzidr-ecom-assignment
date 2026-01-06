import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data.product);
      } catch (err) {
        console.error('Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      await api.post('/cart', { productId: id, quantity });
      alert('Added to cart!');
    } catch (err) {
      alert('Failed to add to cart');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>SKU: {product.sku}</p>
      <p>Base Price: ₹{product.basePrice}</p>
      <p>Inventory: {product.inventory}</p>

      <div style={{ margin: '20px 0' }}>
        <label>Quantity: </label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
          style={{ width: '80px', marginLeft: '10px' }}
        />
      </div>

      <button
        onClick={addToCart}
        style={{ padding: '10px 20px', background: '#4CAF50', color: 'white', border: 'none' }}
      >
        Add to Cart
      </button>
    </div>
  );
}