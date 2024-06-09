import React from "react";
import Link from "next/link";

export default function Button({ text, path }) {
  return (
    <>
      <Link href={path}>
        <button className="bg-green-200 text-white font-bold py-2 px-24 rounded-lg">
          {text}
        </button>
      </Link>
    </>
  );
}
