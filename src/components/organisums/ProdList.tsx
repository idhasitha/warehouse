import Image from "next/image";
import { FC, useEffect, useState } from "react";

interface ProdListProps {
  setSelectedProd?: any;
  setShowModal?: any;
}

const ProdList: FC<ProdListProps> = ({ setSelectedProd, setShowModal }) => {
  const [productList, setProductList] = useState<any>([]);
  const [productLoading, setProductLoading] = useState<boolean>(false);

  /** get product category */
  useEffect(() => {
    const url = "https://dummyjson.com/products?limit=10&skip=10";
    const fetchData = async () => {
      try {
        setProductLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setProductList(json);
        setProductLoading(false);
      } catch (error) {
        setProductLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center gap-[20px] p-[20px]">
      {productList?.products?.map((product: any, idx: any) => {
        return (
          <div className="w-full lg:flex" key={idx}>
            <div
              className="h-48 flex-none overflow-hidden rounded-t bg-cover text-center lg:h-auto lg:w-48 lg:rounded-l lg:rounded-t-none"
              style={{
                backgroundImage: `url('${product?.thumbnail}')`,
              }}
              title={product?.title}
            ></div>
            <div className="border-grey-light lg:border-grey-light flex flex-col justify-between rounded-b border-b border-l border-r bg-white p-4 leading-normal lg:rounded-b-none lg:rounded-r lg:border-l-0 lg:border-t">
              <div className="mb-8">
                <p className="text-grey-dark flex items-center text-sm">
                  <svg
                    className="text-grey mr-2 h-3 w-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                  </svg>
                  Members only
                </p>
                <div className="mb-2 text-xl font-bold text-black">
                  {product.title}
                </div>
                <p className="text-grey-darker line-clamp-2 text-base">
                  {product.description}
                </p>
              </div>
              <div className="flex items-center justify-between">
                {/* <Image
              className="mr-4 h-10 w-10 rounded-full"
              src="https://pbs.twimg.com/profile_images/885868801232961537/b1F6H4KC_400x400.jpg"
              alt="Avatar of Jonathan Reinink"
            /> */}
                <div className="text-sm">
                  <p className="leading-none text-black">{product.category}</p>
                  <p className="text-grey-dark">Aug 18</p>
                </div>
                <button
                  className="rounded-sm border border-gray-500 bg-transparent px-4 py-1 text-xs font-semibold text-[#00598d] hover:border-transparent hover:bg-[#00598d] hover:text-white"
                  onClick={() => {
                    setShowModal(true);
                    setSelectedProd(product);
                  }}
                >
                  ADD TO LOCATION
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProdList;
