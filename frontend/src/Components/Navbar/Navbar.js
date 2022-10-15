import React, { useEffect, useState } from "react";
import useDarkMode from "./useDarkMode";
import { FaMoon } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";
import { AiFillHome, AiOutlinePlusSquare } from "react-icons/ai";
import { HiOutlineSearch } from "react-icons/hi";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authAction";
import { reset } from "../../features/auth/authSlice";
import Swal from "sweetalert2";
import { CgProfile } from "react-icons/cg";
import MainContent from "../MainContent";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme, newTheme] = useDarkMode();
  const switchTheme = () => {
    setTheme(newTheme);
  };

  const { user, isError, isLogout, message } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    Swal.fire({
      title: "Do you want to logout?",
      showCancelButton: true,
      confirmButtonText: "Logout",
      confirmButtonColor: "#DD6B55",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        dispatch(reset());
      }
    });
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isLogout) {
      navigate("/login");
    }
    dispatch(reset());
  }, [user, isError, message, isLogout, navigate, dispatch]);

  return (
    <nav
      className="h-[80px] z-10 px-6 w-screen border-b-2 bg-white dark:!bg-neutral-900 md:px-24"
      style={user ? { position: "fixed" } : { position: "static" }}
    >
      <div className="container mx-auto flex items-center justify-around h-full">
        <h1 className="font-title font-bold text-xl drop-shadow-md md:text-2xl lg:text-4xl">
          Codigram
        </h1>
        <HiOutlineSearch
          style={{
            marginLeft: "1.2rem",
            marginTop: "-0.1rem",
            position: "absolute",
          }}
          className="text-gray-400 text-xs md:text-sm mr-44 md:mr-[350px] lg:mr-[305px]"
          size="1.5em"
          onClick={() => navigate(`/home/search/${searchQuery}`)}
        />
        <input
          type="search"
          className="w-24 text-sm rounded p-1 pl-7 mx-3 text-black bg-white bg-clip-padding border border-gray-300 focus:outline-none dark:bg-slate-800 dark:border-gray-700 dark:text-white md:pl-9 md:p-1.5 md:w-64"
          placeholder="Search"
          onChange={(event) => setSearchQuery(event.target.value)}
        />

        <div className="text-2xl flex items-center ">
          {user ? (
            <ul className="flex space-x-3.5 items-center justify-center text-sm md:mr-10 md:text-base">
              <li className="text-2xl">
                <Link to="/home/content">
                  <AiFillHome />
                </Link>
              </li>

              <li className="text-2xl">
                <Link to="/home/profile">
                  <CgProfile />
                </Link>
              </li>
              <li
                type="button"
                onClick={onLogout}
                className="text-indigo-800 dark:text-blue-400"
              >
                <button
                  type="button"
                  className="cursor-pointer font-semibold hover:text-indigo-500"
                >
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="flex space-x-3.5 items-center justify-center text-sm md:mr-10 md:text-base">
              <li className="">
                <Link
                  to="/register"
                  type="button"
                  className="px-2 py-2.5 bg-gradient-to-r from-indigo-500 to-blue-400 text-white font-medium text-sm leading-tight rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-600 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out dark:bg-gradient-to-r dark:from-indigo-600 dark:to-blue-400"
                >
                  Register
                </Link>
              </li>
              <li
                type="button"
                className="text-indigo-500 font-semibold dark:text-blue-400"
              >
                <Link to="login">Login</Link>
              </li>
            </ul>
          )}

          <button href="Logo" onClick={switchTheme} className="ml-5 md:ml-3">
            {theme === "light" ? <FaMoon /> : <BsFillSunFill />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
