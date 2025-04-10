import React from "react";
import { ReactComponent as Close } from "../../assets/close-circle-svgrepo-com.svg";

type Props = {
  name: string;
  id: number;
  onDeleteBadge: (index: number) => void;
};

export const Badge = ({ name, onDeleteBadge, id }: Props) => {
  return (
    <div className="inline-flex items-center bg-gray-100 px-3 py-1.5 rounded-full text-sm font-medium text-gray-800 transition-all">
      <span className="mr-1.5">{name}</span>
      <button
        onClick={() => onDeleteBadge(id)}
        className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 transition-colors"
        aria-label={`${name} 삭제`}
      >
        <svg
          className="w-3 h-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};
