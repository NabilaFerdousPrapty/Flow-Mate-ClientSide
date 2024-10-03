import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaSearchengin, FaTimes } from "react-icons/fa";
import Dropdown from "@/components/dropdown/Dropdown";
import { Button } from "@/components/ui/button";

import { useSelector } from "react-redux";
import UseAdmin from "@/hooks/UseAdmin";

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  console.log(user, loading);
const isAdmin=UseAdmin();
console.log(isAdmin);

  const [toggleOpen, setToggleOpen] = useState(false);

  const toggleHandler = () => {
    setToggleOpen(!toggleOpen);
  };


  return (
    <div>
      <nav className="relative shadow rounded-3xl">
        <div className="container px-6 py-1 mx-auto">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex items-center justify-between">
              <Link to={"/"}>
                <img
                  className="xl:h-20 md:h-16 h-12 w-auto rounded-full"
                  src="https://i.ibb.co.com/WgPKBVY/Screenshot-2024-09-18-161854-removebg-preview.png"
                  alt="Logo"
                />
              </Link>

              {/* Mobile menu button */}
              <div className="flex lg:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                  aria-label="toggle menu"
                >
                  {!isOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 8h16M4 16h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <div
              className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white shadow-md lg:bg-transparent lg:dark:bg-transparent lg:shadow-none dark:bg-gray-900 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "opacity-0 -translate-x-full"
              }`}
            >
              {/* Conditionally Render Nav Links or Search Input */}
              {!searchOpen ? (
                <div className="flex flex-col space-y-4 lg:mt-0 lg:flex-row lg:-px-8 lg:space-y-0 text-center w-full">
                  <NavLink
                    className="text-gray-700 transition-colors duration-300 transform lg:mx-8 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500"
                    to="/"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    className="text-gray-700 transition-colors duration-300 transform lg:mx-8 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500"
                    to="/about"
                  >
                    About us
                  </NavLink>
                  <NavLink
                    className="text-gray-700 transition-colors duration-300 transform lg:mx-8 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500"
                    to="/pricing"
                  >
                    Pricing
                  </NavLink>
                  <NavLink
                    className="text-gray-700 transition-colors duration-300 transform lg:mx-8 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500"
                    to="/contact"
                  >
                    Contact
                  </NavLink>

                  <NavLink
                    className="text-gray-700 transition-colors duration-300 transform lg:mx-8 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500"
                    to="/dashboard"
                  >
                    Dashboard
                  </NavLink>

                  <button
                    className="text-gray-700 transition-colors duration-300 transform lg:mx-8 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500 mx-auto"
                    onClick={() => setSearchOpen(true)}
                  >
                    <FaSearchengin className="text-lg" />
                  </button>
                  <div className="flex items-center  lg:mt-0 justify-center gap-1">
                    {user ? (
                      <Dropdown />
                    ) : (
                      <Link to={"/login"}>
                        <Button
                          color="gray"
                          type="button"
                          className="flex items-center focus:outline-none bg-[#0047AB] text-white"
                          aria-label="toggle profile dropdown"
                        >
                          Login
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                // Search Input Field with Cross Button and Full Width
                <div className="relative flex items-center justify-between w-full">
                  <input
                    placeholder="Enter Your Query"
                    type="text"
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none w-[75lvw] 
                  lg:w-[70lvw] xl:w-[63lvw] 2xl:w-[45lvw]  dark:bg-gray-800"
                  />
                  <button
                    className="ml-2 text-red-500"
                    onClick={() => setSearchOpen(false)}
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Hero;
