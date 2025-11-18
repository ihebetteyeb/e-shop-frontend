import React from "react";
import { Card } from "primereact/card";
import { ProgressBar } from "primereact/progressbar";
export const ItemStats = () => {
  const products = [
    { name: "Product 1", category: "category 1", sales: 150 },
    { name: "Product 2", category: "category 2", sales: 100 },
    { name: "Product 3", category: "category 3", sales: 200 },
  ];
  const totalSales = products.reduce((acc, product) => acc + product.sales, 0);

  function Product({ product }) {
    return (
      <div className="col-span-2 grid grid-cols-2 p-2">
        <div className="flex-row col-span-1">
          <p className="text-sm font-base">{product.name}</p>
          <span className="text-xs font-medium">{product.category}</span>
        </div>
        <div className="flex col-span-1 justify-end items-center">
          <ProgressBar
            value={(product.sales / totalSales) * 100}
            style={{ height: "10px", width: "200px" }}
            showValue={false}
          ></ProgressBar>
          <span className="pl-2 text-base font-base">
            {Math.round((product.sales / totalSales) * 100)}%
          </span>
        </div>
      </div>
    );
  }
  return (
    <Card>
      <div className="grid grid-cols-2">
        <div className="col-span-2 font-bold text-xl pb-5">
          <p className="pb-4 font-bold">Best selling products</p>
          {products.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </div>
      </div>
    </Card>
  );
};
