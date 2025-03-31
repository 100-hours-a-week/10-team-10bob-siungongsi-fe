import React from "react";
import { useNavigate } from "react-router-dom";
import search from "../assets/search.png";
import home from "../assets/home.png";
import setting from "../assets/setting.png";

export const BottomNavigation = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-20 z-30">
      <div className="fixed bottom-0 left-0 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <div className="flex justify-between h-full max-w-xs grid-cols-4 mx-auto font-medium">
          <button
            onClick={() => navigate("/")}
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <img className="w-[30px]" src={home} alt="" />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"></span>
          </button>
          <button
            onClick={() => navigate("/search")}
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <img className="w-[30px]" src={search} alt="" />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"></span>
          </button>

          <button
            onClick={() => navigate("/setting")}
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <img className="w-[30px]" src={setting} alt="" />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"></span>
          </button>
        </div>
      </div>
    </div>
  );
};
