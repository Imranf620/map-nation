"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function SingleGame() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [relatedGames, setRelatedGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/games/single?id=${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch game data');
        }
        
        const data = await response.json();
        setGame(data.game);
      } catch (err) {
        console.error('Error fetching game:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedGames = async () => {
      try {
        const response = await fetch('/api/games');
        
        if (!response.ok) {
          throw new Error('Failed to fetch related games');
        }
        
        const data = await response.json();
        
        // Filter out the current game if it exists in the results
        const filteredGames = data.games.filter(game => game._id !== id);
        
        // Get 3 random games from the filtered list
        const randomGames = getRandomGames(filteredGames, 3);
        setRelatedGames(randomGames);
      } catch (err) {
        console.error('Error fetching related games:', err);
        // We don't set the main error state here to prevent blocking the main content
      }
    };

    if (id) {
      fetchGameData();
      fetchRelatedGames();
    }
  }, [id]);

  // Function to get random games from the list
  const getRandomGames = (games, count) => {
    const shuffled = [...games].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Dummy data for aspects not returned by the API
  const getDummyContent = () => {
    return {
      rating: 4.5,
      ratingCount: 4291,
      developer: "With Your Subscribtion",
      creator: "Sigmund",
      version: "0.2 Beta",
      comments: [
        { id: 1, user: "Anonymous", date: "February 28, 2025", text: "Mega link for Mac is broken." },
        { id: 2, user: "Anonymous", date: "February 27, 2025", text: "Good new update." },
        { id: 3, user: "Anonymous", date: "February 26, 2025", text: "Hello, bad game with poor renders and sandbox good from last, dont bullshit." },
        { id: 4, user: "Anonymous", date: "February 25, 2025", text: "Do you have saved game file that is caught up to best update or near it??" },
        { id: 5, user: "Anonymous", date: "February 24, 2025", text: "How do I change game resolution since I have a small screen?" }
      ]
    };
  };

  const dummyContent = getDummyContent();

  if (loading) return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="text-xl">Loading game data...</div>
    </div>
  );

  if (error) return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="text-xl text-red-500">Error: {error}</div>
    </div>
  );

  if (!game) return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="text-xl">Game not found</div>
    </div>
  );

  // Format tags from database array to display format
  const displayTags = game.tags || [];
  
  // Get appropriate OS string
  const getOSString = () => {
    if (Array.isArray(game.OS)) {
      return game.OS.join(", ");
    }
    return game.OS || "Windows";
  };

  // Get appropriate languages string
  const getLanguagesString = () => {
    if (Array.isArray(game.languages)) {
      return game.languages.join(", ");
    }
    return game.languages || "English";
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Head>
        <title>{game.title} Download</title>
        <meta name="description" content={`Download ${game.title} game`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 max-w-6xl">
        {/* Main game image and controls */}
        <div className="relative mt-4">
          <div className="w-full">
            <Image
              src={game.url || "/placeholder-game.jpg"}
              alt={`${game.title} Game Screenshot`}
              width={800}
              height={400}
              className="w-full"
              unoptimized
            />
          </div>
          <div className="absolute bottom-0 flex space-x-2 p-2 bg-black bg-opacity-50">
            <button className="p-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 5v10l7-5-7-5z"></path>
              </svg>
            </button>
            <button className="p-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
              </svg>
            </button>
            <button className="p-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Date and categories */}
        <div className="flex flex-col mt-4">
          <div className="flex items-center text-xs text-gray-400">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              ></path>
            </svg>
            {new Date(game.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="text-xs px-2 py-1 bg-gray-800 text-white">
              {game.Genre || "GAMES"}
            </span>
            <span className="text-xs px-2 py-1 bg-gray-800 text-white">
              {game.category || "ANIMATION"}
            </span>
            <span className="text-xs px-2 py-1 bg-gray-800 text-white">
              {game.status || "ON-GOING"}
            </span>
            <span className="text-xs px-2 py-1 bg-gray-800 text-white">
              {game.OS || "WINDOWS"}
            </span>
          </div>
        </div>

        {/* Ad Banner */}
        <div className="my-6 bg-green-500 p-4 text-center">
          <div className="text-black font-bold text-lg">BC.GAME</div>
          <div className="text-black font-bold text-xl mb-2">CRYPTO BOOST</div>
          <button className="bg-green-700 text-white px-4 py-1 text-sm">
            PLAY NOW
          </button>
        </div>

        {/* Download Button */}
        <div className="text-center my-6">
          <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-2 rounded">
            Download Now
          </button>
        </div>

        {/* Ratings */}
        <div className="flex justify-center my-2">
          <div className="flex text-yellow-400">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
          <span className="text-sm text-gray-400 ml-2">({dummyContent.ratingCount})</span>
        </div>

        {/* Game Title and Description */}
        <h1 className="text-2xl font-bold mt-6">
          {game.title} Free Download Latest Version
        </h1>

        <p className="text-sm text-gray-300 mt-2">
          {game.description || "Download this game to experience an immersive adventure. This game tells a compelling story with unique gameplay mechanics and stunning visuals..."}
        </p>

        {/* Game Info Table */}
        <div className="mt-4 text-sm">
          <div className="flex border-b border-gray-800 py-1">
            <div className="w-28 text-gray-400">Developer:</div>
            <div>{dummyContent.developer}</div>
          </div>
          <div className="flex border-b border-gray-800 py-1">
            <div className="w-28 text-gray-400">Created by:</div>
            <div>{dummyContent.creator}</div>
          </div>
          <div className="flex border-b border-gray-800 py-1">
            <div className="w-28 text-gray-400">Version:</div>
            <div>{dummyContent.version}</div>
          </div>
          <div className="flex border-b border-gray-800 py-1">
            <div className="w-28 text-gray-400">OS:</div>
            <div>{getOSString()}</div>
          </div>
          <div className="flex border-b border-gray-800 py-1">
            <div className="w-28 text-gray-400">Language:</div>
            <div>{getLanguagesString()}</div>
          </div>
          <div className="flex border-b border-gray-800 py-1">
            <div className="w-28 text-gray-400">Genre:</div>
            <div>{displayTags.join(", ") || game.Genre || "Adventure, RPG"}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap mt-8 border-b border-gray-800">
          <button className="px-4 py-2 text-yellow-400 border-b-2 border-yellow-400">
            DESCRIPTION
          </button>
          <button className="px-4 py-2 text-gray-400">SCREENSHOTS</button>
          <button className="px-4 py-2 text-gray-400">CHANGELOG</button>
          <button className="px-4 py-2 text-gray-400">INSTALLATION</button>
          <button className="px-4 py-2 text-gray-400">DOWNLOAD</button>
        </div>

        {/* Overview */}
        <div className="mt-8">
          <h2 className="text-xl text-center mb-4">Overview</h2>
          <p className="text-sm text-gray-300">
            {game.description || "This game features an immersive storyline with multiple branching paths. Players will experience a rich narrative with complex characters and meaningful choices that affect the game world. With stunning visuals and an engaging soundtrack, this game offers hours of entertainment and replayability."}
          </p>

          {/* Rating Section */}
          <div className="mt-8 text-center">
            <div className="text-gray-400 text-sm">RATE THIS</div>
            <div className="flex justify-center text-yellow-400 my-2">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            <div className="text-sm text-gray-400">
              Rating: {dummyContent.rating} / 5 (User: 35)
            </div>
          </div>

          {/* Download Button */}
          <div className="text-center my-6">
            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-2 rounded">
              Download Now
            </button>
          </div>

          {/* Tags */}
          <div className="mt-4">
            <div className="text-sm text-gray-400 mb-2">TAGS:</div>
            <div className="flex flex-wrap gap-2">
              {displayTags.length > 0 ? (
                displayTags.map((tag, index) => (
                  <span key={index} className="text-xs px-2 py-1 bg-red-800 text-white">
                    {tag}
                  </span>
                ))
              ) : (
                <>
                  <span className="text-xs px-2 py-1 bg-red-800 text-white">
                    {game.Genre || "ACTION"}
                  </span>
                  <span className="text-xs px-2 py-1 bg-red-800 text-white">
                    {game.category || "ADVENTURE"}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Related Games */}
        <div className="mt-12">
          <h3 className="text-lg mb-4">Related Games</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedGames.length > 0 ? (
              relatedGames.map((relatedGame) => (
                <Link href={`/game/${relatedGame._id}`} key={relatedGame._id}>
                  <div className="cursor-pointer">
                    <div className="relative">
                      <Image
                        src={relatedGame.url || "/placeholder-game.jpg"}
                        alt={relatedGame.title}
                        width={300}
                        height={200}
                        className="w-full h-40 object-cover"
                        unoptimized
                      />
                      <div className="absolute bottom-0 left-0 bg-red-600 text-white text-xs px-2 py-1">
                        {relatedGame.status || "RECOMMENDED"}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm mt-1">{relatedGame.title}</h3>
                      <div className="text-xs text-gray-400">
                        {new Date(relatedGame.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              // Fallback if no related games are available
              <div className="col-span-3 text-center text-gray-400">
                No related games available
              </div>
            )}
          </div>
        </div>

        {/* Comments */}
        <div className="mt-12">
          <h3 className="text-lg">{dummyContent.comments.length} Comments</h3>

          <div className="mt-4">
            {dummyContent.comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-800 py-4">
                <div className="flex">
                  <div className="w-10 h-10 bg-purple-600 flex items-center justify-center rounded">
                    <span className="text-white">A</span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm">
                      {comment.user} • {comment.date}
                    </div>
                    <div className="mt-2 text-sm">
                      {comment.text}
                    </div>
                    <div className="mt-1">
                      <button className="text-gray-400 text-sm">Reply</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leave a reply */}
        <div className="mt-8">
          <h3 className="text-lg mb-4">Leave a reply</h3>
          <textarea
            className="w-full bg-gray-900 border border-gray-700 p-4 text-white"
            rows={5}
            placeholder="Write your comment here... (max. 2000 characters)"
          ></textarea>

          <input
            type="text"
            className="w-full bg-gray-900 border border-gray-700 p-2 mt-4 text-white"
            placeholder="Name"
          />

          <div className="mt-4 flex items-center">
            <input type="checkbox" id="save-info" className="mr-2" />
            <label htmlFor="save-info" className="text-sm text-gray-400">
              Save my name, email, and website in this browser for the next time
              I comment.
            </label>
          </div>

          <button className="mt-4 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 text-sm">
            Post comment
          </button>
        </div>
      </main>
    </div>
  );
}