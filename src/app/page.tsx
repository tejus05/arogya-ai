import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function HomePage() {
  return (
    <div>
      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        {/* <Navbar/> */}
        <div className="flex flex-col lg:flex-row">
          <div className="w-full max-w-[70%]">
            <div className="text-[48px] font-semibold text-balance tracking-tight leading-tight">
              Elevate Your Yoga Practice with AI-Powered Precision
            </div>
            <div>
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
          <div className="w-full max-w-[50%]">
            <Image
              src="yoga.svg"
              width={1029}
              height={761}
              alt="yoga-hero-image"
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
