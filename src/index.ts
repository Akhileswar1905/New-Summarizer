import express, { Request, Response } from "express";
import router from "./routes/index";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.send("Server Running!");
});

app.use("/api", router());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
