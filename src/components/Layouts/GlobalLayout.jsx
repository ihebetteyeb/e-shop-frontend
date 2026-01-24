import Header from "../header/header";
import Footer from "../footer/footer";
// import { useCartQuery } from "../../store/state/userApiSlice";
// import { useEffect } from "react";

function GlobalLayout({ children }) {


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="">
        <Header></Header>
      </div>
      <div className="flex flex-col flex-grow justify-center w-full">
        {children}
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}

export default GlobalLayout;
