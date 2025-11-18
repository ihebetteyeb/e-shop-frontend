import React from "react";
import { Card } from "primereact/card";

export default function SideBar({ changeChildren }) {
  return (
    <div className="h-full">
      <Card className="h-full w-11/12">
        <div className="text-base font-bold pb-2"> Home </div>
        <button class="pi pi-home text-gray-500 pl-5">
          <span
            class="pl-2 inline-block font-medium text-sm text-gray-500"
            onClick={() => {
              changeChildren("dash");
            }}
          >
            Dashboard
          </span>
        </button>
        <div className="flex flex-col items-start text-base font-bold pt-4">
          <div className="pb-2">Navigation</div>
          <button
            class="pi pi-shopping-cart text-gray-500 pb-2 pl-5"
            onClick={() => {
              changeChildren("products");
            }}
          >
            <span class="pl-2 inline-block font-medium text-sm text-gray-500">
              Products
            </span>
          </button>
          <button
            class="pi pi-users text-gray-500 pb-2 pl-5"
            onClick={() => {
              changeChildren("users");
            }}
          >
            <span class="pl-2 inline-block font-medium text-sm text-gray-500">
              Users
            </span>
          </button>
          <button class="pi pi-inbox text-gray-500 pb-2 pl-5">
            <span class="pl-2 inline-block font-medium text-sm text-gray-500">
              Messages
            </span>
          </button>
          <button class="pi pi-cog text-gray-500 pb-2 pl-5">
            <span class="pl-2 inline-block font-medium text-sm text-gray-500">
              Settings
            </span>
          </button>
        </div>
      </Card>
    </div>
  );
}
