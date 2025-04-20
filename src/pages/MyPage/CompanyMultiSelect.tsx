import { useState } from "react";

interface Props {
  subscriptions:
    | {
        companyId: number;
        companyName: string;
        companyCode: string;
        stockCode: number;
      }[]
    | undefined;
  selected: number[];
  handleToggle: (company: number) => void;
}

export const CompanyMultiSelect = ({
  subscriptions,
  selected,
  handleToggle,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <h3 className="text-base font-semibold text-gray-900 mb-3">
          구독 목록
        </h3>

        <button
          onClick={() => setOpen(!open)}
          className="w-full border rounded px-3 py-2 text-left bg-white flex items-center justify-between"
        >
          <span className="flex-1 overflow-hidden whitespace-nowrap text-ellipsis pr-2">
            {selected.length > 0
              ? subscriptions
                  ?.filter((sub) => selected.includes(sub.companyId))
                  .map((sub) => sub.companyName)
                  .join(", ")
              : "기업을 선택해주세요"}
          </span>
          <span className="shrink-0">▼</span>
        </button>

        {open && (
          <div className="absolute z-10 max-w-[370px] w-full border rounded bg-white shadow max-h-60 overflow-y-auto">
            {subscriptions?.map((sub, idx) => (
              <label
                key={idx}
                className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="mr-2 accent-purple-500"
                  checked={selected.includes(sub.companyId)}
                  onChange={() => handleToggle(sub.companyId)}
                />
                {sub.companyName}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
