"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";
import Link from "next/link";

const paragraphs = [
  "Such a Sharp Pain [V0.11.6R] ",
  "College Daze [v0.517a]",
  "Milftoon Drama [v0.35]",
  "Rogue-Love Evolution 2 [v0.1]",
  "A Family Venture [v0.09 v2 Alpha]",
  "A House In The Rift [v0.7.17]",
  "Helping the Hotties [v1.0.4.10.5] [Completed]",
  "Photo Hunt [v0.18.1 Extra]",
  "A Wife And Mother [v0.220]",
  "MILFs of Sunville [S2 v9]",
];

// All available categories from your schema
const CATEGORIES = [
  "ACTION",
  "ADVENTURE",
  "COMEDY",
  "DRAMA",
  "FAMILY",
  "FANTASY",
  "HORROR",
  "MUSIC",
  "MYSTERY",
  "ROMANCE",
  "SCI-FI",
  "SPORTS",
  "THRILLER",
  "WAR",
  "ANIMATION"
];

const GamesWebsite = () => {
  const [index, setIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [games, setGames] = useState([]);
  const [gamesByCategory, setGamesByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalGames, setTotalGames] = useState(0);
  const [displayedCategories, setDisplayedCategories] = useState([]);
  const gamesPerPage = 15;
  const gamesPerCategory = 5; // Number of games to show per category on the homepage

  // Fetch games data from API with pagination
  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/games?page=${currentPage}&limit=${gamesPerPage}`);
        if (!response.ok) {
          throw new Error('Failed to fetch games');
        }
        const data = await response.json();
        setGames(data.games);
        setTotalGames(data.totalGames || 0);
        setTotalPages(data.totalPages || Math.ceil(data.totalGames / gamesPerPage) || 1);
        
        // Organize games by category
        organizeGamesByCategory(data.games);
        
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchGames();
  }, [currentPage]);

  // Organize games by category and determine which categories to display
  const organizeGamesByCategory = (gamesData) => {
    const categoryMap = {};
    
    // Group games by their categories
    gamesData.forEach(game => {
      if (!categoryMap[game.category]) {
        categoryMap[game.category] = [];
      }
      categoryMap[game.category].push(game);
    });
    
    // Sort games within each category by release date (newest first)
    Object.keys(categoryMap).forEach(category => {
      categoryMap[category].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    });
    
    setGamesByCategory(categoryMap);
    
    // Determine which categories to display based on available data
    // Filter out categories with no games and sort by number of games (most first)
    const categoriesToDisplay = Object.keys(categoryMap)
      .filter(category => categoryMap[category].length > 0)
      .sort((a, b) => categoryMap[b].length - categoryMap[a].length);
    
    setDisplayedCategories(categoriesToDisplay);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % paragraphs.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + paragraphs.length) % paragraphs.length);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top when changing pages
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo(0, 0); // Scroll to top when changing pages
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo(0, 0); // Scroll to top when changing pages
    }
  };

  // Generate pagination buttons
  const generatePaginationButtons = () => {
    const buttons = [];
    const maxButtonsToShow = 5; // Adjust as needed
    
    // Always show first page
    buttons.push(
      <button
        key="first"
        className={`w-10 h-10 flex items-center justify-center ${
          currentPage === 1
            ? "bg-orange-500 text-white"
            : "bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
        }`}
        onClick={() => goToPage(1)}
      >
        1
      </button>
    );

    // Calculate range of pages to display
    let startPage = Math.max(2, currentPage - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxButtonsToShow - 3);
    
    // Adjust start if end is too close to total
    if (endPage <= startPage) {
      startPage = Math.max(2, endPage - (maxButtonsToShow - 3) + 1);
    }

    // Add ellipsis if necessary
    if (startPage > 2) {
      buttons.push(
        <span key="ellipsis1" className="w-10 h-10 flex items-center justify-center text-gray-400">
          ...
        </span>
      );
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`w-10 h-10 flex items-center justify-center ${
            currentPage === i
              ? "bg-orange-500 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
          }`}
          onClick={() => goToPage(i)}
        >
          {i}
        </button>
      );
    }

    // Add ellipsis if necessary
    if (endPage < totalPages - 1) {
      buttons.push(
        <span key="ellipsis2" className="w-10 h-10 flex items-center justify-center text-gray-400">
          ...
        </span>
      );
    }

    // Always show last page if it's not the first page
    if (totalPages > 1) {
      buttons.push(
        <button
          key="last"
          className={`w-10 h-10 flex items-center justify-center ${
            currentPage === totalPages
              ? "bg-orange-500 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
          }`}
          onClick={() => goToPage(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Format category name for display
  const formatCategoryName = (category) => {
    return category.charAt(0) + category.slice(1).toLowerCase();
  };

  // Function to render media based on type
  const renderMedia = (item) => {
    if (item.type === "VIDEO") {
      return (
        <div className="relative w-full h-[200px] group">
          <Image
            src={item.url || "/assets/placeholder.jpg"}
            alt={item.title}
            width={400}
            height={200}
            className="w-full h-full object-cover rounded-t-md"
            unoptimized
          />
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-40 opacity-100 transition-opacity duration-300">
            <FaPlay size={30} className="text-white" />
          </div>
          <div className="absolute bottom-0 left-0">
            <span className="inline-block py-1 px-2 text-xs font-bold text-white bg-red-600">
              {item.status}
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="relative w-full h-[200px]">
          <Image
            src={item.url || "/assets/placeholder.jpg"}
            alt={item.title}
            width={400}
            height={200}
            className="w-full h-full object-cover rounded-t-md"
            unoptimized
          />
          <div className="absolute bottom-0 left-0">
            <span className="inline-block py-1 px-2 text-xs font-bold text-white bg-red-600">
              {item.status}
            </span>
          </div>
        </div>
      );
    }
  };

  // Render game card
  const renderGameCard = (game) => {
    return (
      <Link
        href={`/game/${game._id}`}
        key={game._id}
        className="flex flex-col w-[300px] rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        {renderMedia(game)}
        <div className="p-3">
          <h2 className="text-sm font-medium hover:text-red-500 transition-colors duration-300 line-clamp-2 h-10 mb-1">
            {game.title}
          </h2>
          <p className="text-xs text-gray-400">{formatDate(game.releaseDate)}</p>
        </div>
      </Link>
    );
  };

  // Render loading state
  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex justify-center items-center">
        <div className="text-xl">Loading games...</div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="bg-black text-white min-h-screen flex justify-center items-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen p-4">
      {/* Trending bar */}
      <div className="overflow-hidden pt-12 w-full flex flex-col sm:flex-row justify-between px-2 sm:px-4 items-center mb-6">
        <div className="flex items-center gap-2 mb-4 sm:mb-0 w-full sm:w-auto">
          <button className="bg-red-500 p-2 text-[12px] font-bold whitespace-nowrap">
            TRENDING NOW
          </button>
          <div className="relative w-full sm:w-[350px] overflow-hidden">
            <div
              key={index}
              className="transition-all duration-700 ease-in-out transform opacity-100 translate-x-0"
            >
              <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                {paragraphs[index]}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="flex border-2 border-white p-1 items-center gap-2 text-[12px] font-bold"
          >
            <FaChevronLeft size={10} />
          </button>
          <button
            onClick={nextSlide}
            className="flex border-2 border-white p-1 items-center gap-2 text-[12px] font-bold"
          >
            <FaChevronRight size={10} />
          </button>
        </div>
      </div>

      {/* Banner */}
      <div className="flex justify-center items-center pt-2 sm:pt-4 mb-6 sm:mb-8">
        <div className="w-full max-w-[300px] h-[100px] flex items-center justify-center">
          <Image
            width={300}
            height={100}
            src="/assets/tantaly.gif"
            alt="Advertisement"
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      </div>

      {/* Category-based Game Sections */}
      {displayedCategories.length > 0 ? (
        displayedCategories.map(category => (
          <div key={category} className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold border-l-4 border-red-500 pl-3">
                {formatCategoryName(category)}
              </h1>
              <Link href={`/category/${category.toLowerCase()}`} className="text-sm text-red-500 hover:underline">
                View All
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-4 sm:gap-6">
              {gamesByCategory[category]
                .slice(0, gamesPerCategory)
                .map(game => renderGameCard(game))}
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center py-10">
          <p className="text-lg text-gray-400">No games available</p>
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-8 pb-8 gap-4">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            className="w-10 h-10 flex items-center justify-center bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <FaChevronLeft size={14} />
          </button>
          
          {generatePaginationButtons()}
          
          <button
            className="w-10 h-10 flex items-center justify-center bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight size={14} />
          </button>
        </div>
        <div className="text-sm text-gray-400">
          Page {currentPage} of {totalPages} ({totalGames} games)
        </div>
      </div>
    </div>
  );
};

export default GamesWebsite;