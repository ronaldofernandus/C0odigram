import React, { useState, useEffect } from "react";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { BsGrid3X3 } from "react-icons/bs";

import Gallery from "./Gallery";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../features/auth/authSlice";
import { getMyProfile } from "../../features/post/postAction";
import { resetPost } from "../../features/post/postSlice";
import Loading from "../../Components/Loading";
import MyProfile from "./MyProfile";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.posts
  );

  let myGallery = posts.map((post) => {
    const { image } = post;
    return image;
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isLoading) {
      return <Loading />;
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getMyProfile());

    dispatch(reset());
    dispatch(resetPost());
  }, [user, navigate, dispatch]);

  return (
    <section className="h-full dark:bg-neutral-900 relative">
      {/* Transparent */}
      <div className="text-center">
        <h1 className="text-2xl text-transparent md:text-3xl">
          Codigram Posts
        </h1>
      </div>
      <div className="mt-20"></div>

      <MyProfile />

      <div className="container mx-auto flex flex-col items-center justify-center space-y-5">
        <BsGrid3X3 className="text-indigo-900 md:text-xl dark:text-gray-300" />

        <div className="grid grid-cols-3 gap-1 md:gap-4 flex-row-reverse items-center justify-center">
        
          {isLoading ? (
            <Loading />
          ) : posts === null ||
            myGallery.length === null ||
            posts === "undefined" ||
            myGallery.length === "undefined" ? (
            <Loading />
          ) : myGallery.length === 0 ? (
            <div className="flex flex-col text-3xl text-gray-400">
              <div className="flex flex-col absolute z-0">
                <MdOutlinePhotoCamera />
                <h2 className="ml-[-70px]">No Posts Yet</h2>
              </div>
            </div>
          ) : isError ? (
            <h2 className="ml-[-70px]">Error</h2>
          ) : (
            posts.map((post) => {
              const { id, image } = post;
              return <Gallery key={id} gallery={image} imageId={id} />;
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
