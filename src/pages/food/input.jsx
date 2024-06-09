import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { useRouter } from "next/router";

export default function Input() {
  const router = useRouter();
  const [foodChoices, setFoodChoices] = useState([]);
  const [foodSelected, setFoodSelected] = useState("");
  const [selectedFoodIndex, setSelectedFoodIndex] = useState(null);

  useEffect(() => {
    const storedFoodChoices = localStorage.getItem("foodChoices");
    if (storedFoodChoices) {
      try {
        setFoodChoices(JSON.parse(storedFoodChoices));
      } catch (error) {
        console.error("Failed to parse food choices from localStorage", error);
      }
    }
  }, []);

  const handleCardClick = (index, name) => {
    setSelectedFoodIndex(index);
    setFoodSelected(name);
  };

  const handleClick = () => {
    if (foodSelected == "") {
      alert("Please choose one food!");
      return;
    }
    axios
      .post(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/ai/recommendations", {
        title: foodSelected
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("similarFood", JSON.stringify(res.data));
        router.push("/food/result")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col w-full h-fit bg-white items-center py-8 gap-4 font-['Poppins']">
        <div className="flex flex-col items-center justify-center font-['Poppins'] pt-2">
          <p className="font-bold text-[30px] text-center">
            What <span className="text-green-400">kind of food</span> would you
            like to eat?
          </p>
          <p className="text-[17px] py-2 text-center">
            Choose your preferred food and we’ll give you food option similar to
            your choice!
          </p>
        </div>
        <div className="grid grid-cols-1 px-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {foodChoices.map((food, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(index, food.Name)}
              className={`border-2 rounded-lg p-4 shadow-md cursor-pointer text-center text-green-200 ${
                selectedFoodIndex === index
                  ? "bg-green-100 border-green-200"
                  : ""
              }`}
            >
              <h3 className="font-extrabold text-lg mb-2">{food.Name}</h3>
              <p className="text-sm">{food.Describe}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-row-reverse justify-start w-full h-full px-8 py-8">
          <button
            onClick={handleClick}
            className="w-[90px] h-[85px] bg-green-400 rounded-full"
          >
            <p className="text-white text-[30px] font-bold">&gt;</p>
          </button>
        </div>
      </div>
    </>
  );
}
