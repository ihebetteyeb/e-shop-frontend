
import { useEffect } from "react";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth.js";

import { Button } from "primereact/button";

import { useTestQuery } from "../../store/state/userApiSlice.jsx";
import ItemCarousel from "../../components/itemCarousel/itemCarousel.jsx";
import InfiniteCarousel from "../../components/infiniteCarousel/infiniteCarousel.jsx";
import ItemCard from "../../components/itemCard/itemCard.jsx";
import Review from "../../components/reviews/reviews.jsx";
import Landing from "../../components/landing/landing.jsx";
import GlobalLayout from "../../components/Layouts/GlobalLayout.jsx";

function HomeLayout() {
  const { token, isLoading } = useAuth();

  useEffect(() => {
    console.log(token);
  }, [token]);

  if (isLoading) {
    return <p> Loading...</p>;
  }
  return (
    <GlobalLayout>
      <Landing></Landing>
      <div className="pt-12">
        <InfiniteCarousel
          title="Best Selling items"
        ></InfiniteCarousel>
      </div>
      <ItemCard></ItemCard>


      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative p-8 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 overflow-hidden"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>
        
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 items-center max-w-6xl mx-auto">
          <div className="flex justify-center items-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center md:text-left leading-tight">
              Get 25% Off On Your First Purchase!
            </h2>
          </div>
          <div className="flex justify-center md:justify-start">
            <Button
              label="Shop now"
              icon="pi pi-shopping-cart"
              iconPos="right"
              className="hover:scale-105 transition-all duration-300 bg-white text-blue-600 border-none h-12 px-8 font-semibold shadow-lg hover:shadow-xl"
            />
          </div>
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative flex justify-center items-center text-2xl font-semibold bg-zinc-100 pt-1 pb-4"
      >
        <h2 className="pt-4 ">Try It For Free. No Registration Needed.</h2>
        <div className="absolute bg-black -top-3 h-6 w-6 rotate-45"></div>
      </motion.div>
      <div className="pt-12">
        <ItemCarousel
          title="Trending products"
          indicators={false}
          navigators={false}
        ></ItemCarousel>
      </div>
      <Review></Review>
    </GlobalLayout>
  );
}

export default HomeLayout;
