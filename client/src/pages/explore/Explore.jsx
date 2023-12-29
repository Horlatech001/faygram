import "./explore.scss";
import Search from "../../assets/search.svg";
import Filter from "../../assets/filter.svg";
import Post1 from "../../assets/post-1.jpg";
import Post2 from "../../assets/post-2.jpg";
import Post3 from "../../assets/post-3.jpg";

const Explore = () => {

  //TEMPORARY
  const posts = [
    {
      id: 1,
      name: "John Doe",
      img: Post1,
    },
    {
      id: 2,
      name: "Jane Doe",
      img: Post2,
    },
    {
      id: 3,
      name: "Albert Fisher",
      img: Post3,
    },
    {
      id: 4,
      name: "Jane Doe",
      img: Post1,
    },
    {
      id: 5,
      name: "Jane Smith",
      img: Post2,
    },
    {
      id: 6,
      name: "Jonas Evie",
      img: Post3,
    },
  ]

  return (
    <div className='explore'>

      <div className="wrapper">
        <div className="title">
          <h1>Search Posts</h1>
        </div>

        <div className="searchBox">
          <img src={Search} alt="search" />
          <input type="text" placeholder="Search..." />
        </div>

        <div className="popular">
          <h2>Popular Today</h2>

          <div className="filter">
            <span>All</span>
            <img src={Filter} alt="filter" />
          </div>
        </div>

        <div className="posting">
          {posts.map(post => (
            <div className="card">
              <img src={post.img} alt="explore-posts" />

              <div className="overlay">
                <div className="user-info">
                  <img src={post.img} alt="explore-posts" />
                  <span className="name">{post.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Explore