import React from "react";
import Link from "next/link";

export default function Button({ text, path }) {
  return (
    <>
      <Link href={path}>
        <button className="bg-green-400 text-white font-bold py-2 px-4 rounded">
          {text}
        </button>
      </Link>
    </>
  );
}
