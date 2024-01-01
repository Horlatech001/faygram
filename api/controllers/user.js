import {db} from "../connect.js";

export const getUser = (req,res)=>{
   const q = "SELECT * FROM users"; // Modified SQL query to fetch all users

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    const users = data.map(user => {
      const { password, ...info } = user;
      return info;
    });
    return res.json(users);
  });
};