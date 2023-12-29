import "./register.scss";
import Social from "../../assets/social.png";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [inputs, setInputs] = useState({
        username: "",
        name: "",
        email: "",
        password: "",
    })

    const [err, setErr] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault();

        try{
            await axios.post("http://localhost:8800/api/auth/register", inputs)
            navigate("/")
        }catch(err){
            setErr(err.response.data)
        }
    }

    console.log(err);

  return (
    <div className="register">
        <div className="card">
        <div className="right">
               <img src={Social} alt="social-icon"/>
            </div>
            <div className="left">
                <div className="title">
                    <h1>Faygram</h1>
                    <h2>Create a new account</h2>
                </div>
                <div className="formDiv">
                    <form>
                        <div>
                            <label htmlFor="inputUsername">Username</label><br/>
                            <input type="text" name="username" onChange={handleChange} required/>
                        </div>
                        <div>
                            <label htmlFor="inputName">Name</label><br/>
                            <input type="text" name="name" onChange={handleChange} required/>
                        </div>
                        <div>
                            <label htmlFor="inputEmail">Email</label><br/>
                            <input type="email" name="email" onChange={handleChange} required/>
                        </div>
                        <div>
                            <label htmlFor="inputPassword">Password</label><br/>
                            <input type="password" name="password" onChange={handleChange} required/>
                        </div>
                        {err && err}
                        <button onClick={handleClick}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register