import React, { useState } from "react";
import { ReactComponent as Swap } from "../assets/swap-alt-svgrepo-com.svg";

export const PostFilter = () => {
  const filterMenu: string[] = ["최신순", "조회순", "오래된순"];
  const [filterlingConditions, setFilterlingConditions] =
    useState<string>("최신순");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectFilterCondition = (value: string) => {
    setFilterlingConditions(value);
    setIsOpen(false);
  };

  return (
    <div>
      <div
        className="flex gap-1 text-sm text-gray-400 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Swap />
        <div>{filterlingConditions}</div>
      </div>
      {isOpen && (
        <div className="flex absolute flex-col rounded-lg gap-2 border text-sm text-gray-400 p-2 shadow-md bg-white z-[1000]">
          {filterMenu.map((menu) => (
            <div
              className="cursor-pointer"
              onClick={() => selectFilterCondition(menu)}
            >
              {menu}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
