import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useEffect } from "react";
import { useRemoveItemCartMutation } from "../../store/state/userApiSlice";

export default function SideBar({ cardList }) {
  const [removeItem, { isLoading, isSuccess }] = useRemoveItemCartMutation();

  const handleRemoveItem = (code) => {
    removeItem({ userId: 1, itemCode: code });
  };
  return (
    <>
      <div className="flex flex-col gap-[20px] ">
        <div className="flex flex-col flex-grow justify-center w-full gap-[20px] border-b-[1px] pb-5 ">
          {cardList.length > 0 ? (
            cardList.map((item, index) => (
              <div className="flex p-[2px] gap-[5px]" key={index}>
                <img
                  src={`${item.product_image}`}
                  className="w-[64px] h-[64px] rounded"
                  alt={item.product_name}
                />
                <div className="flex flex-col justify-between w-full">
                  <div className="flex justify-between">
                    <p>{item.product_name}</p>
                    <i
                      className="pi pi-times-circle"
                      style={{ borderColor: "#9E9E9E", color: "#9E9E9E" }}
                      onClick={() => handleRemoveItem(item.id)}
                    ></i>
                  </div>
                  <div>
                    <p>1 x £{item.product_price}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No items in the cart</p>
          )}
        </div>
        <div className="flex">
          <Button
            label="Checkout"
            className="w-full "
            disabled={cardList.length == 0}
          />
        </div>
      </div>
    </>
  );
}
