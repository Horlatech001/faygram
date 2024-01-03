import "./post.scss";
import Saved from "../../assets/bookmark.svg";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Post = ({ post }) => {

  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postId=" + post.id).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    }, 
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id));
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={"./upload/" + post.profilePic} alt="" />
            <div className="details">
              <span className="name">{post.name}</span>
              <span className="date">{moment(post.createdAt).fromNow()} - {post.location}</span>
            </div>
          </div>
        </div>

        <div className="content">
          <p>{post.desc}</p>
          <img src={"./upload/" + post.img} alt="" />
        </div>

        <div className="info">
          <div className="item">
          {error ? (
              "Something went wrong!"
            ) : isLoading ? (
              "Loading..."
            ) : data?.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {data?.length} Likes
          </div>
          <img src={Saved} alt="saved" />
        </div>
      </div>
    </div>
  );
};

export default Post;
