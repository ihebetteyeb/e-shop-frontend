// import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth.js";
// import { useForm } from "react-hook-form";
import { Button } from "primereact/button";

import { useTestQuery } from "../../store/state/userApiSlice.jsx";
import ItemCarousel from "../../components/itemCarousel/itemCarousel.jsx";
import ItemCard from "../../components/itemCard/itemCard.jsx";
// import { Button } from "primereact/button";
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
      <div className="pt-24">
        <ItemCarousel
          title="Best Selling items"
          indicators={false}
          navigators={true}
        ></ItemCarousel>
      </div>
      <div className="pt-24">
        <div className="relative flex justify-center bg-zinc-50">
          <div className="flex justify-center absolute -top-36">
            <img src="src/assets/basil-leaf.png" />
          </div>
          <div className="pt-10">
            <ItemCard> </ItemCard>
          </div>
        </div>
      </div>

      <div className="p-8 bg-black">
        <div className="grid grid-cols-2 gap-2 text-white">
          <div className="col-span-1 text-3xl font-bold text-right h-15">
            <p>Get 25% Off On Your First Purchase!</p>
          </div>
          <div className="flex col-span-1 justify-center">
            <Button
              label="Shop now"
              icon="pi pi-shopping-cart"
              iconPos="right"
            />
          </div>
        </div>
      </div>
      <div className="relative flex justify-center items-center text-2xl font-semibold bg-zinc-100 pt-2 pb-8">
        <h2 className="pt-4 ">Try It For Free. No Registration Needed.</h2>
        <div className="absolute bg-black -top-3 h-6 w-6 rotate-45"></div>
      </div>
      <div className="pt-24">
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
