import React, {useState} from "react";

import ProductReview from "../productReview/productReview";

const ProductDesc = () => {
    const Tabs = [
        {
            title: "Description",
            content:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio eius minus quod quos rerum magnam officiis voluptates facilis. Porro nam, unde fugiat possimus atque magnam nobis aliquid officiis commodi voluptas."
        },
        {
            title: "Reviews (0)",
            content: <ProductReview/>
        }
    ];

    const [activeTab, setActiveTab] = useState(0)

  return (
    
    <div className="">
        <nav class="flex items-start justify-start border-t border-gray-300 " aria-label="Tabs">
        {Tabs.map((item,index) => (
            <button 
            class={`py-4 px-6 block focus:outline-none  hover:text-black font-medium
                ${activeTab === index ? 'text-black font-semibold border-t-2 border-lime-500' : 'text-gray-500'}` }
            onClick={() => setActiveTab(index)}
            aria-current="page" 
            key={index}> {item.title} </button>
        ))}
        </nav>

        <div className="mt-4 font-light">
        {Tabs.map((tab, index) => (
        <div key={index} className={activeTab === index ? 'block' : 'hidden'}>
            {tab.content}
        </div>
        ))}
        </div>
    </div>


  );
};

export default ProductDesc;
