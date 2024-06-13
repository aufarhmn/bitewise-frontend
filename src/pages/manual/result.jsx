import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Result() {
  const router = useRouter();
  const [restaurantData, setRestaurantData] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("restaurantResult"));
    if (data) {
      try {
        setRestaurantData(data);
      } catch (error) {
        console.log("Failed to parse data");
      }
    } else {
      router.replace("/manual");
    }
  }, [router]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col w-full h-fit bg-white items-center py-8 gap-4 font-['Poppins']">
        <div className="flex flex-col items-center justify-center font-['Poppins'] pt-2">
          <p className="font-bold text-[30px] text-center">
            Here is your <span className="text-green-400">result!</span>
          </p>
          <p className="text-[17px] py-2 text-center">Yay, its time to eat!</p>
        </div>
        <div className="px-8">
          <table className="min-w-full bg-white rounded-md overflow-hidden">
            <thead>
              <tr className="bg-green-100 text-green-400 text-left text-sm leading-normal">
                <th className="py-3 px-6">Rank</th>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Score</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-sm font-light">
              {restaurantData.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{item.choice}</td>
                  <td className="py-3 px-6">{item.totalScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-row-reverse justify-start w-full h-full px-8 py-4">
          <Link href="/">
            <Button text="Start again!" />
          </Link>
        </div>
      </div>
    </>
  );
}
