import "./profile.scss";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import moment from "moment";
import Saved from "../../assets/bookmark.svg";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Profile = () => {
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { currentUser } = useContext(AuthContext);

  const { isLoading: postsLoading, error: postsError, data: postData } = useQuery(["posts"], () =>
    makeRequest.get(`/posts/${userId}`).then((res) => res.data)
  );

  const post = postData?.[0]; // Assuming the first post object is accessed

  const { isLoading: likesLoading, error: likesError, data: likeData } = useQuery(
    ["likes", post?.id], // Accessing post.id from the first query
    () => makeRequest.get(`/likes?postId=${post?.id}`).then((res) => res.data),
    { enabled: !!post } // This ensures the query runs only if post data is available
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
    mutation.mutate(likeData.includes(currentUser.id));
  };
  // Extracting and filtering unique first names
  const firstNamesSet = new Set(
    postData?.map((item) => item.name.split(" ")[1]) || []
  );
  const uniqueFirstNames = Array.from(firstNamesSet);

  // Joining unique first names into a string
  const uniqueFirstNamesString = uniqueFirstNames.join(", ");

  return (
    <div className="profile">
      <div className="title">
        <h1>{uniqueFirstNamesString} Feed</h1>
      </div>
      {postsError
        ? "Something went wrong!"
        : postsLoading
        ? "Post Loading..."
        : postData.map((post) => (
            <div className="container">
              <div className="user">
                <div className="userInfo">
                  <img src={`/upload/${post.profilePic}`} alt="" />
                  <div className="details">
                    <span className="name">{post.name}</span>
                    <span className="date">
                      {moment(post.createdAt).fromNow()} - {post.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="content">
                <p>{post.desc}</p>
                <img src={`/upload/${post.img}`} alt="" />
              </div>

              <div className="info">
                <div className="item">
                  {likesError ? (
                    "Something went wrong!"
                  ) : likesLoading ? (
                    "Loading..."
                  ) : likeData?.includes(currentUser.id) ? (
                    <FavoriteOutlinedIcon
                      style={{ color: "red" }}
                      onClick={handleLike}
                    />
                  ) : (
                    <FavoriteBorderOutlinedIcon onClick={handleLike} />
                  )}
                  {likeData?.length} Likes
                </div>
                <img src={Saved} alt="saved" />
              </div>
            </div>
          ))}
    </div>
  );
};

export default Profile;
