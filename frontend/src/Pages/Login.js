import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../features/auth/authSlice";
import { login } from "../features/auth/authAction";
import { Loading } from "../Components";
import Swal from "sweetalert2";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      Swal.fire("User is not found", "Enter correct email and password", "error");
    }

    if (isSuccess && user) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);
  
  
  useEffect(() => {
    user && navigate('/') 
  }, [user,navigate])


  const submitHandler = (e) => {
    dispatch(login(formData));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="flex justify-center items-center m-4 md:m-10 lg:m-20">

      <div className="flex flex-col h-[500px] w-screen mx-auto p-8 bg-gradient-to-r from-indigo-400 to-blue-600 dark:bg-gradient-to-r dark:from-indigo-600 dark:to-blue-800 rounded-lg text-justify items-center justify-center md:w-[500px] xl:w-5/12">
        
        <div className="m-2">
          <h2 className="text-white font-bold mb-6 text-6xl text-center md:text-start ">
            <span className="codigram drop-shadow-lg">Codigram</span>
          </h2>
          <p className="text-gray-200 text-sm text-center mb-2 md:text-lg">
            Please login to your account
          </p>
        </div>

        <div className="text-left mt-2 mb-12">
          <form action="">
            <div>
              <input
                id="email"
                type="text"
                value={email}
                name="email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
                className="form-control p-2 rounded focus:outline-none text-black md:w-60 lg:w-64  md:text-base lg:text-base"
              />
            </div>
            <div className="mt-4">
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter password"
                className="form-control p-2 rounded focus:outline-none text-black md:w-60 lg:w-64 xl:w-64 md:text-base lg:text-base "
              />
            </div>
            <div className="mt-4">
              <button
                className="w-full p-2 rounded bg-gradient-to-l from-indigo-600 to-blue-900 dark:bg-gradient-to-l dark:from-indigo-900 dark:to-indigo-600 text-white drop-shadow-lg md:w-60 lg:w-64 xl:w-64 md:text-base lg:text-base"
                id="submit"
                type="submit"
                onClick={(e) => submitHandler()}
              >
                Login
              </button>
            </div>
          </form>
        </div>

        <div className="text-center text-xs mt-22  md:text-sm">
          <h5 className="text-gray-300">Don't have an account ?</h5>
          <Link to="/register" className="text-sm text-gray-100 font-bold">
            Sign up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
