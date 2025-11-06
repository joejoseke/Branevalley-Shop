import React, { useState } from 'react';
import { Product } from '../types';
import { getRecommendations } from '../services/geminiService';
import { WandSparklesIcon, XIcon } from './icons';

interface GadgetGuruProps {
  products: Product[];
  onViewProduct: (productId: number) => void;
}

const GadgetGuru: React.FC<GadgetGuruProps> = ({ products, onViewProduct }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');
  const [isSearched, setIsSearched] = useState(false);

  const handleRecommendation = async () => {
    if (!query.trim()) {
      setError('Please describe what you are looking for.');
      return;
    }
    setIsLoading(true);
    setError('');
    setIsSearched(true);
    setRecommendedProducts([]);
    try {
      const recommendedIds = await getRecommendations(query, products);
      const recs = products.filter(p => recommendedIds.includes(p.id));
      setRecommendedProducts(recs);
    } catch (err) {
      setError('Sorry, I couldn\'t find a recommendation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductClick = (productId: number) => {
    onViewProduct(productId);
    setIsOpen(false);
  }

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) { // Reset on open
        setQuery('');
        setRecommendedProducts([]);
        setError('');
        setIsSearched(false);
    }
  }

  return (
    <>
      <button
        onClick={toggleOpen}
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-secondary transition-transform transform hover:scale-110 z-50"
        aria-label="Open Gadget Guru Assistant"
      >
        <WandSparklesIcon className="w-8 h-8" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center animate-fade-in">
          <div className="bg-surface rounded-lg shadow-xl w-full max-w-2xl mx-4 p-6 relative animate-slide-in">
            <button onClick={toggleOpen} className="absolute top-4 right-4 text-text-secondary hover:text-text-primary">
              <XIcon className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-primary mb-2">Gadget Guru</h2>
            <p className="text-text-secondary mb-4">Describe what you need, and I'll find the perfect gadget for you!</p>

            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., 'A quiet mouse for the office'"
                className="flex-grow bg-background border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                onKeyDown={(e) => e.key === 'Enter' && handleRecommendation()}
              />
              <button onClick={handleRecommendation} disabled={isLoading} className="bg-secondary text-white font-bold py-2 px-4 rounded hover:bg-primary disabled:bg-gray-500">
                {isLoading ? 'Thinking...' : 'Find'}
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}

            <div className="mt-6 h-80 overflow-y-auto">
              {isLoading && <div className="text-center p-8">Searching for the best gear...</div>}
              {!isLoading && isSearched && recommendedProducts.length > 0 && (
                 <div>
                    <h3 className="font-semibold mb-2">Here are my recommendations:</h3>
                    <div className="space-y-3">
                        {recommendedProducts.map(p => (
                             <div key={p.id} onClick={() => handleProductClick(p.id)} className="flex items-center gap-4 p-2 bg-background rounded-md cursor-pointer hover:bg-gray-700">
                                <img src={p.imageUrl} alt={p.name} className="w-12 h-12 object-cover rounded"/>
                                <div>
                                    <p className="font-semibold text-text-primary">{p.name}</p>
                                    <p className="text-primary font-bold">KES {p.price.toLocaleString()}</p>
                                </div>
                             </div>
                        ))}
                    </div>
                 </div>
              )}
              {!isLoading && isSearched && recommendedProducts.length === 0 && (
                <div className="text-center p-8 text-text-secondary">
                    Sorry, I couldn't find any matching products for your request.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GadgetGuru;