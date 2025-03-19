import React, { useState } from "react";
import { LoginSlider } from "./LoginSlider";

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="flex justify-between items-center p-4 bg-primary text-white font-bold max-h-[55px]">
      <h1 className="text-2xl">Siun</h1>

      {isOpen && (
        <LoginSlider isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};
