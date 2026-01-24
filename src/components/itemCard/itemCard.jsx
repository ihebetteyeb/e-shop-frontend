import React from "react";
import { Button } from "primereact/button";
import { motion } from "framer-motion";
// Ensure this local image exists and is a valid image file
import product1 from "../../assets/product_1.jpg"; 

export default function ItemCard() {
  const cards = [
    {
      title: "Summer Collection",
      subtitle: "New Arrivals",
      // Reliable Unsplash Fashion Image 1
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
      gradient: "from-pink-500/80 to-purple-600/80",
      delay: 0,
    },
    {
      title: "Casual Comfort",
      subtitle: "Best Sellers",
      image: product1, 
      gradient: "from-blue-400/80 to-teal-500/80",
      delay: 0.2,
    },
    {
      title: "Elegant Style",
      subtitle: "Trending Now",
      // Reliable Unsplash Fashion Image 2
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop",
      gradient: "from-orange-400/80 to-red-500/80",
      delay: 0.4,
    },
  ];

  return (
    <div className="py-20 px-6 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: card.delay, ease: "easeOut" }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
            >
              {/* Image Background */}
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay Gradient (Hidden by default, shown on hover/always slightly visible) */}
              <div className={`absolute inset-0 bg-gradient-to-t ${card.gradient} opacity-0 group-hover:opacity-90 transition-opacity duration-500 z-10`} />
              
              {/* Dark Gradient for text readability at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-500 z-10" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: card.delay + 0.2 }}
                  className="transform group-hover:translate-y-[-10px] transition-transform duration-500"
                >
                  <span className="inline-block px-4 py-1.5 mb-3 text-xs font-bold tracking-wider text-white uppercase bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                    {card.subtitle}
                  </span>
                  <h3 className="text-3xl font-extrabold text-white mb-4 drop-shadow-lg tracking-tight leading-tight">
                    {card.title}
                  </h3>
                  
                  <div className="overflow-hidden h-0 group-hover:h-14 transition-all duration-500 ease-in-out">
                    <Button 
                      label="Explore Collection" 
                      icon="pi pi-arrow-right" 
                      className="p-button-rounded bg-white text-gray-900 border-none px-6 py-2 font-bold hover:bg-gray-100 transition-colors shadow-lg"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

