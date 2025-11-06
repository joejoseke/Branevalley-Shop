import React, { useState, useEffect, useCallback } from 'react';
import { Product, CartItem, CurrentView, View } from './types';
import { getProducts } from './services/productService';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import CartView from './components/CartView';
import GadgetGuru from './components/GadgetGuru';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentView, setCurrentView] = useState<CurrentView>({ view: 'list' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = useCallback((product: Product) => {
    setCartItems(prevItems => {
      const itemInCart = prevItems.find(item => item.id === product.id);
      if (itemInCart) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  }, []);

  const handleRemoveFromCart = useCallback((productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const handleUpdateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, [handleRemoveFromCart]);

  const handleNavigate = useCallback((view: View) => {
    setCurrentView({ view });
  }, []);
  
  const handleViewProduct = useCallback((productId: number) => {
      setCurrentView({ view: 'detail', productId });
  }, []);

  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center p-10">Loading Products...</div>;
    }

    switch (currentView.view) {
      case 'detail':
        const product = products.find(p => p.id === currentView.productId);
        if (product) {
          return <ProductDetail product={product} onAddToCart={handleAddToCart} onBack={() => handleNavigate('list')} />;
        }
        // Fallback if product not found
        handleNavigate('list'); 
        return null;

      case 'cart':
        return <CartView cartItems={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemoveFromCart={handleRemoveFromCart} onBack={() => handleNavigate('list')} />;
      
      case 'list':
      default:
        return (
          <div className="container mx-auto p-4 sm:p-6 lg:p-8">
             <h1 className="text-3xl font-extrabold text-text-primary mb-2 animate-slide-in">Computer Accessories</h1>
             <p className="text-text-secondary mb-8 animate-slide-in" style={{ animationDelay: '100ms' }}>Find the perfect gear to complete your setup.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map(p => (
                <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} onViewProduct={handleViewProduct} />
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header cartItemCount={cartItemCount} onNavigate={handleNavigate} />
      <main>
        {renderContent()}
      </main>
      <GadgetGuru products={products} onViewProduct={handleViewProduct} />
    </div>
  );
};

export default App;