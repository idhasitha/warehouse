import { FC } from "react";

interface AddProdLocationProps {
  product: any;
  areas: any;
  aisle: any;
  setProdLocationData: any;
  prodLocationData: any;
}

const AddProdLocation: FC<AddProdLocationProps> = ({
  areas,
  aisle,
  setProdLocationData,
  prodLocationData,
}) => {
  const getArrayFromSelectedLevels = () => {
    const level = aisle.find(
      (item: any) => item.id === Number(prodLocationData.aisle)
    )?.levels;

    const array = [];
    for (let i = 1; i <= level; i++) {
      array.push({ id: i, text: i });
    }

    return array;
  };

  const getArrayFromSelectedRackNumber = () => {
    const selectAisle = aisle.find(
      (item: any) => item.id === Number(prodLocationData.aisle)
    );

    const numOfRacks = Math.ceil(selectAisle.width / 50);
    const array = [];
    for (let i = 1; i < numOfRacks; i++) {
      array.push({ id: i, text: i });
    }
    return array;
  };

  return (
    <form className="w-full">
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <label
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            htmlFor="grid-first-name"
          >
            Area
          </label>
          <div className="relative">
            <select
              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="grid-state"
              onChange={(e) => {
                setProdLocationData({
                  ...prodLocationData,
                  area: e.target.value,
                });
              }}
            >
              <option value={""}>Select Area</option>
              {areas.map((area: any) => {
                return (
                  <option key={area.id} value={area.id}>
                    {area.text}
                  </option>
                );
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full px-3 md:w-1/2">
          <label
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            htmlFor="grid-last-name"
          >
            Aisle
          </label>
          <div className="relative">
            <select
              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="grid-state"
              onChange={(e) => {
                setProdLocationData({
                  ...prodLocationData,
                  aisle: e.target.value,
                });
              }}
            >
              <option value={""}>Select Aisle</option>
              {aisle.map((item: any) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.text}
                  </option>
                );
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <label
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            htmlFor="grid-first-name"
          >
            Levels
          </label>
          <div className="relative">
            <select
              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="grid-state"
              onChange={(e) => {
                setProdLocationData({
                  ...prodLocationData,
                  level: e.target.value,
                });
              }}
            >
              <option value={""}>Select Level</option>
              {getArrayFromSelectedLevels()?.map((area: any) => {
                return (
                  <option key={area.id} value={area.id}>
                    {area.text}
                  </option>
                );
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full px-3 md:w-1/2">
          <label
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            htmlFor="grid-last-name"
          >
            Rack No:
          </label>
          <div className="relative">
            <select
              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="grid-state"
              onChange={(e) => {
                setProdLocationData({
                  ...prodLocationData,
                  rackNo: e.target.value,
                });
              }}
            >
              <option value={""}>Select Rack Number</option>
              {prodLocationData.aisle &&
                getArrayFromSelectedRackNumber()?.map((item: any) => {
                  return (
                    <option key={item.id} value={item.text}>
                      {item.text}
                    </option>
                  );
                })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full px-3 md:w-1/2">
          <label
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            htmlFor="grid-last-name"
          >
            Bin
          </label>
          <div className="relative">
            <select
              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="grid-state"
              onChange={(e) => {
                setProdLocationData({
                  ...prodLocationData,
                  bin: e.target.value,
                });
              }}
            >
              <option value={""}>Select Bin</option>
              {["FL", "FR", "BL", "BR"].map((item: any, idx: number) => {
                return (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="w-full px-3">
          <label
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            htmlFor="grid-password"
          >
            Note
          </label>
          <input
            className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
            id="grid-last-name"
            type="text"
            placeholder="Doe..."
            onChange={(e) => {
              setProdLocationData({
                ...prodLocationData,
                note: e.target.value,
              });
            }}
          />
        </div>
      </div>
      <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-red-700">
        Location already filed...
      </span>
    </form>
  );
};

export default AddProdLocation;
