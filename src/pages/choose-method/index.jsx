import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import Image from "next/image";
import { useRouter } from "next/router";

import { IoIosInformationCircleOutline } from "react-icons/io";
import Cereal from "@/assets/image/cereal.png";
import Kebab from "@/assets/image/kebab.png";

export default function ChooseMethod() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(null);
  const [path, setPath] = useState("");
  const [modalContent, setModalContent] = useState("");

  const handleClick = (index, path) => {
    setActiveIndex(index);
    setPath(path);
  };

  const handleSubmit = () => {
    if (activeIndex == null) {
      alert("Please choose one method!");
      return;
    }

    router.push(path);
  };

  const handleInfoClick = (content) => {
    setModalContent(content);
    document.getElementById("info_modal").showModal();
  };

  const items = [
    {
      id: 1,
      name: "Manual Input",
      image: Cereal,
      path: "/manual",
      info: "Receive personalized food recommendations tailored to your tastes! Choose between two powerful methods—Scoring Method and AHP. Simply define your preferences, assign weights, and score each option to discover your perfect dining experience"
    },
    {
      id: 2,
      name: "Automated Input",
      image: Kebab,
      path: "/food",
      info: "Uncover delicious food recommendations tailored just for you! We'll provide a curated selection of choices, and based on your preferences, offer exciting and similar food options that match your taste perfectly. Bon appétit!"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="flex flex-col w-full h-fit bg-white items-center py-8">
        <div className="flex flex-col items-center justify-center font-['Poppins'] pt-2">
          <p className="font-bold text-2xl text-center md:text-3xl">
            What <span className="text-green-400">kind of help</span> would you
            like to get?
          </p>
          <p className="text-lg md:text-xl py-2">
            Choose the right method, curated for you!
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center py-8 gap-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleClick(index, item.path)}
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
                <Image
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={200}
                />
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
