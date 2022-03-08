import React from "react";
import addwallet from "../assets/icons/addwallet.svg";
import addcard from "../assets/icons/addcard.svg";
import balanceex from "../assets/icons/balanceex.svg";
import transfer from "../assets/icons/transfer.svg";
import generate from "../assets/icons/generate.svg";
import mobilemoney from "../assets/icons/mobilemoney.svg";
import paymentlink from "../assets/icons/paymentlink.svg";

export default function QuickLinks() {
  return (
    <>
      <div className="mt-14">
        <h2 className="text-xl font-bold text-textColor">Quick Links</h2>
        <p className="text-slate-400 space-x-2">
          Your frequently used actions for easy access.
        </p>

        <div className="mt-10">
          <div className="w-full grid grid-cols-3 md:grid-cols-7 gap-4 overflow-scroll">
            <div className="flex flex-col border border-slate-200 rounded-md p-2 w-full justify-center items-center">
              <div>
                <img src={addwallet} alt="" />
              </div>
              <p className="text-center mt-2 text-textColor w-10/12 m-auto">
                Add new Wallet
              </p>
            </div>
            <div className="flex flex-col border border-slate-200 rounded-md p-2 w-full justify-center items-center">
              <div>
                <img src={addcard} alt="" />
              </div>
              <p className="text-center mt-2 text-textColor w-10/12 m-auto">
                Add new Card
              </p>
            </div>
            <div className="flex flex-col border border-slate-200 rounded-md p-2 w-full justify-center items-center">
              <div>
                <img src={balanceex} alt="" />
              </div>
              <p className="text-center mt-2 text-textColor w-10/12 m-auto">
                Balance Exchange
              </p>
            </div>
            <div className="flex flex-col border border-slate-200 rounded-md p-2 w-full justify-center items-center">
              <div>
                <img src={transfer} alt="" />
              </div>
              <p className="text-center mt-2 text-textColor w-10/12 m-auto">
                Transfer to Account
              </p>
            </div>
            <div className="flex flex-col border border-slate-200 rounded-md p-2 w-full justify-center items-center">
              <div>
                <img src={generate} alt="" />
              </div>
              <p className="text-center mt-2 text-textColor w-10/12 m-auto">
                Generate Voucher
              </p>
            </div>
            <div className="flex flex-col border border-slate-200 rounded-md p-2 w-full justify-center items-center">
              <div>
                <img src={mobilemoney} alt="" />
              </div>
              <p className="text-center mt-2 text-textColor w-10/12 m-auto">
                Mobile Money
              </p>
            </div>
            <div className="flex flex-col border border-slate-200 rounded-md p-2 w-full justify-center items-center">
              <div>
                <img src={paymentlink} alt="" />
              </div>
              <p className="text-center mt-2 text-textColor w-8/12 m-auto">
                Payment Link
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
