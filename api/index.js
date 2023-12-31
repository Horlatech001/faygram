import express from "express";
const app = express();

import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import likeRoutes from "./routes/likes.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import multer from "multer";

// Middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
}); //Allow us to login and prevent Cors error

app.use(express.json()); // Allow us to send json data to the db
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);  //Allow us to send api request from our client to the server
app.use(cookieParser())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename)
})


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/likes", likeRoutes);

app.listen(8800, () => {
  console.log("API working!");
});
