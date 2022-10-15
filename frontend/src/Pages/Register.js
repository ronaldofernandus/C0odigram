import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../features/auth/authSlice";
import { register } from "../features/auth/authAction";
import { Loading } from "../Components/";
import Swal from "sweetalert2";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      if(email.includes('@')) {
        Swal.fire("Email has been used", "Please use another email", "warning");
      } else {
        Swal.fire("Please enter valid data", "data must be valid", "warning");
      }
    }

    if (isSuccess) {
      Swal.fire("Successfully registered","You can login now", "success");
      navigate("/login");
    }
    
    dispatch(reset());
  }, [user, isError, email, isSuccess, message, navigate, dispatch]);

  useEffect(() => {
    user && navigate('/') 
  }, [user,navigate])

  const submitHandler = (e) => {
    dispatch(register(formData));
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
            Sign up to see photos from programmers
          </p>
        </div>

        <div className="text-left mt-2 mb-12">
          <form action="">
            <div>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Name"
                className="form-control p-2 rounded focus:outline-none text-black w-72 md:w-96  md:text-base lg:text-base"
              />
            </div>
            <div className="mt-4">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Email"
                className="form-control p-2 rounded focus:outline-none text-black w-72 md:w-96 md:text-base lg:text-base "
              />
            </div>
            <div className="mt-4">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Password"
                className="form-control p-2 rounded focus:outline-none text-black w-72 md:w-96  md:text-base lg:text-base"
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                onClick={(e) => submitHandler()}
                className="w-full p-2 rounded bg-gradient-to-l from-indigo-600 to-blue-900 dark:bg-gradient-to-l dark:from-indigo-900 dark:to-indigo-600 text-white drop-shadow-lg lg:w-96 md:text-base lg:text-base "
              >
                Register
              </button>
            </div>
          </form>
        </div>

        <div className="text-center text-xs mt-22  md:text-sm">
          <h5 className="text-gray-300">Have an account ?</h5>
          <Link to="/login" className="text-sm text-gray-100 font-bold">
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
