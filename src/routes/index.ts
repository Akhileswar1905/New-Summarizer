import express from "express";
import new_feed from "./new_feed";

const router = express.Router();

export default (): express.Router => {
  new_feed(router);

  return router;
};
