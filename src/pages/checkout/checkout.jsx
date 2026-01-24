import React from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { classNames } from "primereact/utils";
import { useSelector } from "react-redux";
import { useCartQuery } from "../../store/state/userApiSlice";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const { data: cartItems = [] } = useCartQuery(user?.id, { skip: !token || !user?.id });
  
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = item.item || item;
      return total + (product.price * (item.quantity || 1));
    }, 0);
  };

  const onSubmit = (data) => {
    console.log("Order placed:", { ...data, cartItems, total: calculateTotal() });
    alert("Order placed successfully! (This is a demo)");
    navigate("/home");
  };

  const getFormErrorMessage = (name) => {
    return errors[name] ? (
      <small className="p-error block mt-1">{errors[name].message}</small>
    ) : null;
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-2xl font-bold text-gray-700">Your cart is empty</h2>
        <Button label="Go Shopping" onClick={() => navigate("/groceries")} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Form */}
        <div className="lg:col-span-2">
          <Card title="Shipping Information" className="shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="firstName" className="mb-2 font-medium text-gray-700">First Name</label>
                  <Controller
                    name="firstName"
                    control={control}
                    rules={{ required: "First name is required" }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        className={classNames({ "p-invalid": fieldState.error })}
                      />
                    )}
                  />
                  {getFormErrorMessage("firstName")}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="lastName" className="mb-2 font-medium text-gray-700">Last Name</label>
                  <Controller
                    name="lastName"
                    control={control}
                    rules={{ required: "Last name is required" }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        className={classNames({ "p-invalid": fieldState.error })}
                      />
                    )}
                  />
                  {getFormErrorMessage("lastName")}
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="mb-2 font-medium text-gray-700">Email</label>
                <Controller
                  name="email"
                  control={control}
                  rules={{ 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address"
                    }
                  }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      className={classNames({ "p-invalid": fieldState.error })}
                    />
                  )}
                />
                {getFormErrorMessage("email")}
              </div>

              <div className="flex flex-col">
                <label htmlFor="address" className="mb-2 font-medium text-gray-700">Address</label>
                <Controller
                  name="address"
                  control={control}
                  rules={{ required: "Address is required" }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      className={classNames({ "p-invalid": fieldState.error })}
                    />
                  )}
                />
                {getFormErrorMessage("address")}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="city" className="mb-2 font-medium text-gray-700">City</label>
                  <Controller
                    name="city"
                    control={control}
                    rules={{ required: "City is required" }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        className={classNames({ "p-invalid": fieldState.error })}
                      />
                    )}
                  />
                  {getFormErrorMessage("city")}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="country" className="mb-2 font-medium text-gray-700">Country</label>
                  <Controller
                    name="country"
                    control={control}
                    rules={{ required: "Country is required" }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        className={classNames({ "p-invalid": fieldState.error })}
                      />
                    )}
                  />
                  {getFormErrorMessage("country")}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="zipCode" className="mb-2 font-medium text-gray-700">Zip Code</label>
                  <Controller
                    name="zipCode"
                    control={control}
                    rules={{ required: "Zip Code is required" }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        className={classNames({ "p-invalid": fieldState.error })}
                      />
                    )}
                  />
                  {getFormErrorMessage("zipCode")}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button label="Place Order" type="submit" size="large" className="w-full md:w-auto" />
              </div>
            </form>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card title="Order Summary" className="shadow-lg h-fit sticky top-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2">
                {cartItems.map((cartItem, index) => {
                  const item = cartItem.item || cartItem;
                  return (
                    <div key={index} className="flex gap-3 items-center border-b border-gray-100 pb-3">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.name}</p>
                        <p className="text-sm text-gray-500">{cartItem.quantity || 1} x ${item.price}</p>
                      </div>
                      <p className="font-semibold">${(item.price * (cartItem.quantity || 1)).toFixed(2)}</p>
                    </div>
                  );
                })}
              </div>
              
              <div className="border-t pt-4 mt-2">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
