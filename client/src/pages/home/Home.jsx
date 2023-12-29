import Posts from "../../components/posts/Posts";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="title">
        <h1>Home Feed</h1>
      </div>
      <Posts />
    </div>
  )
}

export default Home