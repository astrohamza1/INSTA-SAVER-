
import React from 'react';
import { APP_TITLE } from '../constants';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {currentYear} {APP_TITLE}. All rights reserved.</p>
        <p className="mt-2">
          This service is not affiliated with Instagram or Meta.
        </p>
        <div className="mt-4 flex justify-center space-x-4">
            <a href="#privacy" className="hover:text-pink-500">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#terms" className="hover:text-pink-500">Terms of Service</a>
            <span>&bull;</span>
            <a href="#contact" className="hover:text-pink-500">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};
