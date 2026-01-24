import React from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import GlobalLayout from "../../components/Layouts/GlobalLayout";

const Contact = () => {
  return (
    <GlobalLayout>
      <div className="flex justify-center items-center min-h-screen pt-24 pb-12 bg-gray-50">
        <Card title="Contact Us" className="w-full max-w-2xl shadow-lg">
          <p className="m-0 mb-6 text-gray-600">
            We'd love to hear from you! Please fill out the form below and we will get back to you as soon as possible.
          </p>
          <form className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-medium text-gray-700">Name</label>
              <InputText id="name" placeholder="Your Name" className="w-full" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-medium text-gray-700">Email</label>
              <InputText id="email" type="email" placeholder="Your Email" className="w-full" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-medium text-gray-700">Message</label>
              <InputTextarea id="message" rows={5} placeholder="Your Message" className="w-full" autoResize />
            </div>
            <div className="flex justify-end pt-4">
              <Button label="Send Message" icon="pi pi-send" className="w-full sm:w-auto" />
            </div>
          </form>
        </Card>
      </div>
    </GlobalLayout>
  );
};

export default Contact;
