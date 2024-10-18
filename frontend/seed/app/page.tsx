import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Navbar } from "@/components/ui/nav";

export default function BackgroundLinesDemo() {
  return (
    <>
    <Navbar className="top-2" />
  
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 bg-black">  {/* Add bg-black for the background */}
      <h2 className="bg-clip-text text-white text-center text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Multiseed
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-white text-center">  {/* Change text color to white */}
      MultiSig Wallet for Decentralized Fund Management
      </p>
    </BackgroundLines>
    </>
    
  );
}
