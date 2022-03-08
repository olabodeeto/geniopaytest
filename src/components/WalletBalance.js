import React from "react";
import greenwallet from "../assets/icons/greenwallet.svg";
import security from "../assets/icons/security.svg";
import orangestar from "../assets/icons/orangestar.svg";

export default function WalletBalance() {
  return (
    <>
      <div className="p-2 pb-4 px-5 bg-seconday rounded-md w-9/12 md:w-10/12 m-auto mt-6">
        <div className="flex gap-3 mb-2">
          <div className="flex w-2/12 tems-center">
            <img src={greenwallet} alt="" />
          </div>
          <div className="w-10/12 py-1">
            <p className="text-white leading-4">Wallet Balance</p>
            <p className="text-white font-bold leading-4">$15,001.00</p>
          </div>
          <div className="flex justify-start w-2/12 items-center ">
            <img src={security} alt="" />
          </div>
        </div>
        <hr className="hr" />
        <div className="flex gap-3 mb-2">
          <div className="flex w-2/12 tems-center">
            <img src={orangestar} alt="" />
          </div>
          <div className="w-10/12 py-1">
            <p className="text-white leading-4">Awarded Points</p>
            <p className="text-white font-bold leading-4">35</p>
          </div>
          <div className="flex justify-start w-2/12 items-center "></div>
        </div>
        <hr className="hr" />
        <div className="flex gap-2 mt-4 justify-center">
          <button className="py-2 px-6 text-white bg-red-300 rounded-md">
            Pay-in
          </button>
          <button className="py-2 px-6 text-primary bg-white rounded-md">
            Pay-out
          </button>
        </div>
      </div>
    </>
  );
}
