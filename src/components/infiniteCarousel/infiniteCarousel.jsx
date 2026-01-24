import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Tag } from "primereact/tag";
import { useItemsQuery } from "../../store/state/itemApiSlice.jsx";
import { Rating } from "primereact/rating";

export default function InfiniteCarousel({ title }) {
  const { data: products = [], isLoading } = useItemsQuery();
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimationControls();
  const navigate = useNavigate();

  // Duplicate products for seamless infinite scroll
  const duplicatedProducts = [...products, ...products, ...products];

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

  useEffect(() => {
    if (!isPaused && duplicatedProducts.length > 0) {
      controls.start({
        x: [0, -100 * (products.length)],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: products.length * 3, // 3 seconds per item
            ease: "linear",
          },
        },
      });
    } else {
      controls.stop();
    }
  }, [isPaused, products.length, controls]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex flex-col text-center p-8 pt-16 pb-4 overflow-hidden"
    >
      <h1 className="text-3xl font-bold pb-10">{title}</h1>
      
      <div className="relative w-full overflow-hidden min-h-[450px] flex items-center">
        <motion.div
          className="flex gap-6"
          animate={controls}
          style={{ width: "max-content" }}
        >
          {duplicatedProducts.map((product, index) => (
            <motion.div
              key={`${product.id}-${index}`}
              className="flex-shrink-0 w-72"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className="bg-white rounded-xl shadow-lg p-4 h-full hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                onClick={() => navigate("/product", { state: { product } })}
              >
                <div className="flex justify-center mb-4">
                  <img
                    src={`${product.image}`}
                    alt={product.name}
                    className="shadow-md rounded-lg h-64 w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h4 className="p-1 font-semibold text-lg">{product.name}</h4>
                  <h6 className="p-1 text-xl font-bold text-blue-600">${product.price}</h6>
                  <Rating value={4} readOnly cancel={false} className="pb-2" />
                  <div>
                    <Tag
                      value={product.inventoryStatus}
                      severity={getSeverity(product)}
                    ></Tag>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
