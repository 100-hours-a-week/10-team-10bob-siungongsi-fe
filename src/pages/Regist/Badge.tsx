import React from "react";
import { ReactComponent as Close } from "../../assets/close-circle-svgrepo-com.svg";
type Props = {
  name: string;
  index: number;
  onDeleteBadge: (index: number) => void;
};
export const Badge = ({ name, onDeleteBadge, index }: Props) => {
  return (
    <div className="mx-1">
      <div className="flex gap-2 border py-1 px-2 rounded-xl items-center">
        <div>{name}</div>
        <div onClick={() => onDeleteBadge(index)}>
          <Close />
        </div>
      </div>
    </div>
  );
};
