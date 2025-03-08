import { getAllGames} from "../controllers/gameController";



export async function GET(req) {

  return getAllGames(req);
}
