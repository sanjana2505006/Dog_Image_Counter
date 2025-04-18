import React, { useState } from 'react';
import { ImageOff, Loader2 } from 'lucide-react';

interface DogCardProps {
  index: number;
}

const DogCard: React.FC<DogCardProps> = ({ index }) => {
  const [dogImage, setDogImage] = useState<string>('');
  const [breedName, setBreedName] = useState<string>('');
  const [counter, setCounter] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const extractBreedName = (url: string): string => {
    try {
      // Extract breed name from URL pattern: https://images.dog.ceo/breeds/[breed]/[image.jpg]
      const urlParts = url.split('/');
      const breedPart = urlParts[4]; // Get the breed part
      
      // Format the breed name to look nice (capitalize first letter of each word)
      const formattedBreed = breedPart
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      return formattedBreed;
    } catch (error) {
      console.error('Error extracting breed name:', error);
      return 'Unknown Breed';
    }
  };

  const fetchDogImage = async () => {
    setIsLoading(true);
    setError(null);
    setImageLoaded(false);
    
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      
      if (!response.ok) {
        throw new Error('Failed to fetch dog image');
      }
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setDogImage(data.message);
        setBreedName(extractBreedName(data.message));
        setCounter(prevCounter => prevCounter + 1);
      } else {
        throw new Error('API returned unsuccessful status');
      }
    } catch (error) {
      console.error('Error fetching dog image:', error);
      setError('Failed to fetch dog image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Set of colors for variety between cards
  const cardColors = [
    'bg-blue-50 border-blue-200',
    'bg-purple-50 border-purple-200',
    'bg-teal-50 border-teal-200'
  ];
  
  const buttonColors = [
    'bg-blue-500 hover:bg-blue-600',
    'bg-purple-500 hover:bg-purple-600',
    'bg-teal-500 hover:bg-teal-600'
  ];

  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${cardColors[index % 3]} border transition-all duration-300 hover:shadow-lg`}>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-3 h-16 flex items-center justify-center text-center">
          {breedName || 'Dog Breed'}
        </h2>
        
        <div className="w-full h-64 bg-gray-100 rounded-md mb-4 overflow-hidden flex items-center justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
              <p className="text-sm text-gray-500 mt-2">Fetching dog...</p>
            </div>
          ) : dogImage ? (
            <img 
              src={dogImage} 
              alt={breedName} 
              className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <ImageOff className="w-8 h-8" />
              <p className="text-sm text-gray-500 mt-2">No image yet</p>
            </div>
          )}
        </div>
        
        {error && (
          <div className="mb-3 p-2 bg-red-100 text-red-700 text-sm rounded">
            {error}
          </div>
        )}

        <button 
          onClick={fetchDogImage}
          disabled={isLoading}
          className={`w-full ${buttonColors[index % 3]} text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Loading...
            </span>
          ) : (
            'Show Dog'
          )}
        </button>

        <div className="mt-3 text-center">
          <p className="text-sm text-gray-600">
            Clicks: <span className="font-bold text-gray-800">{counter}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DogCard;