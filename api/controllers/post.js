import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken; //Checking if there is an accessToken in the request made
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!"); //Checking the authenticity of the token

    const q = `
    SELECT p.*, u.id AS userId, name, profilePic 
    FROM posts AS p 
    JOIN users AS u ON (u.id = p.userId) 
    WHERE p.userId = ?  /* Filter by the user ID */
    ORDER BY p.createdAt DESC`; //  fetching posts associated with the user ID stored in userInfo

    const values = [userInfo.id];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const getPostsByUserId = (req, res) => {
  const { userId } = req.params; // Get the userId from the request parameters

  const q = `
    SELECT p.*, u.id AS userId, name, profilePic 
    FROM posts AS p 
    JOIN users AS u ON (u.id = p.userId) 
    WHERE p.userId = ? /* Filter by the provided userId */
    ORDER BY p.createdAt DESC`;

  const values = [userId];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts (`desc`, `img`, `createdAt`, `location`, `userId`) VALUES (?)";

    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      req.body.location,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created!");
    });
  });
};

