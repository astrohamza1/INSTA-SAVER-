
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { UrlInputForm } from './components/UrlInputForm';
import { MediaPreview } from './components/MediaPreview';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage';
import { Disclaimer } from './components/Disclaimer';
import { MediaType, MediaData } from './types';
import { resolveInstagramUrl } from './services/geminiService';
import { MEDIA_TYPES } from './constants';

const App: React.FC = () => {
  const [selectedType, setSelectedType] = useState<MediaType>(MediaType.Post);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mediaData, setMediaData] = useState<MediaData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetchMedia = useCallback(async (url: string) => {
    if (!url || !url.trim().startsWith('http')) {
      setError('Please enter a valid Instagram URL.');
      return;
    }
    setIsLoading(true);
    setMediaData(null);
    setError(null);

    try {
      const response = await resolveInstagramUrl(url, selectedType);
      if ('error' in response) {
        setError(response.error);
      } else {
        setMediaData(response);
      }
    } catch (e) {
      setError('An unexpected error occurred. Please try again later.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [selectedType]);

  const handleReset = () => {
    setMediaData(null);
    setError(null);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
            Instagram Public Media Downloader
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Paste a public Instagram link to download Posts, Reels, Stories, and more.
          </p>
        </div>

        <div className="mt-8 max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {MEDIA_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => {
                  setSelectedType(type);
                  handleReset();
                }}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                  selectedType === type
                    ? 'bg-pink-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          
          {!mediaData && (
             <UrlInputForm
              onSubmit={handleFetchMedia}
              isLoading={isLoading}
              mediaType={selectedType}
            />
          )}

          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} onClear={() => setError(null)} />}
          
          {mediaData && (
             <MediaPreview data={mediaData} onReset={handleReset} />
          )}
          
        </div>

        <Disclaimer />
      </main>
      <Footer />
    </div>
  );
};

export default App;
