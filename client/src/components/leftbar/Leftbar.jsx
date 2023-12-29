import "./leftbar.scss";
import User from "../../assets/user-icon.svg";
import Home from "../../assets/home.svg";
import Wallpaper from "../../assets/wallpaper.svg";
import People from "../../assets/people.svg";
import Saved from "../../assets/bookmark.svg";
import Create from "../../assets/gallery-add.svg";
import Logout from "../../assets/logout.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Leftbar = () => {

  const { currentUser } = useContext(AuthContext);

  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    // Add any additional logic here (redirect, clear local data, etc.)
  };
  
  return (
    <div className="leftbar">
      <div className="logo">
        <h1>FayGram</h1>
      </div>
      <div className="user-icon">
        <img src={User} alt="user-icon" />
        <span>{currentUser.name}</span>
      </div>
      <div className="menu">
        <Link to="/" style={{textDecoration:"none", color:"white"}}>
          <div className="item" id="active-item">
            <img src={Home} alt="home-icon" />
            <span>Home</span>
          </div>
        </Link>
        <Link to="/explore" style={{textDecoration:"none", color:"white"}}>
          <div className="item">
            <img src={Wallpaper} alt="home-icon" />
            <span>Explore</span>
          </div>
        </Link>
        <Link to="/people" style={{textDecoration:"none", color:"white"}}>
          <div className="item">
            <img src={People} alt="home-icon" />
            <span>People</span>
          </div>
        </Link>
        <Link to="/saved" style={{textDecoration:"none", color:"white"}}>
          <div className="item">
            <img src={Saved} alt="home-icon" />
            <span>Saved</span>
          </div>
        </Link>
        <Link to="/create" style={{textDecoration:"none", color:"white"}}>
          <div className="item">
            <img src={Create} alt="home-icon" />
            <span>Create Post</span>
          </div>
        </Link>
        <div className="item" id="logout">
          <img src={Logout} alt="home-icon" />
          <span onClick={handleLogout}>Logout</span>
        </div>
      </div>
    </div>
  )
}

export default Leftbar