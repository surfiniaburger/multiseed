"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import MultiSigReadApp from "./multisig";
import InitializeMultiSig from "./initialize";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
      <p className="text-black dark:text-white">
       
      </p>
    </div>
  );
}

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Initialize">
          <div className="flex flex-col space-y-4 text-sm">
           
            <InitializeMultiSig/>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Connect">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
          <w3m-button />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-4 text-sm">
            <MultiSigReadApp/>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
