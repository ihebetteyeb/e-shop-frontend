
import React, { useState } from "react";
import { MdStarBorder, MdStar } from "react-icons/md";

const ProductReview = () => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (index) => {
    setRating(index + 1);
    console.log(rating);
  };

  return (
    <div className="">
      <p className=""> There are no reviews yet. </p>
      <form className="border border-gray-300 my-10 p-7">
        <div className="space-y-12">
          <div className="pb-12">
            <h2 className="text-base font-normal leading-7 text-gray-900">
              Be the first to review “Assorted Coffee”
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Your email address will not be published. Required fields are
              marked *
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6  font-light">
              <div className="col-span-full flex">
                <label
                  htmlFor="review"
                  className="block text-sm leading-6 text-gray-900 mr-5"
                >
                  Your rating *
                </label>
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      onClick={() => handleStarClick(index)}
                      onMouseEnter={() => setRating(index + 1)}
                      //onMouseLeave={() => setRating(0)}
                    >
                      {index < rating ? <MdStar /> : <MdStarBorder />}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6  font-light">
              <div className="col-span-full">
                <label
                  htmlFor="review"
                  className="block text-sm leading-6 text-gray-900"
                >
                  Your review *
                </label>
                <div className="mt-2">
                  <textarea
                    id="review"
                    name="review"
                    rows={3}
                    className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm leading-6 text-gray-900"
                >
                  Name *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="given-name"
                    className="block w-full  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm leading-6 text-gray-900"
                >
                  Email *
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <div className="mt-2 flex justify-start">
                  <input
                    type="checkbox"
                    name="save"
                    id="save"
                    className="form-checkbox mr-3 h-5 w-5 block border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                  />
                  <p className="block text-sm leading-6 text-gray-900">
                    {" "}
                    Save my name, email, and website in this browser for the
                    next time I comment.{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-start gap-x-6">
              <button
                type="submit"
                className="uppercase rounded-md bg-lime-700 px-5 py-2 font-normal text-white shadow-sm hover:bg-lime-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductReview;
