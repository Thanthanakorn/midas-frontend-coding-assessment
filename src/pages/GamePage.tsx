import { useState } from "react";
import { useGameDetail } from "../hooks/useGameDetail";
import { Loader } from "../components/Loader";
import { ErrorMessage } from "../components/ErrorMessage";

interface GamePageProps {
  gameId: number;
  onBack: () => void;
}

export function GamePage({ gameId, onBack }: GamePageProps) {
  const { game, loading, error } = useGameDetail(gameId);
  const [selectedImage, setSelectedImage] = useState(0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <button
          onClick={onBack}
          className="mb-4 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Games
        </button>
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!game) {
    return null;
  }

  const allImages = game.screenshots && game.screenshots.length > 0 
    ? game.screenshots 
    : [game.thumbnail];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Games
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Title */}
          <div className="px-8 pt-8 pb-4 border-b border-gray-200">
            <h1 className="text-4xl font-bold text-gray-900">{game.title}</h1>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-8 p-8">
            {/* Left Side - Screenshots Slider (65%) */}
            <div className="lg:w-[65%]">
              {/* Main Image */}
              <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
                <img
                  src={allImages[selectedImage]}
                  alt={`${game.title} screenshot ${selectedImage + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/800x450?text=No+Image';
                  }}
                />
              </div>

              {/* Thumbnail Slider */}
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-24 h-16 rounded-md overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-blue-600 ring-2 ring-blue-300"
                          : "border-gray-300 hover:border-blue-400"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/96x64?text=No+Image';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side - Game Details (35%) */}
            <div className="lg:w-[35%] flex flex-col gap-6">
              {/* Thumbnail */}
              <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                  }}
                />
              </div>

              {/* Category */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Category</h3>
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {game.category}
                </span>
              </div>

              {/* Rating */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Rating</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-yellow-50 px-4 py-2 rounded-lg">
                    <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-2xl font-bold text-gray-900">
                      {game.rating ? game.rating.toFixed(1) : 'N/A'}
                    </span>
                    <span className="text-sm text-gray-500">/ 5.0</span>
                  </div>
                </div>
              </div>

              {/* Release Date */}
              {game.releaseDate && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Release Date</h3>
                  <p className="text-gray-900 font-medium">{new Date(game.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              )}

              {/* Description */}
              {game.description && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{game.description}</p>
                </div>
              )}

              {/* Features */}
              {game.features && game.features.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Features</h3>
                  <ul className="space-y-2">
                    {game.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
