import React, { useState, useEffect } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";

import { addPost } from "../../features/post/postAction";

import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import { uploadImage } from "../../fetchs/userFetch";

const AddPost = ({ setOpenModal }) => {
  const [imageData, setImageData] = useState({});
  const [postCaption, setPostCaption] = useState("");

  console.log(postCaption);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleItemUpload = (event) => {
    setImageData(event.target.files[0]);
  };

  const submitData = (imageName) => {
    const postObj = {
      caption: postCaption || "I hecking love code",
      image: Math.round(new Date() / 1000) + "--" + imageName,
    };
    if (postObj.image.substring(12) === "undefined") {
      Swal.fire({
        icon: "warning",
        title: "Can't be empty!",
        text: `Please enter data!`,
      });
    } else {
      dispatch(addPost(postObj));
      Swal.fire({
        icon: "success",
        title: "Add Post Success!",
        text: `You've successfully created an post!`,
      });
      navigate("/home/profile");
    }
  };

  const submitPostHandler = () => {
    const data = new FormData();
    data.append("image", imageData);
    uploadImage(data);
    submitData(imageData.name);
  };

  return (
    <div className="">
      <div className="bg-gray-50 z-20 absolute p-8 flex flex-col space-y-4 items-center justify-center text-indigo-400 dark:text-indigo-800 rounded-lg  w-[300px] ml-[-135px] mt-[-100px] md:w-[370px] md:ml-[-173px]">
        <div className="absolute z-20 text-4xl mt-[-344px] ml-[275px] md:ml-[351px] ">
          <button type="button" onClick={() => setOpenModal(false)}>
            <IoCloseCircle />
          </button>
        </div>
        <div className="border-b-2 border-indigo-100 mb-4 rounded">
          <h1>Upload your favorite photos</h1>
        </div>
        <MdOutlineAddPhotoAlternate className="text-5xl text-indigo-300" />

        <form encType="multipart/form-data" method="post">
          <div className="w-32 bg-slate-200">
            <input type="file" name="image" onChange={handleItemUpload} />
          </div>
          <div>
            <input
              name="caption"
              id="caption"
              onChange={(e) => setPostCaption(e.target.value)}
              className="caption p-2 px-4 md:px-[52px] py-8 bg-slate-400 text-black rounded focus:outline-none mb-4 mt-4"
              placeholder="Write a caption..."
            />
          </div>

          <div
            className="bg-indigo-400 text-white hover:bg-indigo-600 dark:bg-indigo-800 dark:hover:bg-indigo-900 w-full p-2 rounded cursor-pointer"
            onClick={submitPostHandler}
          >
            <button type="button">Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
