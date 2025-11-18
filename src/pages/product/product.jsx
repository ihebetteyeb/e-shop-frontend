import { useState, useEffect } from "react";
import Header from "../../components/header/header.jsx";
import Footer from "../../components/footer/footer.jsx";
import ProductOverView from "../../components/productOverview/productOverView.jsx";
import ProductDesc from "../../components/productDesc/productDesc.jsx";
import ItemCarousel from "../../components/itemCarousel/itemCarousel.jsx";
import GlobalLayout from "../../components/Layouts/GlobalLayout.jsx";

function Product({ product }) {
  const [prod, setProd] = useState(product);
  useEffect(() => {
    setProd(product);
  }, [product]);

  return (
    <GlobalLayout>
      <div className="my-20 lg:mx-40  sm:mx-10">
        <ProductOverView product={prod} />
        <ProductDesc />
        <ItemCarousel
          title="Related Products"
          indicators={false}
          navigators={true}
        ></ItemCarousel>
      </div>
    </GlobalLayout>
  );
}

export default Product;
