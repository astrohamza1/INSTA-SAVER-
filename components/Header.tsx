
import React from 'react';
import { InstagramIcon } from './icons/InstagramIcon';
import { APP_TITLE } from '../constants';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center">
          <InstagramIcon className="h-8 w-8 text-pink-500" />
          <h1 className="ml-3 text-xl font-bold text-gray-800 dark:text-white">{APP_TITLE}</h1>
        </div>
      </div>
    </header>
  );
};
