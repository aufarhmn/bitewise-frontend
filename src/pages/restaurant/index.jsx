import React from "react";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import Button from "@/components/Button";
import Image from "next/image";
import Banana from "@/assets/image/banana.png";
import Orange from "@/assets/image/orange.png";
import Omlete from "@/assets/image/omlete.png";
import { useRouter } from "next/router";

export default function ChooseAlgorithm() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index, algorithm) => {
    setActiveIndex(index);
    localStorage.setItem("algorithm", algorithm);
  };

  const handleSubmit = () => {
    if (activeIndex == null) {
      alert("Please choose one algorithm!");
      return;
    }

    router.push("/restaurant");
  };

  const items = [
    { id: 1, name: "TOPSIS", image: Banana, algorithm: "topsis" },
    { id: 2, name: "Scoring Method", image: Orange, algorithm: "scoring" },
    { id: 3, name: "AHP", image: Omlete, algorithm: "ahp" }
  ];

  return (
    <>
      <Navbar />
      <div className="flex flex-col w-full h-fit bg-white items-center py-8">
        <div className="flex flex-col items-center justify-center font-['Poppins'] pt-2">
          <p className="font-bold text-2xl text-center md:text-3xl">
            What <span className="text-green-400">algorithm</span> would you
            like to use?
          </p>
          <p className="text-lg md:text-xl py-2">
            Choose the right method, curated for you!
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center py-8 gap-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleClick(index, item.algorithm)}
              className={`w-full sm:w-[300px] h-[350px] ${
                activeIndex === index
                  ? "border-green-200 bg-green-100"
                  : "border-gray-200"
              } border-2 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer`}
            >
              <div>
                <Image src={item.image} alt="Cereal" width={200} height={200} />
              </div>
              <div className="font-['Poppins'] font-extrabold text-lg md:text-xl text-center text-green-200">
                {item.name.split(" ").map((word, idx) => (
                  <p key={idx}>{word}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div onClick={handleSubmit}>
          <Button text="Start!" />
        </div>
      </div>
    </>
  );
}
