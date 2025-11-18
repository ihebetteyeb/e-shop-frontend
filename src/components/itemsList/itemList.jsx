import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { ProductService } from "../../services/ProductService";
import { Card } from "primereact/card";

export default function ItemList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductService.getProductsMini().then((data) => setProducts(data));
  }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const imageBodyTemplate = (product) => {
    return (
      <img
        src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
        alt={product.image}
        className="shadow-lg w-28 rounded-lg"
      />
    );
  };

  const priceBodyTemplate = (product) => {
    return formatCurrency(product.price);
  };

  const ratingBodyTemplate = (product) => {
    return <Rating value={product.rating} readOnly cancel={false} />;
  };

  const statusBodyTemplate = (product) => {
    return (
      <Tag
        value={product.inventoryStatus}
        severity={getSeverity(product)}
      ></Tag>
    );
  };

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };

  const header = (
    <div className="flex items-center justify-center">
      <span className="text-xl font-bold text-900">Recent sales</span>
    </div>
  );

  return (
    <Card className="h-full">
      <div className="card rounded-sm">
        <DataTable value={products} header={header} paginator rows={4}>
          <Column field="name" header="Name"></Column>
          <Column header="Image" body={imageBodyTemplate}></Column>
          <Column
            field="price"
            header="Price"
            body={priceBodyTemplate}
          ></Column>
          <Column field="category" header="Category"></Column>
          <Column
            field="rating"
            header="Reviews"
            body={ratingBodyTemplate}
          ></Column>
          <Column header="Status" body={statusBodyTemplate}></Column>
        </DataTable>
      </div>
    </Card>
  );
}
