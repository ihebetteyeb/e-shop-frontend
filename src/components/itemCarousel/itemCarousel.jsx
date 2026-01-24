import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { Tag } from "primereact/tag";
import { useItemsQuery } from "../../store/state/itemApiSlice.jsx";
import { Rating } from "primereact/rating";
import "./itemCarousel.css";

export default function ItemCarousel({ title, indicators, navigators }) {
  const { data: products = [], isLoading } = useItemsQuery();

  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

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


  const productTemplate = (product) => {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 text-center py-5 px-3"
      >
        <div className="flex col-span-2 justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="shadow-md rounded-lg h-64 w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center items-center col-span-2">
          <h4 className="p-1">{product.name}</h4>
          <h6 className="p-1">${product.price}</h6>
          <Rating value={4} readOnly cancel={false} className="pb-2" />
          <div>
            <Tag
              value={product.inventoryStatus}
              severity={getSeverity(product)}
            ></Tag>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex flex-col text-center p-8"
    >
      <h1 className="text-3xl font-bold  pb-10">{title}</h1>
      <Carousel
        value={products}
        numVisible={5}
        numScroll={3}
        responsiveOptions={responsiveOptions}
        itemTemplate={productTemplate}
        showIndicators={indicators}
        showNavigators={navigators}
      />
    </motion.div>
  );
}
