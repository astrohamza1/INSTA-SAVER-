
import React from 'react';
import { DISCLAIMER_TEXT } from '../constants';

export const Disclaimer: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto mt-12 p-4 bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-300 rounded-r-lg">
      <h4 className="font-bold">Disclaimer</h4>
      <p className="text-sm mt-1">{DISCLAIMER_TEXT}</p>
    </div>
  );
};
