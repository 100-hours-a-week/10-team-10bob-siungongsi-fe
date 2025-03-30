import React from "react";
import { ReactComponent as Close } from "../../assets/close-circle-svgrepo-com.svg";
type Props = {
  name: string;
  id: number;
  onDeleteBadge: (index: number) => void;
};
export const Badge = ({ name, onDeleteBadge, id }: Props) => {
  return (
    <div className="">
      <div className="flex gap-1 border border-primary py-1 px-3 rounded-xl items-center">
        <div>{name}</div>
        <div className="cursor-pointer" onClick={() => onDeleteBadge(id)}>
          <Close />
        </div>
      </div>
    </div>
  );
};
