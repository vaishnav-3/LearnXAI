import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="relative bg-white flex min-h-screen w-full items-center justify-center overflow-hidden">

      <div className="flex z-50 flex-col items-center">
        <div className="flex items-center gap-2 mb-6">
          <Image
            src="/logo.svg"
            alt="LearnX-AI Logo"
            width={50}
            height={50}
            className="object-contain"
          />
          <h1 className="text-3xl z-50 font-bold text-black">LearnX-AI</h1>
        </div>
        <SignIn />
      </div>
    </div>
  );
}
