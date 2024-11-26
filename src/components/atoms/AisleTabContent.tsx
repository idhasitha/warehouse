import { FC, useState } from "react";

interface AisleTabContentProps {
  addAisle: any;
  isLoading: boolean;
}

const AisleTabContent: FC<AisleTabContentProps> = ({
  addAisle,
  isLoading = true,
}: AisleTabContentProps) => {
  const initialRectangles = {
    x: 100,
    y: 100,
    width: 100,
    height: 50,
    fill: "#f28200",
    textColor: "lightOrange",
    opacity: 0.7,
    text: "Aisle",
  };

  const [aisleLevel, setAisleLevel] = useState(3);
  const [aisle, setAisle] = useState(initialRectangles);

  return (
    <div className="flex w-fit items-center gap-4">
      <input
        className="focus:shadow-outline h-[32px] w-full appearance-none rounded border px-3 leading-tight text-gray-700 shadow focus:outline-none"
        id="username"
        type="text"
        placeholder="Aisle is..."
        onChange={(e) => {
          setAisle({
            ...aisle,
            text: e.target.value,
          });
        }}
      ></input>
      <div className="relative w-fit lg:max-w-sm">
        <select
          onChange={(e: any) => {
            setAisleLevel(e.target.value);
          }}
          className="h-[32px] w-auto appearance-none rounded-md border bg-white px-3 text-xs text-gray-500 shadow-sm outline-none focus:border-indigo-600"
        >
          <option value={3}>Level 3</option>
          <option value={6}>Level 6</option>
          <option value={9}>Level 9</option>
        </select>
      </div>
      <button
        className="rounded-sm border border-gray-500 bg-transparent px-4 py-1 text-xs font-semibold text-[#00598d] hover:border-transparent hover:bg-[#00598d] hover:text-white"
        onClick={() => addAisle(aisle, Number(aisleLevel))}
      >
        {isLoading ? "Processing..." : "ADD"}
        {isLoading && (
          <span className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
          </span>
        )}
      </button>
    </div>
  );
};

export default AisleTabContent;
