import { FC } from "react";

interface LocationTabContentProps {
  setIsOpen: any;
}

const LocationTabContent: FC<LocationTabContentProps> = ({
  setIsOpen,
}: LocationTabContentProps) => {
  return (
    <div className="">
      <button
        className="rounded-sm border border-gray-500 bg-transparent px-4 py-1 text-xs font-semibold text-[#00598d] hover:border-transparent hover:bg-[#00598d] hover:text-white"
        onClick={() => setIsOpen(true)}
      >
        Add Product
      </button>
    </div>
  );
};

export default LocationTabContent;
