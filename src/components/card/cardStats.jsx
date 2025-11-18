import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
export default function CardStats({ title, logo }) {
  return (
    <Card className="h-32 flex flex-col justify-center">
      <div className="w-full">
        <div className="flex justify-between items-center w-full">
          <span className="text-base font-bold">{title}</span>
          <Button
            icon={`pi pi-${logo}`}
            rounded
            raised
            style={{
              color: "#0000FF",
              backgroundColor: "#5db4ce",
              borderColor: "#5db4ce",
            }}
          />
        </div>
        <p className="pb-1">152</p>
        <p>
          <span className=" text-green-500 text-sm">24</span> new since last
          visit
        </p>
      </div>
    </Card>
  );
}
