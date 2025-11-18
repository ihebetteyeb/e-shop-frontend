// import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth.js";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import SigninImg from "../../../assets/1.svg";
// import { useTestQuery } from "../../../store/state/userApiSlice.jsx";
import { useLoginMutation } from "../../../store/state/userApiSlice.jsx";
import { setCredentials } from "../../../store/state/userSlice.jsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  IconBrandGoogle,
  IconBrandMeta,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import signinConfig from "./signin.config.jsx";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, data: dataLogin }] = useLoginMutation();

  const singinSchema = z.object({
    username: z.string().min(4, { message: "* Minimum length is 4" }),
    password: z.string().min(4, { message: "* Password minimum length is 4 " }),
  });
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(singinSchema),
  });

  // console.log(user);

  const handleLogin = (datas) => {
    console.log(datas);
    login(datas);
  };

  useEffect(() => {
    if (dataLogin?.access) {
      dispatch(setCredentials(dataLogin?.access));
    }
  }, [dataLogin]);

  if (isLoading) {
    return <p>isLoading...</p>;
  }
  return (
    <div className="grid grid-cols-2 h-screen w-screen">
      <div className="w-full flex flex-col">
        <div>
          <img
            alt="logo"
            src="src/assets/logo-no-background.png"
            width="90"
            className="mr-2 mt-2"
          />
        </div>
        <div className="flex flex-col gap-[50px] w-full h-full justify-center ">
          <form autoComplete="off" onSubmit={handleSubmit(handleLogin)}>
            <div className="flex flex-col items-center gap-[30px] justify-center">
              <h1 className=" text-[48px] leading-[38px] tracking-[0.27px] font-cal-sans font-bold text-[#91CD32]">
                Sign in to Shopy
              </h1>
              <div className="flex gap-[10px]">
                <Button
                  icon={<IconBrandMeta className="border-black" />}
                  outlined
                  rounded
                  style={{
                    background: "white",
                    borderColor: "#BDBDBD",
                    color: "#000000",
                  }}
                />
                <Button
                  icon={<IconBrandGoogle className="" />}
                  outlined
                  rounded
                  style={{
                    background: "white",
                    borderColor: "#BDBDBD",
                    color: "#000000",
                  }}
                />
                <Button
                  icon={<IconBrandLinkedin className="" />}
                  rounded
                  outlined
                  style={{
                    background: "white",
                    borderColor: "#BDBDBD",
                    color: "#000000",
                  }}
                />
              </div>
              <small className="text-gray-400">
                or use your email account:
              </small>
              <div className="grid gap-[30px] items-stretch">
                <span className="p-float-label">
                  <InputText
                    id="username"
                    aria-describedby="username-help"
                    className=""
                    {...register("username")}
                  />
                  <label htmlFor="username">Username</label>
                  {errors.username && (
                    <span className="block text-red-400">
                      {errors.username.message}
                    </span>
                  )}
                </span>
                <span className="p-float-label">
                  <Password
                    id="password"
                    onChange={(e) => {
                      setValue("password", e.target.value);
                      register("password");
                    }}
                    feedback={false}
                    // {...register("password")}
                  />
                  <label htmlFor="password">Password</label>
                  {errors.password && (
                    <span className="block text-red-400">
                      {errors.password.message}
                    </span>
                  )}
                </span>
              </div>
              <div className="flex flex-col gap-[3px]">
                <small className="font-semibold font-inter">
                  Forgot your password?
                </small>
                <div className="border-[1px]" />
              </div>
              <div>
                <Button
                  type="submit"
                  label="Sign in "
                  className="rounded-full w-[200px] "
                  style={{
                    color: "white",
                    backgroundColor: "#91CD32",
                    borderColor: "#91CD32",
                  }}
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-[30px] h-fill bg-[#DEEBFF]">
        {/* 2<h2>Hello, Friend!</h2> */}
        <img src={SigninImg} className="h-full " />
        {/* <div className="">
          <p>Enter your personal details</p>
          <p>and start your journey with us</p>
        </div> */}
        {/* <Button label="Sign up" className="rounded-full" outlined />{" "} */}
      </div>
    </div>
  );
}

export default Home;
