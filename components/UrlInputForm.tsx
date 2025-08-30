
import React, { useState } from 'react';
import { MediaType } from '../types';
import { DownloadIcon } from './icons/DownloadIcon';

interface UrlInputFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
  mediaType: MediaType;
}

export const UrlInputForm: React.FC<UrlInputFormProps> = ({ onSubmit, isLoading, mediaType }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div className="relative">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={`Enter public Instagram ${mediaType} URL...`}
          disabled={isLoading}
          className="w-full pl-4 pr-12 py-4 text-lg bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-pink-500 focus:ring-pink-500 rounded-full transition-all duration-300 outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !url}
          className="absolute inset-y-0 right-0 flex items-center justify-center w-12 h-full text-white bg-pink-500 hover:bg-pink-600 rounded-full disabled:bg-pink-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          aria-label="Download Media"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <DownloadIcon className="h-6 w-6" />
          )}
        </button>
      </div>
    </form>
  );
};
