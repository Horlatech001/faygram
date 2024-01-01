import "./register.scss";
import Social from "../../assets/social.png";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";

const Register = () => {

    const [file, setFile] = useState(null);
    const [inputs, setInputs] = useState({
        username: "",
        name: "",
        email: "",
        password: "",
    })

    const [err, setErr] = useState(null);

    const navigate = useNavigate();

    const upload = async () => {
        try {
          const formData = new FormData(); //creating formData because we cannot send our file directly to our API
    
          formData.append("file", file);
          const res = await makeRequest.post("/upload", formData);
          return res.data;
        } catch (err) {
          console.log(err);
        }
      };

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault();
    
        try {
            // Upload the file first
            const imageUrl = await upload();
    
            // Assuming imageUrl contains the URL/path to the uploaded image
            // Add the image URL to the inputs object
            const updatedInputs = { ...inputs, profilePic: imageUrl };
    
            // Make the POST request for user registration
            await axios.post("http://localhost:8800/api/auth/register", updatedInputs);
            navigate("/");
        } catch (err) {
            setErr(err.response.data);
        }
    };

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
                        <div>
                            <label htmlFor="inputPassword">Profile Pic</label><br/>
                            <input type="file" onChange={(e) => setFile(e.target.files[0])} required/>
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