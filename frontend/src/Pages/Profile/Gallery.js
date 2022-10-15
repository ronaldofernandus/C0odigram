import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


const Gallery = ({ gallery, imageId }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }


  }, [user, navigate, dispatch]);

  return (
    <div className="">
      <Link to={`/detail/${imageId}`}>
        <img
          src={
            gallery
              ? require(`../../../../images/${gallery}`)
              : "https://via.placeholder.com/150"
          }
          className="bg-slate-200 p-0.5 dark:border-none dark:bg-indigo-200  w-full h-28 md:w-[300px] md:h-[200px]"
          alt="..."
        />
      </Link>
    </div>
  );
};

export default Gallery;
