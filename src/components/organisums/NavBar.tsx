import Link from "next/link";
import { FC } from "react";

const NavBar: FC = ({}) => {
  return (
    <nav className="mb-1 flex w-full flex-wrap items-center justify-center bg-white px-6 py-2 shadow-sm">
      <div className="flex w-full justify-between">
        <div className="mr-6 flex flex-shrink-0 items-center text-white">
          <Link href={'/'}>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#f28200]">
              Ware <span className="text-[#00598d]">3D</span> Logix
            </h1>
          </Link>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center rounded border border-teal-400 px-3 py-2 text-teal-200 hover:border-white hover:text-white">
            <svg
              className="h-3 w-3 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="block w-full flex-grow lg:flex lg:w-auto lg:items-center">
          <div className="text-sm lg:flex-grow">
            <Link
              href="/product-list"
              className="mr-4 mt-4 block text-gray-500 hover:text-gray-700 lg:mt-0 lg:inline-block"
            >
              Product List
            </Link>
          </div>
          {/* <div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                value=""
                className="peer sr-only"
                onChange={() => {
                  setIs3D(!is3D);
                }}
              />
              <div className="peer h-[19px] w-8 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              <span className="ml-3 text-sm font-medium text-[#00598d] dark:text-gray-300">
                3D
              </span>
            </label>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
