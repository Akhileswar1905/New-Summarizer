import { Router } from "express";
import { getNewsToday } from "../controller/new_feed";

export default (router: Router) => {
  router.get("/news", getNewsToday);
};
