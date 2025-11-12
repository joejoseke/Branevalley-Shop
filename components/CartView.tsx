import React from 'react';
import { CartItem } from '../types';
import { ArrowLeftIcon, MinusIcon, PlusIcon, XIcon } from './icons';

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
  onBack: () => void;
}

const CartView: React.FC<CartViewProps> = ({ cartItems, onUpdateQuantity, onRemoveFromCart, onBack }) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-primary hover:underline mb-6"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Continue Shopping
      </button>

      <div className="bg-surface rounded-lg shadow-xl p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-text-primary">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-text-secondary text-center py-12">Your cart is empty.</p>
        ) : (
          <div>
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-background rounded-md">
                  <div className="flex items-center gap-4 flex-grow w-full">
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-text-primary">{item.name}</h3>
                      <p className="text-text-secondary text-sm">KES {item.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center border border-gray-600 rounded">
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-2 disabled:opacity-50" disabled={item.quantity <= 1} aria-label="Decrease quantity"><MinusIcon className="w-4 h-4" /></button>
                      <span className="px-3 tabular-nums">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-2" aria-label="Increase quantity"><PlusIcon className="w-4 h-4" /></button>
                    </div>
                    <p className="font-semibold w-24 text-right">KES {(item.price * item.quantity).toLocaleString()}</p>
                    <button onClick={() => onRemoveFromCart(item.id)} className="text-gray-500 hover:text-red-500 p-2" aria-label={`Remove ${item.name} from cart`}><XIcon className="w-5 h-5" /></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-gray-700 flex justify-end">
              <div className="w-full max-w-sm">
                <div className="flex justify-between text-lg">
                  <span className="text-text-secondary">Subtotal</span>
                  <span className="font-semibold text-text-primary">KES {subtotal.toLocaleString()}</span>
                </div>
                <p className="text-text-secondary text-sm mt-2">Taxes and shipping calculated at checkout.</p>
                <button className="w-full bg-primary text-white font-bold py-3 mt-4 rounded-lg hover:bg-secondary transition-colors">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartView;