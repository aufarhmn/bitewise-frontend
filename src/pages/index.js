import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Hero from "@/assets/image/hero.png";
import Link from "next/link";
import { useEffect } from "react"; 

export default function Home() {
  useEffect(() => {
    localStorage.removeItem("foodChoices")
    localStorage.removeItem("similarFood")
    localStorage.removeItem("algorithm")
    localStorage.removeItem("restaurantResult")
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-white flex flex-col items-center justify-center h-screen">
        <div className="absolute left-[10%] top-[30%]">
          <Image src={Hero} alt="Food" width={450} height={450} />
        </div>
        <div className="text-center flex flex-col items-center justify-center z-10">
          <p className="text-[50px] font-bold">
            Choose <span className="text-green-400">Wisely,</span> Eat{" "}
            <span className="text-green-400">Delightfully</span>
          </p>
          <p className="mt-2 mb-6 font-['Poppins'] text-[20px] w-1/2">
            BiteWise is a Decision Support System built for calculating the best
            food around. As a user, you just need to provide some basic
            scoring and voila! BiteWise will rank those choices!
          </p>
          <Link href="/choose-method">
            <Button text={"Start!"} />
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
