import { useState, useEffect } from 'react'
import './App.css'
import { ProductCard } from './ProductCard'
import { DoublyLinkedCircularList } from './Node'

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

function App() {
  // Sample product data
  const sampleProducts: Product[] = [
    {
      id: 1,
      name: 'Laptop Pro',
      price: 1299.99,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop',
      description: 'High-performance laptop with 16GB RAM and 512GB SSD'
    },
    {
      id: 2,
      name: 'Wireless Headphones',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      description: 'Premium noise-cancelling wireless headphones with 30-hour battery'
    },
    {
      id: 3,
      name: 'Smart Watch',
      price: 349.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      description: 'Advanced fitness tracking and health monitoring smartwatch'
    },
    {
      id: 4,
      name: 'Camera 4K',
      price: 799.99,
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop',
      description: 'Professional 4K digital camera with 45MP sensor'
    },
    {
      id: 5,
      name: 'Tablet Display',
      price: 599.99,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop',
      description: 'Large display 12-inch tablet perfect for creative work'
    }
  ];

  // Create doubly linked circular list from sample products
  const createCircularList = (products: Product[]) => {
    const list = new DoublyLinkedCircularList();
    products.forEach(product => list.insert(product));
    return list.toArray();
  };

  const [products] = useState<Product[]>(() => createCircularList(sampleProducts));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // useEffect for auto-play carousel
  useEffect(() => {
    if (!isAutoPlay || products.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 4000); // Change product every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, products.length]);

  // Navigate to next product (circular behavior)
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    setIsAutoPlay(false);
  };

  // Navigate to previous product (circular behavior)
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
    setIsAutoPlay(false);
  };

  // Toggle auto-play
  const handleToggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  if (products.length === 0) {
    return <div className="app">No products available</div>;
  }

  return (
    <div className="app">
      <header>
        <h1>Product Carousel</h1>
        <p>Navigate through our products using the circular carousel</p>
      </header>

      <div className="carousel-container">
        <button className="nav-button prev-button" onClick={handlePrev} title="Previous Product">
          ❮
        </button>

        <div className="carousel-content">
          <ProductCard
            product={products[currentIndex]}
            currentIndex={currentIndex}
            totalProducts={products.length}
          />
        </div>

        <button className="nav-button next-button" onClick={handleNext} title="Next Product">
          ❯
        </button>
      </div>

      <div className="controls">
        <button
          className={`autoplay-button ${isAutoPlay ? 'active' : ''}`}
          onClick={handleToggleAutoPlay}
        >
          {isAutoPlay ? '⏸ Pause Auto-play' : '▶ Start Auto-play'}
        </button>
      </div>

      <div className="indicators">
        {products.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoPlay(false);
            }}
            title={`Go to product ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default App
