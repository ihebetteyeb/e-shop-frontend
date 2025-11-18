import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./itemCard.css";
export default function ItemCard() {
  const footer = (
    <>
      <div
        className="bg-contain bg-no-repeat bg-right h-40 w-full flex  items-start"
        style={{
          backgroundImage:
            "url('https://d2bzx2vuetkzse.cloudfront.net/fit-in/0x450/outfits/f7c0634a-3421-43e6-acdf-eaae0a15c049.jpeg')",
        }}
      ></div>
    </>
  );
  const footer1 = (
    <>
      <div
        className="bg-contain bg-no-repeat bg-right h-40 w-full flex  items-start"
        style={{
          backgroundImage:
            "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8kG8kBViE4QIvg1aVZtyEKdsEXhySJV2RjDB3t8PhiQ&s')",
        }}
      >
        <div>
          <Button label="Shop now" icon="pi pi-arrow-right" iconPos="right" />
        </div>
      </div>
    </>
  );
  const footer2 = (
    <>
      <div
        className="bg-contain bg-no-repeat bg-right h-40 w-full flex  items-start"
        style={{
          backgroundImage:
            "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ54G9Rhe_KZgMFw5yjKa1G4oqcRjZBETV7FGSs6IoF5Q&s')",
        }}
      ></div>
    </>
  );

  return (
    <div className="flex justify-center items-center p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center w-full max-w-6xl">
        <Card title="Farm Fresh Fruits" footer={footer}>
          <p>Various Items</p>
        </Card>
        <Card title="Farm Fresh Fruits" footer={footer1}>
          <p>Don't miss your chance !</p>
        </Card>

        <Card title="Farm Fresh Fruits" footer={footer2}>
          <p>Good quality with the cheapest price</p>
        </Card>
      </div>
    </div>
  );
}
