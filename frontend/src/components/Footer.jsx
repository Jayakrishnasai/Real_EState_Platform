import React from 'react';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-premium-900 border-t border-premium-800 text-gray-300 py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Home className="text-gold-500 w-8 h-8" />
              <span className="font-serif text-2xl font-bold tracking-wider text-white">AURA</span>
            </Link>
            <p className="text-sm">Premium real estate experiences for the modern world. Find your dream home today.</p>
          </div>
          <div>
            <h3 className="font-serif text-lg text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/properties" className="hover:text-gold-500 transition-colors">All Properties</Link></li>
              <li><Link to="/about" className="hover:text-gold-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-gold-500 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-gold-500 transition-colors cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-gold-500 transition-colors cursor-pointer">Terms of Service</span></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg text-white mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Subscribe to our newsletter for exclusive offers.</p>
            <div className="flex">
              <input type="email" placeholder="Email Address" className="px-4 py-2 w-full bg-premium-800 border border-premium-700 focus:outline-none focus:border-gold-500" />
              <button className="bg-gold-500 text-premium-900 px-4 py-2 font-semibold hover:bg-gold-400 transition-colors">Join</button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-premium-800 text-center text-sm">
          &copy; {new Date().getFullYear()} AURA Real Estate. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
