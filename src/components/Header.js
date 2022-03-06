import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Aside from "./Aside";
import searchicon from "../assets/icons/search.svg";
import tree from "../assets/icons/tree.svg";
import notificationicon from "../assets/icons/notification.svg";
import avatar from "../assets/avatar.svg";

export default function Header() {
  const [navbarOpen, setnavbarOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <div className="flex gap-0 z-50 fixed flex-row w-full h-full">
        <Aside openNav={navbarOpen} />
        <header className="lg:w-10/12 shadow-md md:shadow-none top-0 w-full flex justify-between items-center px-2 h-20 bg-white">
          <div className="flex gap-6 md:gap-0 w-full md:mt-6">
            <div className="md:mt-4 lg:hidden">
              <button
                className="lg:hidden mt-3"
                onClick={() => setnavbarOpen(!navbarOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
            <div className="flex w-full md:pl-4 md:py-5 ">
              <div className=" hidden lg:block w-4/12">
                <h2 className="text-2xl xl:3xl text-textColor mt-5 xl:mt-4">
                  Welcome, Huss Smith
                </h2>
              </div>
              <div className="w-11/12 md:w-9/12 justify-between flex gap-4 items-center">
                <div
                  className={`flex items-center gap-2 md:w-5/12 ${
                    showSearch
                      ? "border border-slate-500 absolute z-40 bg-white"
                      : "border-0 lg:border border-slate-500"
                  } h-12 pl-4 rounded-xl`}
                >
                  <div
                    onClick={() => setShowSearch(!showSearch)}
                    className="w-6"
                  >
                    <img src={searchicon} alt="" />
                  </div>
                  <form
                    className={`${showSearch ? "block" : "hidden lg:block"}`}
                  >
                    <input
                      type="search"
                      placeholder="Search"
                      className="h-full w-full outline-none"
                    />
                  </form>
                </div>

                <div className="flex gap-2">
                  <div className="w-6 md:w-6 h-auto">
                    <img src={tree} alt="" />
                  </div>
                  <div className="flex gap-2">
                    <span>0</span>
                    <span className="hidden md:block">Planted</span>
                  </div>
                </div>

                <div className="ml-12 md:ml-2 w-20 lg:w-6 h-auto">
                  <img src={notificationicon} alt="" />
                </div>

                {/* Avatar */}

                <div className="ml-1">
                  <div className=" flex xl:mb-3">
                    <div className="w-10">
                      <img src={avatar} alt="" className="avatar" />
                    </div>
                    <div className="hidden mt-3 md:block ml-2 mr-2">
                      <p className="text-green-500 leading-3 text-sm">
                        Verified
                      </p>
                      <h2 className="text-primary text-sm">Huss Smith</h2>
                    </div>
                    <div className="md:mr-2 flex justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
