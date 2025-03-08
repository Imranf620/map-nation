import { connectDB } from "@/lib/mongodb";
import Game from "@/models/Game";
import mongoose from "mongoose";

/**
 * Create a new game
 */
export async function createGame(req) {
  await connectDB();
  const game = await Game.create(await req.json());
  return Response.json({ message: "Game created", game }, { status: 201 });
}

/**
 * Get all games
 */
export async function getAllGames() {
  await connectDB();
  const games = await Game.find({});
  return Response.json({ games }, { status: 200 });
}

/**
 * Get a single game by ID
 */
export async function getGameById(req) {
  try {
    await connectDB();
    
  const id = req.nextUrl.searchParams.get("id");
  
    if (!id) {
      return Response.json({ error: "ID is required" }, { status: 400 });
    }

    console.log("hhhh", id);
    
    // Validate MongoDB ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ error: "Invalid game ID format" }, { status: 400 });
    }
    
    // Find the game
    const game = await Game.findById(id);
    
    if (!game) {
      return Response.json({ error: "Game not found" }, { status: 404 });
    }
    
    return Response.json({ game }, { status: 200 });
  } catch (error) {
    console.error("Error fetching game:", error);
    return Response.json({ error: "Failed to fetch game" }, { status: 500 });
  }
}
/**
 * Update a game
 */
export async function updateGame(req) {
  await connectDB();

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return Response.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const body = await req.json(); 
    console.log("Updating game ID:", id, "with data:", body);

    const game = await Game.findByIdAndUpdate(id, body, { new: true });

    if (!game) {
      return Response.json({ error: "Game not found" }, { status: 404 });
    }

    return Response.json({ message: "Game updated", game }, { status: 200 });
  } catch (error) {
    console.error("Update Game Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * Delete a game
 */
export async function deleteGame(req) {
  await connectDB();
  const { id } = req.params;
  const deletedGame = await Game.findByIdAndDelete(id);
  if (!deletedGame)
    return Response.json({ error: "Game not found" }, { status: 404 });
  return Response.json({ message: "Game deleted" }, { status: 200 });
}
