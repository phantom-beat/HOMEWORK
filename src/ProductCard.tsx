interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
  currentIndex: number;
  totalProducts: number;
}

export function ProductCard({ product, currentIndex, totalProducts }: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="description">{product.description}</p>
        <p className="price">${product.price.toFixed(2)}</p>
        <p className="counter">{currentIndex + 1} / {totalProducts}</p>
      </div>
    </div>
  );
}
