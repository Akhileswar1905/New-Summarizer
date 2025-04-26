import express, { Request, Response } from "express";
import router from "./routes/index";
import cors from "cors";
import { db } from "./utils/dbconfig";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/health", (req: Request, res: Response) => {
  res.send("Server Running!");
});

db.getConnection((err, connection) => {
  if (err) {
    console.log(err);
    console.error("Error connecting to MySQL:", err.message);
  } else {
    console.log("Connected to MySQL database");
    connection.release();
  }
});

app.use("/api", router());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
