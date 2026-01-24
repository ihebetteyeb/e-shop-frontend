import { IconArrowLeft } from "@tabler/icons-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useItemCartMutation } from "../../store/state/userApiSlice.jsx";

const ProductOverView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location?.state?.product;
  const [quantity, setQuantity] = useState(1);
  const [addItemCart, { isLoading, isError, isSuccess }] = useItemCartMutation();
  
  // Get user from Redux state
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;

  const handleAddToCart = async () => {
    if (!item) return;
    
    if (!userId) {
      alert("Please log in to add items to cart");
      navigate("/signin");
      return;
    }
    
    try {
      // Backend expects { code: string, quantity: number }
      const cartPayload = {
        code: item.code || item.id?.toString() || '', // Use code if available, fallback to id
        quantity: quantity
      };
      
      await addItemCart({ body: cartPayload, userId: userId }).unwrap();
      alert(`Added ${quantity} ${item.name}(s) to cart!`);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600 mb-4">No product selected</p>
        <button 
          onClick={() => navigate("/groceries")}
          className="px-6 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="md:flex items-start justify-center content-between my-10">
      <div className="w-full max-w-lg overflow-hidden rounded-xl">
        <img
          className="object-cover w-full h-full"
          src={item?.image}
          alt={item?.name || "Product"}
          loading="eager"
          placeholder="blur"
        />
      </div>
      <div className="my-1 md:mx-7 ">
        <div className="border-b border-solid border-gray-300 ">
          <div className="tracking-wide text-2xl font-semibold flex justify-between ">
            <p>{item.name}</p>
            <IconArrowLeft onClick={() => window.history.back()} className="cursor-pointer hover:text-blue-500" />
          </div>

          <div className="flex justify-start  pt-3 mt-1 font-medium text-black align-text-bottom">
            <h2 className=" text-xl font-bold pr-2">${item.price}</h2>
            <p className="font-light">+ Free Shipping</p>
          </div>

          <p className="mt-2 font-light">{item.description}</p>

          <div className="max-w-md flex justify-start mt-5 lg:flex pb-5 ">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="block border-2 border-gray-300 placeholder-gray-400 w-20 p-2 mr-5 rounded-md focus:border-blue-400 focus:outline-none"
            />
            <button 
              onClick={handleAddToCart}
              disabled={isLoading || item.inventoryStatus === "OUTOFSTOCK"}
              className="uppercase flex text-sm font-semibold text-white bg-blue-400 hover:bg-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-md px-20 py-2 transition-colors duration-300"
            >
              {isLoading ? "Adding..." : "Add to Cart"}
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
