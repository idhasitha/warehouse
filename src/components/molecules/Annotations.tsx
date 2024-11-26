import { Html } from "@react-three/drei";
import { FC } from "react";

interface AnnotationsProps {
  controls: any;
  position: any;
  productLocation?: any;
  product?: any | undefined;
  setSelectedLocationId?: any;
  setSelectedLocation?: any;
}

const Annotations: FC<AnnotationsProps> = ({
  controls,
  position,
  productLocation,
  product,
  setSelectedLocationId,
  setSelectedLocation,
  ...rest
}) => {
  return (
    <Html {...rest} position={position}>
      <div
        className="min-w-screen animated fadeIn faster fixed  inset-0  -top-[500px] left-[200px] z-50 flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat outline-none focus:outline-none"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1604262725913-1c415cd27564?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2142&q=80);",
        }}
        id="modal-id"
      >
        <div className="absolute inset-0 z-0 bg-black opacity-60"></div>
        <div className="relative flex flex-col items-center justify-center ">
          <div className="container">
            <div className="w-full max-w-[300px] rounded-xl bg-gray-900 p-3 shadow-lg">
              <div className="flex flex-col ">
                <div className="">
                  <div className="h-62 relative mb-3 w-full">
                    <div className="absolute right-0 top-0 flex flex-col p-3">
                      <button
                        onClick={() => {
                          setSelectedLocationId(null);
                          setSelectedLocation(null);
                        }}
                        className="flex h-8 w-8 justify-center items-center rounded-full bg-gray-800  p-1 text-center text-gray-500 shadow transition duration-300 ease-in hover:text-purple-500 hover:shadow-md"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="20"
                          height="20"
                          viewBox="0 0 30 30"
                          fill="#ffffff"
                        >
                          <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                        </svg>
                      </button>
                    </div>
                    <img
                      src={product?.thumbnail}
                      alt="Just a flower"
                      className=" w-full rounded-2xl  object-fill"
                    />
                  </div>
                  <div className="flex-auto justify-evenly">
                    <div className="flex flex-wrap ">
                      <div className="flex w-full flex-none items-center text-sm text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-1 h-4 w-4 text-red-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="mr-3 whitespace-nowrap text-gray-400">
                          {productLocation.location}
                        </span>
                        <span className="mr-2 text-gray-400">
                          {product?.brand}
                        </span>
                      </div>
                      <div className="flex w-full min-w-0 items-center justify-between ">
                        <h2 className="mr-auto cursor-pointer truncate text-lg text-gray-200 hover:text-purple-500 ">
                          {product?.title}
                        </h2>
                        <div className="ml-3 flex items-center rounded-lg bg-green-400 px-2 py-1 text-xs text-white">
                          INSTOCK
                        </div>
                      </div>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-xl font-semibold text-white">
                      ${product?.price}.00
                      {product?.movingStatus && (
                        <span
                          className={`items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            product?.movingStatus === "MEDIUM"
                              ? "bg-yellow-100 text-yellow-800"
                              : product?.movingStatus === "FAST"
                              ? "bg-green-100 text-green-800"
                              : product?.movingStatus === "SLOW"
                              ? "bg-red-100 text-red-800"
                              : "bg-slate-300 text-slate-800"
                          }`}
                        >
                          {product?.movingStatus}
                        </span>
                      )}
                    </div>
                    <div className="py-4  text-sm  text-gray-600 lg:flex">
                      <div className="mb-3 inline-flex flex-1  items-center">
                        <div className="flex w-full flex-none items-center text-sm text-gray-600">
                          <ul className="flex flex-row items-center justify-center space-x-2">
                            <li className="">
                              <span className="block rounded-full border-2 border-gray-900 p-1 transition duration-300 ease-in hover:border-blue-600">
                                <a
                                  href="#blue"
                                  className="block h-3 w-3 rounded-full bg-blue-600"
                                ></a>
                              </span>
                            </li>
                            <li className="">
                              <span className="block rounded-full border-2 border-gray-900 p-1 transition duration-300 ease-in hover:border-yellow-400">
                                <a
                                  href="#yellow"
                                  className="block h-3 w-3  rounded-full bg-yellow-400"
                                ></a>
                              </span>
                            </li>
                            <li className="">
                              <span className="block rounded-full border-2 border-gray-900 p-1 transition duration-300 ease-in hover:border-red-500">
                                <a
                                  href="#red"
                                  className="block h-3 w-3  rounded-full bg-red-500"
                                ></a>
                              </span>
                            </li>
                            <li className="">
                              <span className="block rounded-full border-2 border-gray-900 p-1 transition duration-300 ease-in hover:border-green-500">
                                <a
                                  href="#green"
                                  className="block h-3 w-3  rounded-full bg-green-500"
                                ></a>
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="mb-3 inline-flex flex-1 items-center">
                        <span className="text-secondary mr-3 whitespace-nowrap">
                          Size
                        </span>
                        <div className="cursor-pointer text-gray-400 ">
                          <span className="p-1 py-0 hover:text-purple-500">
                            S
                          </span>
                          <span className="p-1 py-0 hover:text-purple-500">
                            M
                          </span>
                          <span className="p-1 py-0 hover:text-purple-500">
                            L
                          </span>
                          <span className="p-1 py-0 hover:text-purple-500">
                            XL
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-start space-x-2 text-sm font-medium">
                      <button className="mb-2 inline-flex items-center rounded-full bg-purple-500 px-5 py-2 text-sm font-medium tracking-wider text-white transition duration-300 ease-in hover:bg-purple-600 hover:shadow-lg md:mb-0 ">
                        <span>Add Cart</span>
                      </button>
                      <button className="h-9 w-9 rounded-full border border-gray-700 bg-gray-700 p-2 text-center text-gray-400  transition duration-300 ease-in hover:border-gray-500 hover:bg-gray-800 hover:text-white hover:shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className=""
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Html>
  );
};

export default Annotations;
