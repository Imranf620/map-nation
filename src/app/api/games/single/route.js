import { getGameById } from "../../controllers/gameController";


export async function GET(req) {
  return getGameById(req);
}

