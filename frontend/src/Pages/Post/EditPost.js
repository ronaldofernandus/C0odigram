import React, { useState, useEffect } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import { editPost } from "../../features/post/postAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EditPost = ({ setOpenModal, postId, postImage }) => {
  const { isSuccess, isError } = useSelector((state) => state.posts);

  const [form, setForm] = useState({
    id: +postId,
    caption: "",
    image: postImage,
  });

  console.log(form);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editHandler = () => {
    dispatch(editPost(form));

    navigate(`/home/detail/${postId}`);
  };

  return (
    <div className="">
      <div className="bg-gray-50  absolute p-8 flex flex-col space-y-4 items-center justify-center text-indigo-400 dark:text-indigo-800 rounded-lg  w-[300px] ml-[-335px] mt-[-355px] md:w-[370px] md:ml-[-450px] lg:ml-[-490px] lg:mt-[-450px]">
        <div className="absolute text-4xl mt-[-322px] ml-[275px] md:ml-[351px] ">
          <button type="button" onClick={() => setOpenModal(false)}>
            <IoCloseCircle />
          </button>
        </div>
        <div className="border-b-2 border-indigo-100 mb-4 rounded">
          <h1>Edit post</h1>
        </div>
        <MdOutlineAddPhotoAlternate className="text-5xl text-indigo-300" />
        <form action="">
          <div>
            <input
              type="text"
              id="caption"
              name="caption"
              onChange={(e) => setForm({ ...form, caption: e.target.value })}
              className="caption p-2 px-4 md:px-[52px] py-8 bg-slate-400 text-black rounded focus:outline-none mt-5 mb-5"
              placeholder="Write a caption..."
            />
          </div>
          <div
            className="bg-indigo-400 text-white hover:bg-indigo-600 dark:bg-indigo-800 dark:hover:bg-indigo-900 w-full p-2 rounded cursor-pointer"
            onClick={editHandler}
          >
            <button typ="button">Edit Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
