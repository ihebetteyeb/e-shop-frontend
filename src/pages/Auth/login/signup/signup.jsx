import React, { useState, useEffect, useRef } from "react";
import SigninImg from "@/assets/1.svg";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../../../../store/state/userApiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { z } from "zod";
import { Password } from "primereact/password";
import { InputMask } from "primereact/inputmask";
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';

const countries = [
  { name: "Tunisia", code: "TN" },
  { name: "Germany", code: "DE" },
  { name: "Egypt", code: "EG" },
];

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useRef(null);
  const [Signup, { isLoading, data: dataSignUp, error: errorSignUp }] = useRegisterMutation();

  const signupSchema = z.object({
    username: z.string().min(4, { message: "* Minimum length is 4" }),
    name: z.string().min(4, { message: "* Minimum length is 4" }),
    email: z.string().email({ message: "* Invalid email address" }),
    password: z.string().min(4, { message: "* Password minimum length is 4" }),
    city: z.string().min(1, { message: "* City is required" }),
    phone: z.string().min(1, { message: "* Phone is required" }),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      city: "Tunisia",
    }
  });

  const selectedCity = watch("city");
  const phoneValue = watch("phone");

  const handleSignUp = async (data) => {
    try {
        await Signup(data).unwrap();
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Account created successfully', life: 3000 });
        setTimeout(() => {
            navigate("/sign-in");
        }, 1500);
    } catch (err) {
        console.error("Signup error:", err);
        toast.current.show({ severity: 'error', summary: 'Registration Failed', detail: err.data?.message || 'Something went wrong', life: 5000 });
    }
  };

  return (
    <div className="grid grid-cols-2 h-screen w-screen">
      <Toast ref={toast} />
      <div className="flex flex-col justify-center items-center gap-[30px] h-fill bg-[#DEEBFF]">
        <img src={SigninImg} className="h-full " alt="Sign In" />
      </div>
      <div className="w-full flex flex-col items-center gap-[30px] h-fill overflow-y-auto py-10">
        <div className="flex flex-col gap-[30px] w-full max-w-[400px] justify-center ">
          <form autoComplete="off" onSubmit={handleSubmit(handleSignUp)}>
            <div className="flex flex-col items-center gap-[30px] justify-center">
              <h1 className="text-[48px] leading-[38px] tracking-[0.27px] font-cal-sans font-bold text-[#91CD32]">
                Signup in Shopy
              </h1>
              <div className="grid gap-[20px] w-full">
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="text-gray-500 text-sm">Name</label>
                  <InputText id="name" {...register("name")} className={errors.name ? "p-invalid" : ""} />
                  {errors.name && <small className="text-red-400">{errors.name.message}</small>}
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="username" className="text-gray-500 text-sm">Username</label>
                  <InputText id="username" {...register("username")} className={errors.username ? "p-invalid" : ""} />
                  {errors.username && <small className="text-red-400">{errors.username.message}</small>}
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-gray-500 text-sm">Email</label>
                  <InputText id="email" {...register("email")} className={errors.email ? "p-invalid" : ""} />
                  {errors.email && <small className="text-red-400">{errors.email.message}</small>}
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="password" title="Password" className="text-gray-500 text-sm">Password</label>
                  <Password 
                    id="password" 
                    value={watch("password")}
                    onChange={(e) => setValue("password", e.target.value)} 
                    toggleMask
                    className={errors.password ? "p-invalid w-full" : "w-full"}
                    inputClassName="w-full"
                    feedback={false}
                  />
                  {errors.password && <small className="text-red-400">{errors.password.message}</small>}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-gray-500 text-sm">Country</label>
                  <Dropdown
                    value={selectedCity}
                    onChange={(e) => setValue("city", e.value)}
                    options={countries}
                    optionLabel="name"
                    optionValue="name"
                    placeholder="Select your country"
                    className={errors.city ? "p-invalid w-full" : "w-full"}
                  />
                  {errors.city && <small className="text-red-400">{errors.city.message}</small>}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-gray-500 text-sm">Phone</label>
                  <InputMask
                    value={phoneValue}
                    onChange={(e) => setValue("phone", e.target.value)}
                    mask="(+999) 99-999-999"
                    placeholder="(+216) 99-999-999"
                    className={errors.phone ? "p-invalid w-full" : "w-full"}
                  />
                  {errors.phone && <small className="text-red-400">{errors.phone.message}</small>}
                </div>
              </div>

              <div className="flex justify-center w-full pt-4">
                <Button
                  label={isLoading ? "Registering..." : "Register"}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#91CD32] border-none hover:bg-[#81b82d]"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
