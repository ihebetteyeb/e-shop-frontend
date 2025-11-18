import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { Avatar } from "primereact/avatar";
import "./reviews.css";

export default function Review() {
  const footer = (
    <>
      <div className="flex justify-center">
        <Button label="Shop now" icon="pi pi-arrow-right" iconPos="right" />
      </div>
    </>
  );
  const footer2 = (
    <>
      <div className="flex justify-center items-center">
        <Avatar
          image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png"
          size="large"
          shape="circle"
        />
        <p className="pl-2">Iheb etteyeb</p>
      </div>
    </>
  );
  const footer1 = (
    <>
      <div className="flex justify-center items-center">
        <Avatar
          image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
          size="large"
          shape="circle"
        />
        <p className="pl-2">Salma Nebli</p>
      </div>
    </>
  );

  return (
    <div className="flex flex-col justify-center items-center p-8">
      <h1 className="text-3xl font-bold  pb-5">Customers Reviews</h1>
      <img src="src/assets/logo-leaf-new.png" className="pb-16 pt-5" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center w-full max-w-6xl">
        <Card footer={footer2}>
          <Rating
            value={4}
            readOnly
            cancel={false}
            className="flex pb-10 justify-center"
          />
          <p className="pb-5">
            Good quality, fast delivery, I recommend this website.
          </p>
        </Card>
        <Card title="Brand new Fashion" footer={footer} id="ads">
          <p>We bring the last fashion for you.</p>
        </Card>

        <Card footer={footer1}>
          <Rating
            value={4}
            readOnly
            cancel={false}
            className="flex pb-10 justify-center"
          />
          <p className="pb-5">
            a very good website, I recommend it to everyone.
          </p>
        </Card>
      </div>
    </div>
  );
}
