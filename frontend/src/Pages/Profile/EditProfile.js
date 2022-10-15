import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../features/auth/authSlice";
import { resetPost } from "../../features/post/postSlice";
import Swal from "sweetalert2";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { update, getUserDetail } from "../../features/auth/authAction";
import { uploadImage } from "../../fetchs/userFetch";

const EditProfile = () => {
  const { user, userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profilname, setName] = useState(userData.name);
  const [profilbio, setBio] = useState(userData.bio);
  const [profilemail, setEmail] = useState(userData.email);
  const [profilpassword, setPassword] = useState();
  const [imageData, setImageData] = useState({} || userData.image);

  const handleItemUpload = (event) => {
    setImageData(event.target.files[0]);
  };

  const submitUser = (imageName) => {
    const userObj = {
      name: profilname,
      bio: profilbio,
      email: profilemail,
      password: profilpassword,
      image: Math.round(new Date() / 1000) + "--" + imageName,
    };
    if (userObj.image.substring(12) === "undefined") {
      Swal.fire({
        icon: "warning",
        title: "Can't be empty!",
        text: `Please enter data!`,
      });
    } else {
      dispatch(update(userObj));
      Swal.fire({
        icon: "success",
        title: "Berhasil Edit Profile!",
        text: `Anda sudah sukses update profile!`,
      });
      navigate("/profile");
    }
  };

  const submitUserHandler = () => {
    const data = new FormData();
    data.append("image", imageData);
    uploadImage(data);
    submitUser(imageData.name);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getUserDetail());

  }, [user, dispatch]);

  return (
    <section className="h-full dark:bg-neutral-900 relative">
      <div className="text-center">
        <h1 className="text-2xl text-transparent md:text-3xl">
          Codigram Posts
        </h1>
      </div>
      <div className="mt-16 xl:mt-20"></div>

      <div className="flex items-center justify-center rounded-xl  border-b-2 h-auto mx-auto max-w-[375px] md:max-w-[900px] ">
        <div className="flex flex-col space-y-6 md:space-y-3 items-center mx-auto m-3 w-full ">
          <BsFillArrowLeftSquareFill
            className="absolute cursor-pointer text-3xl text-gray-400 mr-[300px] md:mr-[400px] mt-[30px]"
            onClick={() => navigate("/profile")}
          />

          {/* profile */}
          <img
            src={
              userData.image
                ? require(`../../../../images/${userData.image}`)
                : "https://via.placeholder.com/150"
            }
            className="rounded-full drop-shadow-lg h-44 w-44"
            alt="Avatar"
          />

          <form action="" encType="multipart/form-data">
            <div className="flex flex-col text-center">
              <label htmlFor="name" className="text-left">
                Name
              </label>
              <input
                className="w-full bg-gray-300 focus:outline-none p-3 rounded text-slate-700"
                type="text"
                id="name"
                name="name"
                defaultValue={userData.name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="flex flex-col text-center">
              <label htmlFor="name" className="text-left">
                Bio
              </label>
              <input
                className="w-full bg-gray-300 focus:outline-none p-3 rounded text-slate-700"
                type="text"
                id="bio"
                name="bio"
                defaultValue={userData.bio}
                onChange={(event) => setBio(event.target.value)}
              />
            </div>
            <div className="flex flex-col text-center">
              <label htmlFor="email" className="text-left">
                Email
              </label>
              <input
                className="w-full bg-gray-300 focus:outline-none p-3 rounded text-slate-700"
                type="text"
                id="email"
                name="email"
                defaultValue={userData.email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="flex flex-col text-center">
              <label htmlFor="password" className="text-left">
                Password
              </label>
              <input
                className="w-full bg-gray-300 focus:outline-none p-3 rounded text-slate-700"
                type="password"
                id="password"
                name="password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="flex flex-col text-center">
              <label htmlFor="image" className="text-left">
                Profile Picture
              </label>
              <input
                className="w-[226px] text-sm bg-gray-200 focus:outline-none p-3 rounded text-slate-700  mb-5"
                type="file"
                id="image"
                name="image"
                onChange={handleItemUpload}
              />
            </div>
            <div className="p-3 rounded-md text-sm md:text-md lg:text-base bg-indigo-500 hover:bg-indigo-800 text-white w-[230px] 2xl:mb-10">
              <button type="button" onClick={submitUserHandler}>
                Edit Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
