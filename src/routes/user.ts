import { Router } from "express";
import { getUserController } from "../controllers/user";

export default (router: Router) => {
  router.get("/users/:user_id", getUserController);
};
