import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="mb-12 flex flex-col items-center justify-center text-center mt-32 lg:px-14 md:px-4 px-1">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="w-full px-10">  
          <div className="lg:text-[48px] md:text-[40px] sm:text-[34px] text-[28px] font-semibold text-balance tracking-tight leading-tight pb-10">
            Elevate Your Yoga Practice with AI-Powered Precision
          </div>
          <div className="lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px]">
            Experience the future of at-home yoga with YogaAI. Our
            cutting-edge platform delivers real-time pose analysis,
            personalized feedback, and step-by-step learning to enhance your
            practice and prevent injuries. Seamlessly navigate with
            interactive gesture controls and connect with a vibrant community
            of certified trainers and fellow practitioners. Achieve your
            wellness goals safely and effectively, right from the comfort of
            your home. Discover the power of AI-driven yoga today!
          </div>
        </div>
        <div className="w-full max-w-[40%] mx-auto my-auto lg:pt-0 pt-12">
          <Image
            src="yoga.svg"
            width={1029}
            height={761}
            alt="yoga-hero-image"
          />
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="flex flex-col items-center bg-white">
      <Navbar />
      <HeroSection />
    </div>
  );
}
