import express from "express";
import { getPosts, addPost, getPostsByUserId } from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts)
router.post("/", addPost)
router.get("/:userId", getPostsByUserId)


export default router