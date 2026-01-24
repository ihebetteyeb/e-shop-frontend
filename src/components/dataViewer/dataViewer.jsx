import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { classNames } from "primereact/utils";
import "./dataViewer.css";
import { Slider } from "primereact/slider";
import { useItemsQuery } from "../../store/state/itemApiSlice.jsx";
import { useItemCartMutation } from "../../store/state/userApiSlice.jsx";

export default function DataViewer() {
  const [products, setProducts] = useState([]);
  const [layout, setLayout] = useState("grid");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [sortField, setSortField] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [filteredItems, setFilteredItems] = useState(products);
  const navigate = useNavigate();
  //search for max price and set it as the max value for the slider
  const [value, setValue] = useState([0, 200]);
  const { data, isLoading: isLoading2 } = useItemsQuery();
  const [addItemCart, { isError, isSuccess, isLoading }] =
    useItemCartMutation();
  
  // Get user from Redux state
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;

  const sortOptions = [
    { label: "Price High to Low", value: "!price" },
    { label: "Price Low to High", value: "price" },
  ];
  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    const items = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredItems(items);
  };

  const handlePriceFilterChange = (values) => {
    setValue(values);
    let inf = values[0];
    let sup = values[1];
    const items = filteredItems.filter(
      (filteredItems) =>
        filteredItems.price >= inf && filteredItems.price <= sup
    );
    setFilteredItems(items);
  };

  useEffect(() => {
    console.log(data);
    setProducts(data?.slice(0, 12));
    setFilteredItems(data);
  }, [data]);

  const handleCartClick = (product) => {
    console.log(product);

    if (!userId) {
      alert("Please log in to add items to cart");
      navigate("/signin");
      return;
    }

    addItemCart({ body: product, userId: userId })
      .unwrap()
      .then((payload) => {
        console.log(payload);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
  const onSortChange = (event) => {
    const value = event.value;
    console.log(value);

    if (value.indexOf("!") === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    } else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  };

  const listItem = (product, index) => {
    return (
      <div
        className="lg:col-span-4 md:col-span-3 sm:col-span-2 xs:col-span-1 "
        key={product.id}
      >
        <div
          className={classNames(
            "flex flex-row xl:flex-row xl:items-start p-4 gap-4",
            { "border-t-2": index !== 0 }
          )}
        >
          <div className="w-24 lg:w-40 h-24 lg:h-40 flex-shrink-0 overflow-hidden rounded-lg">
            <img
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
              src={`${product.image}`}
              alt={product.name}
              onClick={() => navigate("/product", { state: { product } })}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center xl:items-start flex-1 gap-4">
            <div className="flex flex-col items-center sm:items-start gap-3">
              <div className="text-xl font-bold">{product.name}</div>
              <Rating value={product.rating} readOnly cancel={false}></Rating>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{product.category}</span>
                </span>
                <Tag
                  value={product.inventoryStatus}
                  severity={getSeverity(product)}
                ></Tag>
              </div>
            </div>
            <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2">
              <span className="text-xl font-semibold">${product.price}</span>
              <Button
                icon="pi pi-shopping-cart"
                className="p-button-rounded"
                disabled={product.inventoryStatus === "OUTOFSTOCK"}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const gridItem = (product, index) => {
    return (
      <motion.div 
        className="p-2 h-full" 
        key={product.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
      >
        <div className="p-4 border-2 border-inherit rounded h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <i className="pi pi-tag"></i>
              <span className="font-semibold">{product.category}</span>
            </div>
            <Tag
              value={product.inventoryStatus}
              severity={getSeverity(product)}
            ></Tag>
          </div>
          <div className="flex flex-col items-center gap-3 py-5">
            <div className="w-full h-64 overflow-hidden rounded-lg">
              <img
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
                src={`${product.image}`}
                alt={product.name}
                onClick={() => navigate("/product", { state: { product } })}
              />
            </div>
            <div className="text-xl font-bold">{product.name}</div>
            <Rating value={product.rating} readOnly cancel={false}></Rating>
          </div>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xl font-semibold">${product.price}</span>
            <Button
              icon="pi pi-shopping-cart"
              className="p-button-rounded hover:scale-110 transition-transform duration-200"
              disabled={product.inventoryStatus === "OUTOFSTOCK"}
              onClick={() => navigate("/product", { state: { product } })}
            ></Button>
          </div>
        </div>
      </motion.div>
    );
  };

  const itemTemplate = (product, layout, index) => {
    if (!product) {
      return;
    }

    if (layout === "list") return listItem(product, index);
    else if (layout === "grid") return gridItem(product, index);
  };

  const listTemplate = (products, layout) => {
    if (products?.length === 0)
      return (
        <div className="flex justify-center text-2xl font-bold pt-10">
          No item found
        </div>
      );
    return (
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-3">
        {products?.map((product, index) =>
          itemTemplate(product, layout, index)
        )}
      </div>
    );
  };

  const header = () => {
    return (
      <div className="grid grid-cols-2">
        <div className="flex justify-start">
          <Dropdown
            options={sortOptions}
            value={sortKey}
            optionLabel="label"
            placeholder="Sort By Price"
            onChange={onSortChange}
          />
        </div>
        <div className="flex justify-end">
          <DataViewLayoutOptions
            layout={layout}
            onChange={(e) => setLayout(e.value)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-5 p-4 gap-2">
      <div className="flex  border col-span-1 justify-center">
        <div className="pt-7 pl-2">
          <span className="p-input-icon-left w-full pr-2">
            <i className="pi pi-search" />
            <InputText
              id="search"
              value={searchItem}
              onChange={handleInputChange}
              placeholder="Type to search"
              className="w-full"
            />
          </span>
          <div className="pt-10 bg-white p-4 shadow-md rounded-lg mt-4">
            <p className="pb-4 font-bold text-lg text-gray-700 border-b mb-4">Filter by Price</p>
            <Slider
              value={value}
              onChange={(e) => handlePriceFilterChange(e.value)}
              className="mt-4 mb-6"
              range
              min={0}
              max={1000}
            />
            <div className="flex justify-between items-center gap-2">
               <div className="flex items-center gap-1">
                  <span className="text-gray-500">$</span>
                  <InputText
                    id="filter_price1"
                    value={value[0]}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-20 text-center"
                  />
               </div>
               <span className="text-gray-400">-</span>
               <div className="flex items-center gap-1">
                  <span className="text-gray-500">$</span>
                  <InputText
                    id="filter_price2"
                    value={value[1]}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-20 text-center"
                  />
               </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-4 p-3 border">
        <DataView
          value={filteredItems}
          listTemplate={listTemplate}
          layout={layout}
          header={header()}
          sortField={sortField}
          sortOrder={sortOrder}
          paginator={filteredItems?.length}
          emptyMessage={true}
          rows={8}
        />
      </div>
    </div>
  );
}
