import "./people.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Link } from "react-router-dom";

const People = () => {
  const { isLoading, error, data } = useQuery(["users"], () =>
    makeRequest.get("/users").then((res) => {
      return res.data;
    })
  );

  console.log(data);

  return (
    <div className="people">
      <div className="title">
        <span>All users</span>
      </div>

      <div className="users">
        {error
          ? "Something Went wrong!"
          : isLoading
          ? "Loading"
          : data.map((user) => (
            <Link to={`/profile/${user.id}`} key={user.id}>
              <div className="user-card">
                <img src={"./upload/" + user.profilePic} alt="user-img" />
                <span>{user.name}</span>
              </div>
            </Link>
            ))}
      </div>
    </div>
  );
};

export default People;
