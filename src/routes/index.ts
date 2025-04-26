import express from "express";
import new_feed from "./new_feed";
import auth from "./auth";
import user from "./user";
import categories from "./categories";

const router = express.Router();

export default (): express.Router => {
  auth(router);
  new_feed(router);
  user(router);
  categories(router);

  return router;
};
