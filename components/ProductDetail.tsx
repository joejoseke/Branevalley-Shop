import React from 'react';
import { Product } from '../types';
import { ArrowLeftIcon } from './icons';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, onBack }) => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-primary hover:underline mb-6"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Back to Products
      </button>

      <div className="bg-surface rounded-lg shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-64 w-full object-cover md:h-full md:w-96" src={product.imageUrl} alt={product.name} />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-accent font-semibold">{product.category}</div>
            <h1 className="block mt-1 text-3xl leading-tight font-extrabold text-text-primary">{product.name}</h1>
            <p className="mt-4 text-text-secondary">{product.description}</p>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-text-primary">Specifications</h3>
              <ul className="mt-2 list-disc list-inside text-text-secondary space-y-1">
                {Object.entries(product.specs).map(([key, value]) => (
                    <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <span className="text-4xl font-bold text-primary">KES {product.price.toLocaleString()}</span>
              <button
                onClick={() => onAddToCart(product)}
                className="bg-secondary text-white font-bold py-3 px-8 rounded-full hover:bg-primary transition-colors text-lg"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;