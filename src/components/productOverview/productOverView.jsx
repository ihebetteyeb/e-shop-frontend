import { IconArrowLeft } from "@tabler/icons-react";
import React from "react";
import { useLocation } from "react-router-dom";
const ProductOverView = () => {
  const location = useLocation();
  const item = location?.state?.product;

  return (
    <div className="md:flex items-start justify-center content-between my-10">
      <img
        class="object-cover"
        height="550"
        width="550"
        src={`https://primefaces.org/cdn/primereact/images/product/${item.image}`}
        alt="Assorted Coffee"
        loading="eager"
        placeholder="blur"
      />
      <div className="my-1 md:mx-7 ">
        <div className="border-b border-solid border-gray-300 ">
          <div className="tracking-wide text-2xl font-semibold flex justify-between ">
            <p>{item.name}</p>
            <IconArrowLeft onClick={() => window.history.back()} />
          </div>

          <div className="flex justify-start  pt-3 mt-1 font-medium text-black align-text-bottom">
            <h2 className=" text-xl font-bold pr-2">{item.price} dt</h2>
            <p className="font-light">+ Free Shipping</p>
          </div>

          <p className="mt-2 font-light">{item.description}</p>

          <div className="max-w-md flex justify-start mt-5 lg:flex pb-5 ">
            <input
              type="number"
              className="block border-gray-300 placeholder-gray-400 w-20 p-2 mr-5"
              placeholder="1"
            />
            <button className="uppercase flex text-sm font-semibold text-white bg-blue-300 hover:bg-blue-500 rounded-md px-20 py-2 ">
              Add to Cart
            </button>
          </div>
        </div>

        <div className="mt-3 text-sm pb-5">
          <p>
            Category
            <div className="text-blue-300 hover:text-blue-500 hover:underline pl-2">
              {item.category}
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductOverView;
