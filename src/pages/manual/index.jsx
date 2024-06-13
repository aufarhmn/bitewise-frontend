import React from "react";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import Button from "@/components/Button";
import Image from "next/image";
import Banana from "@/assets/image/banana.png";
import Orange from "@/assets/image/orange.png";
import Omlete from "@/assets/image/omlete.png";
import { useRouter } from "next/router";
import { IoIosInformationCircleOutline } from "react-icons/io";

export default function ChooseAlgorithm() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(null);
  const [modalContent, setModalContent] = useState("");

  const handleClick = (index, algorithm) => {
    setActiveIndex(index);
    localStorage.setItem("algorithm", algorithm);
  };

  const handleSubmit = () => {
    if (activeIndex == null) {
      alert("Please choose one algorithm!");
      return;
    }

    router.push("/manual/input");
  };

  const handleInfoClick = (content) => {
    setModalContent(content);
    document.getElementById("info_modal").showModal();
  };

  const items = [
    {
      id: 1,
      name: "TOPSIS",
      image: Banana,
      algorithm: "topsis",
      info: "TOPSIS is a decision-making method that helps you choose the best option by comparing the distances between each option and the ideal (best) and negative-ideal (worst) solutions. It evaluates each choice based on how close it is to the ideal solution, considering multiple criteria."
    },
    {
      id: 2,
      name: "Scoring Method",
      image: Orange,
      algorithm: "scoring",
      info: "The Scoring Method is a straightforward way to evaluate different options by assigning scores based on various criteria. Each criterion is weighted according to its importance, and the total score for each option is calculated to determine the best choice."
    }
    // { id: 3, name: "AHP", image: Omlete, algorithm: "ahp" }
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
              } border-2 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer relative`}
            >
              <div className="absolute top-2 right-2">
                <button
                  className="btn btn-sm btn-circle btn-ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInfoClick(item.info);
                  }}
                >
                  <IoIosInformationCircleOutline className="w-3/4 h-3/4" />
                </button>
              </div>
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

      <dialog id="info_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-center">About The Method</h3>
          <p className="py-4 text-center">{modalContent}</p>
        </div>
      </dialog>
    </>
  );
}
