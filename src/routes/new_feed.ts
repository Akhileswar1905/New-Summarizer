import { Router } from "express";
import { getNewsToday } from "../controllers/new_feed";

export default (router: Router) => {
  router.get("/news", getNewsToday);
};
