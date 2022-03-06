import React from "react";

export function HeroButton({ title }) {
  return (
    <div className="py-3 px-5 cursor-pointer relative top-10 rounded-md bg-white">
      {title}
    </div>
  );
}
