import {
  createGame,
  deleteGame,
  updateGame,
} from "@/app/api/controllers/gameController";

export async function POST(req) {
  return createGame(req);
}

export async function PUT(req) {
  return updateGame(req);
}

export async function DELETE(req) {
  return deleteGame(req);
}
