import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRemoveItemCartMutation } from "../../store/state/userApiSlice";

import { useNavigate } from "react-router-dom";

export default function SideBar({ cardList }) {
  const navigate = useNavigate();
  const [removeItem, { isLoading, isSuccess }] = useRemoveItemCartMutation();
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id || 1; 

  const handleRemoveItem = (code) => {
    removeItem({ userId: userId, itemCode: code });
  };
  return (
    <>
      <div className="flex flex-col gap-[20px] ">
        <div className="flex flex-col flex-grow justify-center w-full gap-3 border-b border-gray-200 pb-5">
          {cardList.length > 0 ? (
            cardList.map((cartItem, index) => {
              // Backend returns { id, quantity, item: { code, name, price, image, ... } }
              const item = cartItem.item || cartItem;
              return (
                <div className="flex p-2 gap-3 h-20 items-center" key={index}>
                  <img
                    src={item.image}
                    className="w-16 h-16 rounded object-cover flex-shrink-0"
                    alt={item.name}
                  />
                  <div className="flex flex-col justify-center flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <i
                        className="pi pi-times-circle cursor-pointer hover:text-red-500 transition-colors flex-shrink-0"
                        style={{ fontSize: "1.2rem", color: "#9E9E9E" }}
                        onClick={() => handleRemoveItem(item.code)}
                      ></i>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm text-gray-600">{cartItem.quantity || 1} x ${item.price}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No items in the cart</p>
          )}
        </div>
        <div className="flex">
          <Button
            label="Checkout"
            className="w-full "
            disabled={cardList.length == 0}
            onClick={() => navigate("/checkout")}
          />
        </div>
      </div>
    </>
  );
}
