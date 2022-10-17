import React, { useState, useEffect } from "react";
import { BiPhotoAlbum } from "react-icons/bi";
import { getUserDetail } from "../../features/auth/authAction";
import { AddPost } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const MyProfile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { user, userData } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getUserDetail());
  }, [user, navigate, dispatch]);

  return (
    <div className="flex items-center justify-center rounded-xl mb-10  border-b-2 h-auto mx-auto max-w-[375px] md:max-w-[900px] ">
      <div className="flex flex-col space-y-6 items-center mx-auto m-3 w-full ">
        <a href="profile">
          <img
            src={
              userData.image
                ? require(`../../../../images/${userData.image}`)
                : "https://via.placeholder.com/150"
            }
            className="rounded-full drop-shadow-lg bg-no-repeat bg-cover w-40 h-40"
            alt="Avatar"
          />
        </a>
        <div className="flex flex-col text-center">
          <p className="text-2xl md:text-2xl text-black dark:text-white mb-0">
            {userData.name}
          </p>
          <p className="text-gray-900 text-xl dark:text-gray-400">
            <small>{userData.bio}</small>
          </p>
        </div>

        <div className="flex flex-row space-x-2 drop-shadow-xl">
          <div
            className="flex flex-row mb-3 items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm md:text-md lg:text-base bg-gray-200 text-indigo-700 hover:bg-slate-400 font-bold cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            <button type="button" className="flex items-center">
              <BiPhotoAlbum />
              Post
            </button>
          </div>

          {modalOpen && <AddPost setOpenModal={setModalOpen} />}

          <div className="mb-3 px-3 py-2 rounded-md text-sm md:text-md lg:text-base bg-slate-50 hover:bg-slate-200 text-indigo-700">
            <Link to={`/home/profile/edit`}>Edit Profile</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
