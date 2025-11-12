import React from 'react';
import { ShoppingCartIcon } from './icons';
import { View } from '../types';

interface HeaderProps {
  cartItemCount: number;
  onNavigate: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-sm shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="text-2xl sm:text-3xl font-bold text-text-primary tracking-wider cursor-pointer"
            onClick={() => onNavigate('list')}
          >
            Gadget <span className="text-primary">Galaxy</span>
          </div>
          <button
            onClick={() => onNavigate('cart')}
            className="relative p-2 rounded-full text-text-secondary hover:text-text-primary hover:bg-gray-700 transition-colors"
            aria-label="Open Shopping Cart"
          >
            <ShoppingCartIcon className="w-7 h-7" />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;