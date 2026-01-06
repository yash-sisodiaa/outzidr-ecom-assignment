import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
      <h3>{product.name}</h3>
      <p>SKU: {product.sku}</p>
      <p>Price: ₹{product.basePrice}</p>
      <p>Stock: {product.inventory}</p>
      <Link to={`/product/${product._id}`}>View Details</Link>
    </div>
  );
}