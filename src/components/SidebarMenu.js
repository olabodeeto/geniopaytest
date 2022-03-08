import React from "react";
import dashboardicon from "../assets/icons/dashboardicon.svg";
import wallet from "../assets/icons/wallet.svg";
import card from "../assets/icons/card.svg";
import fx from "../assets/icons/fx.svg";
import profile from "../assets/icons/profile.svg";
import tag from "../assets/icons/tag.svg";
import { Link } from "react-router-dom";

export default function SidebarMenu() {
  return (
    <>
      {" "}
      <div className="w-9/12 md:w-10/12 m-auto mt-14">
        <ul>
          <Link to="/">
            <li className="flex gap-4 bg-white p-4 rounded-md mb-5">
              <div>
                <img src={dashboardicon} alt="" />
              </div>
              <h2>Dashboard</h2>
            </li>
          </Link>

          <Link to="/" className="">
            <li className="flex gap-4 hover:bg-seconday p-4 rounded-md mb-2">
              <div className="flex items-center">
                <img src={wallet} alt="" />
              </div>
              <h2 className="text-white">Wallet</h2>
            </li>
          </Link>

          <Link to="/">
            <li className="flex gap-4 hover:bg-seconday  p-4 rounded-md mb-2">
              <div className="flex items-center">
                <img src={card} alt="" />
              </div>
              <h2 className="text-white">Card</h2>
            </li>
          </Link>

          <Link to="/">
            <li className="flex gap-4 hover:bg-seconday p-4 rounded-md mb-2">
              <div className="flex items-center">
                <img src={fx} alt="" />
              </div>
              <h2 className="text-white">FX Centre</h2>
            </li>
          </Link>

          <Link to="/">
            <li className="flex gap-4 hover:bg-seconday p-4 rounded-md mb-2">
              <div className="flex items-center">
                <img src={profile} alt="" />
              </div>
              <h2 className="text-white">Beneficiaries</h2>
            </li>
          </Link>

          <Link to="/">
            <li className="flex gap-4 hover:bg-seconday p-4 rounded-md mb-2">
              <div className="flex items-center">
                <img src={tag} alt="" />
              </div>
              <h2 className="text-white">Perks</h2>
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
}
