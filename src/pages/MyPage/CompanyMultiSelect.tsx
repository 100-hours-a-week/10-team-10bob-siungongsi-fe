import { useState } from "react";
import Select, { SingleValue } from "react-select";

interface Props {
  subscriptions:
    | {
        companyId: number;
        companyName: string;
        companyCode: string;
        stockCode: number;
      }[]
    | undefined;
  selected: number | undefined;
  handleToggle: (company: number | undefined) => void;
}

export const CompanyMultiSelect = ({
  subscriptions,
  selected,
  handleToggle,
}: Props) => {
  const [open, setOpen] = useState(false);
  const options = subscriptions?.map((sub) => ({
    value: sub.companyId,
    label: sub.companyName,
  }));

  return (
    <div className="w-full">
      <Select
        options={options}
        onChange={(e) => handleToggle(e?.value)}
        placeholder="구독한 기업 목록"
      />
    </div>
  );
};
