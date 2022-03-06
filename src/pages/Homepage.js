import React from "react";
import Header from "../components/Header";
import { HeroButton } from "../components/Button";
import { Link } from "react-router-dom";
import bgvideo from "../assets/bg.mp4";

export default function Homepage() {
  return (
    <>
      <Header />
      <main className="pt-32 w-full p-4 lg:w-10/12 lg:ml-80">
        {/* wallet list */}
        <div>
          <h2>Wallet (5)</h2>
        </div>
      </main>
    </>
  );
}
