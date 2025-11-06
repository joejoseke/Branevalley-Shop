import React from 'react';
import { Product } from '../types';
import { ShoppingCartIcon } from './icons';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewProduct: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewProduct }) => {
  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <div
      onClick={() => onViewProduct(product.id)}
      className="bg-surface rounded-lg overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col"
    >
      <div className="relative">
        <img className="w-full h-56 object-cover" src={product.imageUrl} alt={product.name} />
        <div className="absolute top-0 right-0 bg-accent text-background px-2 py-1 m-2 rounded-md text-sm font-semibold">{product.category}</div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-text-primary mb-2 truncate">{product.name}</h3>
        <p className="text-text-secondary text-sm flex-grow mb-4">{product.description.substring(0, 80)}...</p>
        <div className="flex items-center justify-between mt-auto">
          <p className="text-2xl font-bold text-primary">KES {product.price.toLocaleString()}</p>
          <button
            onClick={handleAddToCartClick}
            className="bg-secondary text-white font-bold py-2 px-4 rounded-full hover:bg-primary transition-colors flex items-center gap-2"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCartIcon className="w-5 h-5"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;