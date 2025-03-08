"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    platform: '',
    status: 'ON-GOING',
    url: '',
    type: 'IMAGE',
    category: 'ACTION',
    OS: 'WINDOWS',
    languages: 'ENGLISH',
    Genre: 'ACTION',
    tags: '',
  });

  // Fetch all games on component mount
  useEffect(() => {
    fetchGames();
  }, []);

  // Fetch all games
  const fetchGames = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/games');
      
      if (!response.ok) {
        throw new Error('Failed to fetch games');
      }
      
      const data = await response.json();
      setGames(data.games);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching games:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new game
  const createGame = async () => {
    try {
      setLoading(true);
      
      // Convert tags string to array
      const gameData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
      };
      
      const response = await fetch('/api/protected/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(gameData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create game');
      }
      
      // Refresh the games list
      fetchGames();
      resetForm();
    } catch (err) {
      setError(err.message);
      console.error('Error creating game:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update an existing game
  const updateGame = async () => {
    if (!selectedGame) return;
    
    try {
      setLoading(true);
      
      // Convert tags string to array
      const gameData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
      };
      console.log("selectedGame", selectedGame);
      
      const response = await fetch(`/api/protected/games?id=${selectedGame._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(gameData)
      });
   
      
      if (!response.ok) {
        throw new Error('Failed to update game');
      }
      
      // Refresh the games list
      fetchGames();
      resetForm();
    } catch (err) {
      setError(err.message);
      console.error('Error updating game:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a game
  const deleteGame = async (id) => {
    if (!window.confirm('Are you sure you want to delete this game?')) return;
    
    try {
      setLoading(true);
      
      const response = await fetch(`/api/protected/games?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete game');
      }
      
      // Refresh the games list
      fetchGames();
    } catch (err) {
      setError(err.message);
      console.error('Error deleting game:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedGame) {
      updateGame();
    } else {
      createGame();
    }
  };

  // Reset form and selected game
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      platform: '',
      status: 'ON-GOING',
      url: '',
      type: 'IMAGE',
      category: 'ACTION',
      OS: 'WINDOWS',
      languages: 'ENGLISH',
      Genre: 'ACTION',
      tags: '',
    });
    setSelectedGame(null);
    setShowForm(false);
  };

  // Edit a game
  const editGame = (game) => {
    setSelectedGame(game);
    setFormData({
      ...game,
      tags: game.tags ? game.tags.join(', ') : ''
    });
    setShowForm(true);
  };
  
  // Toggle form visibility and reset for adding new game
  const toggleAddNewGame = () => {
    if (showForm && selectedGame) {
      // If form is open and in edit mode, reset to add new mode
      resetForm();
      setSelectedGame(null);
      setFormData({
        title: '',
        description: '',
        platform: '',
        status: 'ON-GOING',
        url: '',
        type: 'IMAGE',
        category: 'ACTION',
        OS: 'WINDOWS',
        languages: 'ENGLISH',
        Genre: 'ACTION',
        tags: '',
      });
    } else {
      // Toggle form visibility and ensure we're in add mode, not edit mode
      setShowForm(!showForm);
      if (!showForm) {
        setSelectedGame(null);
        setFormData({
          title: '',
          description: '',
          platform: '',
          status: 'ON-GOING',
          url: '',
          type: 'IMAGE',
          category: 'ACTION',
          OS: 'WINDOWS',
          languages: 'ENGLISH',
          Genre: 'ACTION',
          tags: '',
        });
      }
    }
  };

  return (
    <div className="w-[95%] mx-auto min-h-screen pt-28 py-7">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Games Dashboard</h1>
        <button 
          onClick={toggleAddNewGame}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {showForm && !selectedGame ? 'Cancel' : selectedGame ? 'Add New Game' : 'Add New Game'}
        </button>
      </div>

      {error && (
        <div className="bg-red-900 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <div className="shadow-md rounded p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">{selectedGame ? 'Edit Game' : 'Add New Game'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title*</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">URL*</label>
                <input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Platform</label>
                <input
                  type="text"
                  name="platform"
                  value={formData.platform}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded bg-black"
                >
                  <option value="ON-GOING">ON-GOING</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="GAMES">GAMES</option>
                  <option value="RECOMMENDED">RECOMMENDED</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded bg-black"
                >
                  <option value="IMAGE">IMAGE</option>
                  <option value="VIDEO">VIDEO</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded bg-black"
                >
                  <option value="ACTION">ACTION</option>
                  <option value="ADVENTURE">ADVENTURE</option>
                  <option value="POPULAR">POPULAR</option>
                  <option value="COMEDY">COMEDY</option>
                  <option value="HOT">HOT</option>
                  <option value="DRAMA">DRAMA</option>
                  <option value="FAMILY">FAMILY</option>
                  <option value="FANTASY">FANTASY</option>
                  <option value="HORROR">HORROR</option>
                  <option value="MUSIC">MUSIC</option>
                  <option value="MYSTERY">MYSTERY</option>
                  <option value="ROMANCE">ROMANCE</option>
                  <option value="SCI-FI">SCI-FI</option>
                  <option value="SPORTS">SPORTS</option>
                  <option value="THRILLER">THRILLER</option>
                  <option value="WAR">WAR</option>
                  <option value="ANIMATION">ANIMATION</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">OS</label>
                <select
                  name="OS"
                  value={formData.OS}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded bg-black"
                >
                  <option value="WINDOWS">WINDOWS</option>
                  <option value="MAC">MAC</option>
                  <option value="LINUX">LINUX</option>
                  <option value="ANDROID">ANDROID</option>
                  <option value="IOS">IOS</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Language</label>
                <select
                  name="languages"
                  value={formData.languages}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded bg-black"
                >
                  <option value="ENGLISH">ENGLISH</option>
                  <option value="SPANISH">SPANISH</option>
                  <option value="FRENCH">FRENCH</option>
                  <option value="GERMAN">GERMAN</option>
                  <option value="ITALIAN">ITALIAN</option>
                  <option value="JAPANESE">JAPANESE</option>
                  <option value="CHINESE">CHINESE</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Genre</label>
                <select
                  name="Genre"
                  value={formData.Genre}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded bg-black"
                >
                  <option value="ACTION">ACTION</option>
                  <option value="ADVENTURE">ADVENTURE</option>
                  <option value="COMEDY">COMEDY</option>
                  <option value="DRAMA">DRAMA</option>
                  <option value="FAMILY">FAMILY</option>
                  <option value="FANTASY">FANTASY</option>
                  <option value="HORROR">HORROR</option>
                  <option value="MUSIC">MUSIC</option>
                  <option value="MYSTERY">MYSTERY</option>
                  <option value="ROMANCE">ROMANCE</option>
                  <option value="SCI-FI">SCI-FI</option>
                  <option value="SPORTS">SPORTS</option>
                  <option value="THRILLER">THRILLER</option>
                  <option value="WAR">WAR</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="tag1, tag2, tag3"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  rows="4"
                ></textarea>
              </div>
            </div>
            
            <div className="mt-4 flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                disabled={loading}
              >
                {loading ? 'Processing...' : (selectedGame ? 'Update Game' : 'Create Game')}
              </button>
              
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-900 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading && !showForm ? (
        <div className="text-center py-10">
          <div className="spinner border-t-4 border-blue-500 border-solid rounded-full h-12 w-12 mx-auto animate-spin"></div>
          <p className="mt-2">Loading games...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="">
              <tr>
                <th className="py-2 px-4 border text-left">Title</th>
                <th className="py-2 px-4 border text-left">Status</th>
                <th className="py-2 px-4 border text-left">Type</th>
                <th className="py-2 px-4 border text-left">Category</th>
                <th className="py-2 px-4 border text-left">OS</th>
                <th className="py-2 px-4 border text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {games.length > 0 ? (
                games.map(game => (
                  <tr key={game._id} className="hover:bg-gray-800">
                    <td className="py-2 px-4 border">{game.title}</td>
                    <td className="py-2 px-4 border">{game.status}</td>
                    <td className="py-2 px-4 border">{game.type}</td>
                    <td className="py-2 px-4 border">{game.category}</td>
                    <td className="py-2 px-4 border">{game.OS}</td>
                    <td className="py-2 px-4 border">
                      <div className="flex gap-2">
                        <button
                          onClick={() => editGame(game)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded text-sm hover:bg-yellow-600 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteGame(game._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 text-center">
                    No games found. Add a new game to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;