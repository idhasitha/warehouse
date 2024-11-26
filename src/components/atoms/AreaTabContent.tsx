import { FC, useState } from "react";

interface AreaTabContentProps {
  addRectangle: any;
  isLoading: boolean;
}

const AreaTabContent: FC<AreaTabContentProps> = ({
  addRectangle,
  isLoading,
}: AreaTabContentProps) => {
  const initialRectangles = {
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    fill: "#00598d",
    textColor: "lightOrange",
    opacity: 0.7,
    text: "Area",
  };

  const [area, setArea] = useState<any>(initialRectangles);

  return (
    <div className="flex w-fit gap-3">
      <input
        className="focus:shadow-outline h-[32px] w-full appearance-none rounded border px-3 leading-tight text-gray-700 shadow focus:outline-none"
        id="username"
        type="text"
        placeholder="Area is..."
        onChange={(e) => {
          setArea({
            ...area,
            text: e.target.value,
          });
        }}
      ></input>
      <button
        className="flex gap-2 items-center rounded-sm border border-gray-500 bg-transparent px-4 py-1 text-xs font-semibold text-[#00598d] hover:border-transparent hover:bg-[#00598d] hover:text-white"
        onClick={() => addRectangle(area)}
        disabled={area.text === ""}
      >
        {isLoading ? "Processing..." : "ADD"}
        {isLoading && (
          <span className="relative flex h-3 w-3 justify-center items-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
          </span>
        )}
      </button>
    </div>
  );
};

export default AreaTabContent;
