import { Product } from '../types';

const products: Product[] = [
  {
    id: 1,
    name: 'QuantumX Mechanical Keyboard',
    price: 16999,
    description: 'A high-performance mechanical keyboard with customizable RGB lighting and ultra-responsive switches. Perfect for gaming and typing.',
    imageUrl: 'https://picsum.photos/seed/mech_keyboard/600/400',
    category: 'Keyboards',
    specs: { 'Switches': 'Blue Mechanical', 'Backlight': 'Full RGB', 'Connectivity': 'USB-C' }
  },
  {
    id: 2,
    name: 'Stellar Pro Wireless Mouse',
    price: 11999,
    description: 'Ergonomic wireless mouse with a high-precision 16000 DPI sensor. Long-lasting battery and programmable buttons.',
    imageUrl: 'https://picsum.photos/seed/pro_mouse/600/400',
    category: 'Mice',
    specs: { 'DPI': '16000', 'Buttons': '8 Programmable', 'Battery': '70 hours' }
  },
  {
    id: 3,
    name: 'Stealth Silent Mouse',
    price: 6499,
    description: 'A whisper-quiet wireless mouse perfect for office environments or late-night work. Ergonomic design for all-day comfort.',
    imageUrl: 'https://picsum.photos/seed/silent_mouse/600/400',
    category: 'Mice',
    specs: { 'DPI': '2400', 'Buttons': '5', 'Feature': '90% Noise Reduction' }
  },
  {
    id: 4,
    name: 'Aura HD Webcam',
    price: 8999,
    description: 'Crystal clear 1080p HD webcam with a built-in noise-cancelling microphone. Ideal for streaming and video conferencing.',
    imageUrl: 'https://picsum.photos/seed/hd_webcam/600/400',
    category: 'Webcams',
    specs: { 'Resolution': '1080p Full HD', 'Microphone': 'Stereo', 'Focus': 'Autofocus' }
  },
  {
    id: 5,
    name: 'Nebula Gaming Headset',
    price: 19499,
    description: 'Immersive 7.1 surround sound gaming headset with a detachable microphone. Lightweight and comfortable for long sessions.',
    imageUrl: 'https://picsum.photos/seed/gaming_headset/600/400',
    category: 'Headsets',
    specs: { 'Sound': '7.1 Surround', 'Microphone': 'Detachable, Noise-Cancelling', 'Driver Size': '50mm' }
  },
  {
    id: 6,
    name: 'Orbit XL Mousepad',
    price: 3999,
    description: 'An extended gaming mousepad with a smooth cloth surface for precise tracking and a non-slip rubber base.',
    imageUrl: 'https://picsum.photos/seed/desk_mat/600/400',
    category: 'Accessories',
    specs: { 'Size': '900x400mm', 'Surface': 'Micro-woven Cloth', 'Base': 'Non-slip Rubber' }
  },
  {
    id: 7,
    name: 'Echo 7-in-1 USB-C Hub',
    price: 7999,
    description: 'Expand your connectivity with this 7-in-1 USB-C hub, featuring HDMI, SD card readers, and multiple USB-A ports.',
    imageUrl: 'https://picsum.photos/seed/usbc_hub/600/400',
    category: 'Accessories',
    specs: { 'Ports': '7', 'Video Output': '4K HDMI', 'Material': 'Aluminum' }
  },
  {
    id: 8,
    name: 'ErgoLift Laptop Stand',
    price: 4999,
    description: 'Adjustable aluminum laptop stand to improve ergonomics and cooling for your workspace.',
    imageUrl: 'https://picsum.photos/seed/laptop_stand/600/400',
    category: 'Accessories',
    specs: { 'Material': 'Aluminum Alloy', 'Adjustability': '6 levels', 'Compatibility': '10-17 inch laptops' }
  },
  {
    id: 9,
    name: 'TerraBolt 1TB External SSD',
    price: 14999,
    description: 'Blazing fast 1TB external SSD for backups and transferring large files. USB-C and USB-A compatible.',
    imageUrl: 'https://picsum.photos/seed/external_ssd/600/400',
    category: 'Storage',
    specs: { 'Capacity': '1TB', 'Speed': 'Up to 1050MB/s', 'Interface': 'USB 3.2 Gen 2' }
  },
  {
    id: 10,
    name: 'PowerGuard 8-Outlet Surge Protector',
    price: 3499,
    description: 'Protect your valuable electronics with this 8-outlet surge protector with 2 USB charging ports.',
    imageUrl: 'https://picsum.photos/seed/surge_protector/600/400',
    category: 'Accessories',
    specs: { 'Outlets': '8 AC', 'USB Ports': '2', 'Joule Rating': '2700' }
  }
];

export const getProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 500);
  });
};