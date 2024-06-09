import React from "react";

export default function Button({ text }) {
  return (
    <>
      <button className="bg-green-200 text-white font-bold py-2 px-24 rounded-lg">
        {text}
      </button>
    </>
  );
}
