"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaPlay, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const RightMain = () => {
  const [games, setGames] = useState({});
  const [categories, setCategories] = useState([]);
  const [visibleCategories, setVisibleCategories] = useState(2); // Initially show 2 categories
  const [loading, setLoading] = useState(true);
  const maxGamesPerCategory = 5; // Maximum 5 games per category

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('/api/games');
        const data = await response.json();
        
        if (data.games) {
          // Get all unique categories from games
          const allCategories = [...new Set(data.games.map(game => game.category))];
          
          // Group games by category
          const gamesByCategory = {};
          allCategories.forEach(category => {
            // Get games for this category (maximum 5)
            const categoryGames = data.games
              .filter(game => game.category === category)
              .slice(0, maxGamesPerCategory);
            
            // Only add category if it has games
            if (categoryGames.length > 0) {
              gamesByCategory[category] = categoryGames;
            }
          });
          
          setCategories(Object.keys(gamesByCategory));
          setGames(gamesByCategory);
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch games:", error);
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Function to load more categories
  const handleLoadMore = () => {
    setVisibleCategories(prev => Math.min(prev + 2, categories.length));
  };

  // Function to render media based on type
  const renderMedia = (game) => {
    if (game.type === "VIDEO") {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
          <div className="bg-red-600 rounded-full p-2">
            <FaPlay className="text-white" />
          </div>
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            {game.type}
          </span>
        </div>
      );
    } else {
      return (
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {game.type}
        </div>
      );
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading games...</div>;
  }

  return (
    <div className="w-full">
      {/* Categories displayed vertically */}
      {categories.slice(0, visibleCategories).map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-red-600">
            {category.replace("-", " ")} GAMES
          </h2>
          
          {games[category].length === 0 ? (
            <p className="text-gray-500">No games found in this category.</p>
          ) : (
            <div>
              {games[category].map((game) => (
                <Link href={`/game/${game._id}`} key={game._id} className="block mb-6">
                  <div>
                    <div className="relative overflow-hidden rounded-md mb-2">
                      <img 
                        src={game.url} 
                        alt={game.title} 
                        className="w-full h-48 object-cover"
                      />
                      {renderMedia(game)}
                      <div className="absolute bottom-0 left-0 bg-red-600 text-white text-xs px-2 py-1">
                        {game?.status}
                      </div>
                    </div>
                    <h3 className="font-medium text-lg text-white">{game.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {new Date(game.releaseDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          {/* Navigation arrows */}
          <div className="flex items-center space-x-2 mt-4 mb-8">
            <button className="p-2 border border-gray-700 text-gray-400 hover:bg-gray-800">
              <FaChevronLeft />
            </button>
            <button className="p-2 border border-gray-700 text-gray-400 hover:bg-gray-800">
              <FaChevronRight />
            </button>
          </div>
        </div>
      ))}

      {/* Load More button */}
      {visibleCategories < categories.length && (
        <div className="text-center mt-6 mb-8">
          <button 
            onClick={handleLoadMore}
            className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-400 transition-colors"
          >
            LOAD MORE
          </button>
        </div>
      )}
    </div>
  );
};

export default RightMain;