"use client";

import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <header className="flex item-center justify-center gap-5 p-4 bg-gradient-to-r from-yellow-900 to-yellow-700 shadow-lg">
      <h3 
        onClick={() => router.push("/")} 
        className="cursor-pointer text-yellow-100 hover:text-white transition-colors font-serif"
      >
        Home
      </h3>
      <h3 
        onClick={() => router.push("/about")} 
        className="cursor-pointer text-yellow-100 hover:text-white transition-colors font-serif"
      >
        Registry
      </h3>
      <div 
        onClick={() => router.back()} 
        className="cursor-pointer text-yellow-100 hover:text-white transition-colors font-serif"
      >
        Back
      </div>
    </header>
  );
};

export default Header;
