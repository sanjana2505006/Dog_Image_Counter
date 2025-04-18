import React from 'react';
import DogCard from './components/DogCard';
import { Dog } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Dog className="h-10 w-10 text-blue-500 mr-2" />
            <h1 className="text-4xl font-bold text-gray-800">Dog Breed Viewer</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Click the "Show Dog" button to fetch a random dog image and see its breed.
          </p>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <DogCard index={0} />
          <DogCard index={1} />
          <DogCard index={2} />
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-500 text-sm">
          <p>Images provided by the <a href="https://dog.ceo/dog-api/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Dog CEO API</a></p>
          <p className="mt-2">© {new Date().getFullYear()} Dog Breed Viewer</p>
        </div>
      </div>
    </div>
  );
}

export default App;