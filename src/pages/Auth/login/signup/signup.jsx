import React, { useState, useEffect } from "react";
import SigninImg from "@/assets/1.svg";
// import SigninImg from "../../../assets/1.svg";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../../../../store/state/userApiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { z } from "zod";
import { Password } from "primereact/password";
import { InputMask } from "primereact/inputmask";
import { Button } from "primereact/button";

const cities = [
  { name: "Tunisia", code: "TN" },
  { name: "Germany", code: "AL" },
  { name: "Egypt", code: "EG" },
  // Other city objects...
];

export default function SignUp() {
  const dispatch = useDispatch();
  const [Signup, { isLoading, data: dataSignUp }] = useRegisterMutation();
  const handleSignUp = (data) => {
    Signup(data);
  };
  const signupSchema = z.object({
    username: z.string().min(4, { message: "* Minimum length is 4" }),
    name: z.string().min(4, { name: "* Minimum length is 4" }),
    email: z.string().min(4, { email: "* Minimum length is 4" }),
    password: z.string().min(4, { message: "* Password minimum length is 4 " }),
    city: z.string(),
    phone: z.string(),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const [selectedCity, setSelectedCity] = useState("Tunisia");
  const [phone, setPhone] = useState();

  useEffect(() => {
    if (dataSignUp) {
      console.log("i did signup");

      console.log(dataSignUp);
    }
  }, [dataSignUp]);

  if (isLoading) {
    return <p>isLoading...</p>;
  }

  return (
    <div className="grid grid-cols-2 h-screen w-screen">
      <div className="flex flex-col justify-center items-center gap-[30px] h-fill bg-[#DEEBFF]">
        <img src={SigninImg} className="h-full " />
      </div>
      <div className="w-full flex flex-col w-full items-center gap-[30px] h-fill ">
        <div className="w-full flex justify-center">
          <img
            alt="logo"
            src="src/assets/logo-no-background.png"
            width="90"
            className="mr-2 mt-2"
          />
        </div>
        <div>
          <div className="flex flex-col gap-[50px] w-full h-full justify-center ">
            <form autoComplete="off" onSubmit={handleSubmit(handleSignUp)}>
              <div className="flex flex-col items-center gap-[30px] justify-center">
                <h1 className=" text-[48px] leading-[38px] tracking-[0.27px] font-cal-sans font-bold text-[#91CD32]">
                  Signup in Shopy
                </h1>
                <div className="grid gap-[30px] items-stretch">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-gray-500">
                      Name
                    </label>
                    <InputText
                      id="name"
                      aria-describedby="username-help"
                      {...register("name")}
                    />
                    {errors.name && (
                      <span className="block text-red-400">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="username" className="text-gray-500">
                      Username
                    </label>
                    <InputText
                      id="username"
                      aria-describedby="username-help"
                      {...register("username")}
                    />
                    {errors.username && (
                      <span className="block text-red-400">
                        {errors.username.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="emmail" className="text-gray-500">
                      Email
                    </label>
                    <InputText
                      id="email"
                      aria-describedby="userEmail-help"
                      {...register("email")}
                    />
                    {errors.email && (
                      <span className="block text-red-400">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <span className="p-float-label">
                    <Password
                      id="password"
                      aria-describedby="username-help"
                      className=""
                      onChange={(e) => {
                        setValue("password", e.target.value);
                        register("password");
                      }}
                      feedback={false}
                    />
                    <label htmlFor="password">Password</label>
                    {errors.password && (
                      <span className="block text-red-400">
                        {errors.password.message}
                      </span>
                    )}
                  </span>
                  <Dropdown
                    value={selectedCity}
                    onChange={(e) => {
                      setSelectedCity(e.value);
                      setValue("city", e.target.value);
                    }}
                    options={cities}
                    optionLabel="name"
                    placeholder="Select your country"
                    className="w-full "
                  />
                  <InputMask
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setValue("phone", e.target.value);
                    }}
                    mask="(+999) 99-999-999 "
                    placeholder="(+216) 97-024-301"
                  />
                </div>
                <div className="flex justify-center  w-full ">
                  <Button
                    label="Register"
                    type="submit"
                    className="w-[180px]"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
