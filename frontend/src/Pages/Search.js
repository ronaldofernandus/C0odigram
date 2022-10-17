import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../Components/Loading";
import { getPosts } from "../features/post/postAction";

import { Link } from "react-router-dom";

const Search = () => {
  const { search } = useParams();

  const { user } = useSelector((state) => state.auth);
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.posts
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getPosts());
  }, [user, navigate, dispatch, isError, message]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="h-full dark:bg-neutral-900">
      <div className="text-center">
        <h1 className="text-2xl text-transparent md:text-3xl">
          Codigram Posts
        </h1>
      </div>
      <div className="mt-20">
        {posts ? (
          posts
            .filter((post) => {
              if (search === "") {
                return post;
              } else if (post.name) {
                return post;
              } else if (post.caption) {
                return post;
              }
            })

            .map((post) => {
              // console.log(getListJobsResult);
              return (
                <>
                  <div className="flex items-center justify-center drop-shadow-xl rounded-xl mb-10 bg-slate-100 dark:bg-slate-800 mx-auto max-w-[375px] md:max-w-[900px]">
                    <div>
                      <div className="flex flex-row m-3 w-full">
                        <a href="/">
                          <img
                            src={
                              !post.User.image
                                ? "https://via.placeholder.com/150"
                                : require(`../../../images/${post.User.image}`)
                            }
                            className="rounded-full drop-shadow-lg bg-no-repeat bg-cover w-10 h-9 md:w-14 md:h-14"
                            alt="Avatar"
                          />
                        </a>
                        <div className="flex flex-col items-start justify-center ml-5">
                          <a
                            href="/"
                            className="text-black dark:text-white mb-0"
                          >
                            <strong>{post.User.name}</strong>
                          </a>
                          <a href="/" className="text-gray-400">
                            <small>
                              {post.createdAt.substring(14, 19)}{" "}
                              {post.createdAt.substring(0, 7)} {/* 10h */}
                            </small>
                          </a>
                        </div>
                        <a
                          href="/"
                          className="text-black font-bold text-lg dark:text-white ml-[177px] md:ml-[555px] lg:ml-[690px]"
                        >
                          . . .
                        </a>
                      </div>

                      <Link to={`/clicked/${post.id}`}>
                        <img
                          src={
                            !post.image
                              ? "https://via.placeholder.com/150"
                              : require(`../../../images/${post.image}`)
                          }
                          className="bg-no-repeat bg-cover"
                          alt="..."
                        />
                      </Link>
                      <div className="flex flex-row m-3 p-3 text-gray-800 dark:text-gray-300 text-left text-sm w-full">
                        {/* <h3>{caption}</h3> */}
                        <h3>{post.caption}</h3>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
        ) : isLoading ? (
          <p>Loading...</p>
        ) : (
          <p>{isError ? isError : "Data Kosong"}</p>
        )}
      </div>

      {/* <AllPost /> */}
    </section>
  );
};

export default Search;
