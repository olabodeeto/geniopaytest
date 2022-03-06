import React from "react";
import megaphone from "../assets/megaphone.svg";

export default function ReferAd() {
  return (
    <>
      <div className="w-10/12 m-auto rounded-md bg-white p-4 px-5 mt-20 md:mt-32 mb-40">
        <div className="flex gap-2">
          <div className="w-4/12">
            <img src={megaphone} alt="" />
          </div>
          <div className="w-10/12">
            <h2 className="font-bold">Refer and earn</h2>
            <p className="text-sm">Use the below link to invite friends</p>
          </div>
        </div>
        <div className="flex justify-center mt-5 w-full">
          <button className="py-4 px-6 w-full rounded-md bg-primary text-white">
            Invite Friends
          </button>
        </div>
      </div>
    </>
  );
}
