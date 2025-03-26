import React, { useEffect, useState } from "react";
import { ReactComponent as Swap } from "../../assets/swap-alt-svgrepo-com.svg";
import { useSearchParams } from "react-router-dom";

interface PostFilterProps {
  filter: string;
  onChangeFilter: (condition: string) => void;
}

export const PostFilter = ({ filter, onChangeFilter }: PostFilterProps) => {
  // const [searchParams, setSearchParams] = useSearchParams();

  // const initalFilter = searchParams.get('sort') || 'latest';
  // const [filterlingConditions, setFilterlingConditions] =
  //   useState<string>(initalFilter);
  // const [isOpen, setIsOpen] = useState<boolean>(false);

  // useEffect(() => {
  //   // 🔹 URL 쿼리 파라미터로 현재 페이지 반영
  //   setSearchParams({ sort: filterlingConditions });
  // }, [filterlingConditions]);

  return (
    //   <div>
    //     <div
    //       className="flex gap-1 text-sm text-gray-400 cursor-pointer"
    //       onClick={() => setIsOpen(!isOpen)}
    //     >
    //       <Swap />
    //       <div>{filterlingConditions}</div>
    //     </div>
    //     {isOpen && (
    //       <div className="flex absolute flex-col rounded-lg gap-2 border text-sm text-gray-400 p-2 shadow-md bg-white z-[1000]">
    //         {filterMenu.map((menu) => (
    //           <div
    //             className="cursor-pointer"
    //             onClick={() => selectFilterCondition(menu.label, menu.name)}
    //           >
    //             {menu.label}
    //           </div>
    //         ))}
    //       </div>
    //     )}
    //   </div>
    // );
    <select
      className="border-none"
      value={filter}
      onChange={(e) => onChangeFilter(e.target.value)}
    >
      <option value="latest">최신순</option>
      <option value="views">조회순</option>
      <option value="oldest">오래된순</option>
    </select>
  );
};
