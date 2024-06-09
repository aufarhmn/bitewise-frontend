import React from "react";
import Image from "next/image";
import IconNavbar from "@/assets/image/icon-navbar.png";
import Profile from "@/assets/image/profile.png";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <div className="navbar bg-base-100 px-8 py-4">
        <div className="flex-none">
          <Link href="/">
            <Image src={IconNavbar} alt="Icon" width={50} height={50} />
          </Link>
        </div>
        <div className="flex-1">
          <Link href="/">
            <p className="text-xl font-['Inter'] text-green-400">
              <b>Bite</b>Wise
            </p>
          </Link>
        </div>
        <div className="flex-none">
          <Image src={Profile} alt="Profile Icon" width={50} height={50} />
        </div>
      </div>
    </>
  );
}
