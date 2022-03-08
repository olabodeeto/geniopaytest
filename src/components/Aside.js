import React, { useState, useLayoutEffect } from "react";
import logo from "../assets/logo.svg";
import WalletBalance from "./WalletBalance";
import ReferAd from "./ReferAd";
import SidebarMenu from "./SidebarMenu";

export default function Aside({ openNav }) {
  const [navbarOpen, setnavbarOpen] = useState(true);

  useLayoutEffect(() => {
    setnavbarOpen(!navbarOpen);
  }, [openNav]);

  return (
    <>
      <aside
        className={` bg-primary top-0 h-screen w-full fixed z-50 ${
          navbarOpen ? "sidebar-left-open" : "sidebar-left-close"
        }  lg:relative lg:w-80 left-0  z-50`}
      >
        <div className="overflow-scroll h-screen">
          <div className="p-2 md:mr-4 md:mt-4 flex justify-end lg:hidden">
            <button
              className="lg:hidden"
              onClick={() => setnavbarOpen(!navbarOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
          </div>
          <div className=" w-full p-4 md:mt-4 flex justify-center">
            <img src={logo} alt="" />
          </div>
          <WalletBalance />
          <SidebarMenu />
          <ReferAd />
        </div>
      </aside>
    </>
  );
}
