import React from "react";
import { motion } from "framer-motion";
import itemsImage from "../../assets/items.png";

const Landing = () => {
  return (
    <>
      <div className="flex flex-wrap justify-center ">
        <motion.div 
          className="flex items-center justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={itemsImage}
            width="616"
            height="617"
            className={"object-cover"}
            alt="Hero Illustration"
            loading="eager"
            placeholder="blur"
          />
        </motion.div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <motion.div 
            className="max-w-2xl mb-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex justify-center ">
              <h1 className="text-4xl font-bold">Join the fashion up move !</h1>
            </div>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-500">
              We offer a wide range of products from clothing to accessories.
            </p>

            <div className="flex justify-center space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <a
                href=""
                className="px-8 py-4 text-lg font-medium text-center text-white bg-blue-400 rounded-md hover:bg-blue-500 transition-colors duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                <div
                  className="pi pi-shopping-cart pr-2 text-white"
                  style={{ fontSize: "1.3rem" }}
                />
                Shop now
              </a>

            </div>
          </motion.div>
        </div>
      </div>
      <div className="py-6 md:py-8 bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {/* Free Shipping */}
            <div className="group flex flex-col gap-2 justify-center items-center bg-gradient-to-br from-slate-700/80 to-slate-800/80 backdrop-blur-sm p-4 md:p-6 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-slate-600/30">
              <div
                className="pi pi-car text-blue-400 group-hover:text-blue-300 transition-colors"
                style={{ fontSize: "1.75rem" }}
              />
              <h3 className="text-sm md:text-base font-semibold text-white text-center">
                Free Shipping
              </h3>
              <p className="text-gray-400 text-xs hidden md:block">Above $5 Only</p>
            </div>

            {/* Certified Products */}
            <div className="group flex flex-col gap-2 justify-center items-center bg-gradient-to-br from-slate-700/80 to-slate-800/80 backdrop-blur-sm p-4 md:p-6 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-slate-600/30">
              <div
                className="pi pi-book text-blue-400 group-hover:text-blue-300 transition-colors"
                style={{ fontSize: "1.75rem" }}
              />
              <h3 className="text-sm md:text-base font-semibold text-white text-center">
                Certified Products
              </h3>
              <p className="text-gray-400 text-xs hidden md:block">100% Guarantee</p>
            </div>

            {/* Huge Savings */}
            <div className="group flex flex-col gap-2 justify-center items-center bg-gradient-to-br from-slate-700/80 to-slate-800/80 backdrop-blur-sm p-4 md:p-6 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-slate-600/30">
              <div
                className="pi pi-money-bill text-blue-400 group-hover:text-blue-300 transition-colors"
                style={{ fontSize: "1.75rem" }}
              />
              <h3 className="text-sm md:text-base font-semibold text-white text-center">
                Huge Savings
              </h3>
              <p className="text-gray-400 text-xs hidden md:block">At Lowest Price</p>
            </div>

            {/* Easy Returns */}
            <div className="group flex flex-col gap-2 justify-center items-center bg-gradient-to-br from-slate-700/80 to-slate-800/80 backdrop-blur-sm p-4 md:p-6 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-slate-600/30">
              <div
                className="pi pi-replay text-blue-400 group-hover:text-blue-300 transition-colors"
                style={{ fontSize: "1.75rem" }}
              />
              <h3 className="text-sm md:text-base font-semibold text-white text-center">
                Easy Returns
              </h3>
              <p className="text-gray-400 text-xs hidden md:block">No Questions Asked</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
