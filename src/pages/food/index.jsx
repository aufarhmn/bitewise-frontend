import React from "react";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import Button from "@/components/Button";
import axios from "axios";
import { useRouter } from "next/router";

export default function ML() {
  const router = useRouter();
  const [method, setMethod] = useState(null);
  const [isVegetarian, setIsVegetarian] = useState(null);
  const [foodType, setFoodType] = useState(null);

  const methods = ["Random", "Highest Rank"];
  const vegetarianOptions = ["Non-vegetarian", "Vegetarian"];
  const foodTypes = [
    "Healthy Food",
    "Dessert",
    "Japanese",
    "Indian",
    "Snack",
    "Spanish",
    "French",
    "Mexican",
    "Italian",
    "Chinese",
    "Beverage",
    "Thai",
    "Korean",
    "Vietnames",
    "Nepalese"
  ];

  const handleClick = () => {
    if (!method || !isVegetarian || !foodType) {
      alert('Please select all options before proceeding!');
      return;
    }

    const endpoint = method === "Random" ? "/api/ai/random-choices" : "/api/ai/highest-choices";
    
    let isVeg = ""
    if(isVegetarian === "Non-vegetarian") {
      isVeg = "non-veg"
    } else if (isVegetarian === "Vegetarian") {
      isVeg = "veg"
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_AI_URL}${endpoint}`, {
        veg_non: isVeg,
        c_type: foodType
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem("foodChoices", JSON.stringify(response.data));
        router.push("/food/input")
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
            Choose the food based on your mood!
          </p>
        </div>
        <div className="w-3/4 flex flex-col md:flex-row justify-center items-center gap-4">
          <div className="border-gray-200 border-2 w-full md:w-1/2 h-[150px] rounded-xl flex flex-col justify-center items-center gap-2">
            <p>What method?</p>
            <div className="flex flex-row gap-4">
              {methods.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setMethod(item)}
                  className={`cursor-pointer px-4 py-2 rounded-xl ${
                    method === item ? "bg-green-200 text-white" : "bg-gray-200"
                  }`}
                >
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="border-gray-200 border-2 w-full md:w-1/2 h-[150px] rounded-xl flex flex-col justify-center items-center gap-2">
            <p>Is it vegetarian or not?</p>
            <div className="flex flex-row gap-4">
              {vegetarianOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setIsVegetarian(item)}
                  className={`cursor-pointer px-4 py-2 rounded-xl ${
                    isVegetarian === item
                      ? "bg-green-200 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-3/4 border-gray-200 border-2 rounded-xl p-4 md:p-8 flex flex-col items-center">
          <p>What kind of food?</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {foodTypes.map((item, index) => (
              <div
                key={index}
                onClick={() => setFoodType(item)}
                className={`cursor-pointer px-4 py-2 rounded-xl ${
                  foodType === item ? "bg-green-200 text-white" : "bg-gray-200"
                }`}
              >
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div onClick={handleClick}>
          <Button text={"Start!"} />
        </div>
      </div>
    </>
  );
}
