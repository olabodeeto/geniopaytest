import React from "react";
import Header from "../components/Header";
import flag1 from "../assets/flag1.svg";
import flag2 from "../assets/flag2.svg";
import flag3 from "../assets/flag3.svg";
import QuickLinks from "../components/QuickLinks";
import LineChart from "../components/LineChart";
import transactionchat from "../assets/icons/transactionchat.svg";
import payin from "../assets/icons/payin.svg";
import payout from "../assets/icons/payout.svg";

export default function Homepage() {
  return (
    <>
      <div className="h-screen">
        <Header />
        <div className="main-container relative overflow-scroll">
          <main className="pt-32 pb-40 w-full flex  overflow-scroll">
            <div className="w-3/12 hidden md:block"></div>

            <div className="w-full md:w-12/12 m-auto px-4 md:px-14">
              {/* wallet list */}
              <div>
                <div className="flex justify-between">
                  <h2 className="text-2xl font-semibold text-textColor">
                    Wallet (5)
                  </h2>
                  <h2 className="text-base font-semibold text-primary">
                    View all wallets
                  </h2>
                </div>
                <div className="flex flex-col md:flex-row gap-4 overflow-scroll w-full mt-10">
                  <div className="p-4 bg-siteYellow w-full m-auto md:m-0 md:w-4/12">
                    <div className="flex justify-between">
                      <div>
                        <h3>Personal account</h3>
                        <p>USD</p>
                      </div>
                      <div className="rounded-full">
                        <img src={flag1} alt="" className="rounded-full" />
                      </div>
                    </div>
                    <p className="mt-10 text-3xl text-textColor font-bold">
                      $10,250.00
                    </p>
                  </div>

                  <div className="p-4 bg-sitePink w-full m-auto md:m-0 md:w-4/12">
                    <div className="flex justify-between">
                      <div>
                        <h3>EUR Wallet</h3>
                        <p>EUR</p>
                      </div>
                      <div className="rounded-full">
                        <img src={flag2} alt="" className="rounded-full" />
                      </div>
                    </div>
                    <p className="mt-10 text-3xl text-textColor font-bold">
                      €4000.53
                    </p>
                  </div>

                  <div className="p-4 bg-siteTeal w-full m-auto md:m-0 md:w-4/12">
                    <div className="flex justify-between">
                      <div>
                        <h3>EUR Wallet</h3>
                        <p>EUR</p>
                      </div>
                      <div className="rounded-full">
                        <img src={flag3} alt="" className="rounded-full" />
                      </div>
                    </div>
                    <p className="mt-10 text-3xl text-textColor font-bold">
                      €4000.53
                    </p>
                  </div>
                </div>
              </div>

              <QuickLinks />
              <section className="mt-20 px-3 w-full">
                <div className="flex justify-between w-full  items-center">
                  <div className="flex  flex-col w-6/12 md:flex-row md:items-center gap-2 md:gap-10">
                    <h2 className="text-sm mt-2 md:mt-0 md:text-xl font-bold text-textColor">
                      Activity
                    </h2>
                    <div className="flex gap-2 items-center  md:mt-1 w-8/12">
                      <label className="text-primary"> Month</label>
                      <div className="flex flex-col">
                        <select className="outline-none">
                          <option
                            className="firstitem-section "
                            value="0"
                          ></option>
                          <option className="" value="1">
                            Jan
                          </option>
                          <option className="" value="2">
                            Feb
                          </option>
                          {/* <option className="" value="2">
                        Mar
                      </option>
                      <option className="" value="2">
                        Apr
                      </option>
                      <option className="" value="2">
                        May
                      </option>
                      <option className="" value="2">
                        Jun
                      </option>
                      <option className="" value="2">
                        Jul
                      </option>
                      <option className="" value="2">
                        Aug
                      </option>
                      <option className="" value="2">
                        Sept
                      </option>
                      <option className="" value="2">
                        Oct
                      </option>
                      <option className="" value="2">
                        Nov
                      </option>
                      <option className="" value="2">
                        Dec
                      </option> */}
                        </select>
                      </div>
                    </div>
                  </div>
                  <h2 className="text-sm  md:mb-0 md:text-base font-semibold text-primary">
                    View Transaction History
                  </h2>
                </div>

                <div className="">
                  <div className="mt-10 flex gap-6 flex-wrap md:gap-10 md:justify-end">
                    <div className="py-3 md:px-5 flex">
                      <div>
                        <img src={transactionchat} alt="" />
                      </div>
                      <div>
                        <p className="leading-3">Total transactions</p>
                        <p className="text-black font-bold text-sm md:text-base">
                          $88,600.00
                        </p>
                      </div>
                    </div>

                    <div className="py-3 md:px-5 flex">
                      <div>
                        <img src={payin} alt="" />
                      </div>
                      <div>
                        <p className="leading-3">Pay-In</p>
                        <p className="text-black font-bold text-sm md:text-base ">
                          $4,600.00
                        </p>
                      </div>
                    </div>

                    <div className="py-3 md:px-5 flex">
                      <div>
                        <img src={payout} alt="" />
                      </div>
                      <div>
                        <p className="leading-3">Pay-In</p>
                        <p className="text-black font-bold text-sm md:text-base ">
                          $72,600.00
                        </p>
                      </div>
                    </div>
                  </div>
                  <LineChart />
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
