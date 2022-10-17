import React, { useState, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../features/auth/authSlice";
import EditPost from "./EditPost";
import { detailPost, deletePost } from "../../features/post/postAction";
import { resetPost } from "../../features/post/postSlice";
import Swal from "sweetalert2";
import { getUserDetail } from "../../features/auth/authAction";

const DetailPost = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { posts } = useSelector((state) => state.posts);

  const { User, caption, image, createdAt, userData } = posts;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(detailPost(+id));
    dispatch(getUserDetail());
  }, [user, navigate, dispatch]);

  const deleteHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        dispatch(deletePost(+id));
        navigate("/home/profile");
        dispatch(resetPost());
        dispatch(reset());
      }
    });
  };

  return (
    <div className="h-screen">
      <div className="">
        <h1 className="text-2xl text-transparent md:text-3xl">
          Codigram Posts
        </h1>
      </div>
      <div className="mt-48"></div>

      <div className="text-center flex justify-center items-center ">
        <div className="flex flex-col space-y-6 w-full h-auto md:w-[550px] lg:w-[650px]  p-2 bg-slate-100 dark:bg-indigo-200 rounded">
          <div className="w-auto ">
            <img
              src={
                image
                  ? require(`../../../../images/${image}`)
                  : "https://via.placeholder.com/150"
              }
              className=""
              alt="..."
            />
          </div>

          <div className="">
            <div className="flex flex-row justify-between">
              <div className="w-full flex flex-row justify-start items-center space-x-4 ml-3">
                <img
                  src={
                    userData
                      ? require(`../../../../images/${userData}`)
                      : "https://via.placeholder.com/150"
                  }
                  className="rounded-full drop-shadow-lg w-12 h-12 md:w-14"
                  alt="Avatar"
                />
                <div className="flex space-x-5">
                  <div>
                    <p className="text-black mb-0 flex flex-row">
                      {!User ? "Anna Doe" : User.name}
                    </p>
                    <p className="text-xs text-black">
                      {!createdAt
                        ? "Posted 10 hour ago"
                        : `${createdAt.substring(0, 7)}`}
                    </p>
                  </div>
                  <p className="text-black">{caption}</p>
                </div>
              </div>

              <div className=" flex items-center">
                <div className="mr-2 md:mr-4 mb-3 text-indigo-800  rounded text-2xl">
                  <button onClick={() => setModalOpen(true)}>
                    <AiFillEdit
                      className="cursor-pointer hover:text-indigo-500"
                      type="button"
                    />
                  </button>
                  <button type="button" onClick={deleteHandler}>
                    <MdDelete
                      className="cursor-pointer hover:text-red-500"
                      type="button"
                    />
                  </button>
                </div>
                {modalOpen && (
                  <EditPost
                    setOpenModal={setModalOpen}
                    postId={+id}
                    postImage={image}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
