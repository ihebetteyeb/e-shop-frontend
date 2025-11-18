import React from "react";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";

export const CardNotification = () => {
  const purchases = [
    {
      user: "John Doe",
      item: "Laptop",
      price: 999,
      quantity: 1,
      icon: "pi pi-user",
    },
    {
      user: "Jane Smith",
      item: "Smartphone",
      price: 699,
      quantity: 2,
      icon: "pi pi-user",
    },
    {
      user: "Alice Johnson",
      item: "Headphones",
      price: 299,
      quantity: 1,
      icon: "pi pi-user",
    },
  ];

  // Render each purchase as a row in the notification card
  function Purchase({ purchase }) {
    return (
      <div className="grid grid-cols-12 items-center gap-2 p-2">
        <div className="col-span-1">
          <Avatar
            icon={purchase.icon}
            className="p-avatar-circle"
            shape="circle"
          />
        </div>
        <div className="col-span-3">
          <p className="text-sm font-medium">{purchase.user}</p>
        </div>
        <div className="col-span-4">
          <p className="text-sm">{purchase.item}</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm">${purchase.price}</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm">Qty: {purchase.quantity}</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="h-full">
      <div className="grid grid-cols-1 h-full">
        <div className="col-span-1 font-bold text-xl pb-5">
          <p className="pb-4 font-bold">Recent Purchases</p>
          {purchases.map((purchase, index) => (
            <Purchase key={index} purchase={purchase} />
          ))}
        </div>
      </div>
    </Card>
  );
};
