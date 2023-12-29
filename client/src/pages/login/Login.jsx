import "./login.scss";
import Social from "../../assets/social.png"
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const Login = () => {

    const [inputs, setInputs] = useState({
        username: "",
        password: "", 
      })
    
      const [err, setErr] = useState(null)
    
      const navigate = useNavigate();
    
      const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
      }
    
      const { login } = useContext(AuthContext);
    
    
      const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
          await login(inputs);
          navigate("/")
        } catch (err) {
          setErr(err.response.data)
        }
      }

  return (
    <div className="login">
        <div className="card">
            <div className="left">
                <div className="title">
                    <h1>Faygram</h1>
                    <h2>Login to your account</h2>
                    <p>To use faygram, please enter your details</p>
                </div>
                <div className="formDiv">
                    <form>
                        <div>
                            <label htmlFor="inputEmail">Username</label><br/>
                            <input type="text" name="username" onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="inputPassword">Password</label><br/>
                            <input type="password" name="password" onChange={handleChange}/>
                        </div>
                        {err && err}
                        <button onClick={handleLogin}>Login</button>
                    </form>
                    <p>Don't have an account? <Link to="/register">register</Link></p>
                </div>
            </div>
            <div className="right">
               <img src={Social} alt="social-icon"/>
            </div>
        </div>
    </div>
  )
}

export default Login