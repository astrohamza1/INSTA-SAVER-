
import React from 'react';
import { MediaData } from '../types';
import { DownloadIcon } from './icons/DownloadIcon';

interface MediaPreviewProps {
  data: MediaData;
  onReset: () => void;
}

export const MediaPreview: React.FC<MediaPreviewProps> = ({ data, onReset }) => {
  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <img
          src={data.thumbnailUrl}
          alt={data.title}
          className="w-40 h-40 object-cover rounded-lg shadow-md"
        />
        <div className="flex-1 text-center sm:text-left">
          <p className="text-gray-500 dark:text-gray-400 text-sm">@{data.author}</p>
          <h3 className="font-semibold text-lg line-clamp-2">{data.title}</h3>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        <h4 className="font-bold text-center">Download Links</h4>
        {data.sources.map((source, index) => (
          <a
            key={index}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="w-full flex items-center justify-between px-4 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors shadow-sm"
          >
            <span className="font-semibold">Download ({source.quality})</span>
            <DownloadIcon className="h-5 w-5" />
          </a>
        ))}
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={onReset}
          className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-full hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
        >
          Download Another
        </button>
      </div>
    </div>
  );
};
