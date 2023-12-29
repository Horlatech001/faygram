import "./create.scss";
import Add from "../../assets/add-post.svg";
import UploadImg from "../../assets/file-upload.svg";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  
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

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
        navigate("/")
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ desc, img: imgUrl });
    setDesc("");
    setFile(null);
  };

  return (
    <div className="create">
      <div className="wrapper">
        <div className="title">
          <img src={Add} alt="add-post" />
          <h1>Create Post</h1>
        </div>

        <div className="create-form">
          <form>
            <div className="form-group">
              <span>Caption</span>
              <textarea
                name="caption"
                id=""
                cols="30"
                rows="6"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
              ></textarea>
            </div>
            <div className="form-group">
              <span>Add photos</span>
              <div className="upload-div">
                <div className="file-input">
                  <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <label htmlFor="file" className="file-input-label">
                    <img src={UploadImg} alt="" /> upload photo
                  </label>
                </div>
                <div className="uploaded-img">
                  {file && (
                    <img
                      className="file"
                      alt=""
                      src={URL.createObjectURL(file)}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="form-group">
              <span>Add Location</span>
              <input type="text" className="text-input" />
            </div>
            <div className="form-group">
              <span>Add tags</span>
              <input
                type="text"
                className="text-input"
                placeholder="art, music, education"
              />
            </div>
            <div className="button-group">
              <button className="cancel">Cancel</button>
              <button className="post" onClick={handleClick}>
                Create post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
