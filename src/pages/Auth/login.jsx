import React, { useRef, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Password } from "primereact/password";
import "./login.css";
import { useLoginMutation } from "../../store/state/userApiSlice";
import { setCredentials } from "../../store/state/userSlice";
import { useDispatch } from "react-redux";
import logo from "../../assets/shopy-logo.svg";

export default function Login() {
  const [useLogin, { isLoading, isError, error, data }] = useLoginMutation();
  const toast = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("hook effect");
    if (data?.data) {
      dispatch(setCredentials(data.data));
      // Navigate to home page after successful login
      navigate("/home");
    }
  }, [data, dispatch, navigate]);

  const defaultValues = {
    username: "",
    password: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    const res = await useLogin(data).unwrap();
    console.log(res);
    reset();
  };

  const getFormErrorMessage = (name) => {
    return errors[name] ? (
      <small className="p-error">{errors[name].message}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <div className="flex flex-col items-center gap-2">
            <img src={logo} alt="Shopy Logo" className="h-16 w-16" />
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-500 text-sm">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex flex-col gap-6">
              <Toast ref={toast} />
              
              {/* Username Field */}
              <Controller
                name="username"
                control={control}
                rules={{ required: "Username is required." }}
                render={({ field, fieldState }) => (
                  <>
                    <label
                      htmlFor={field.name}
                      className={classNames({
                        "p-error": errors.value,
                      })}
                    ></label>
                    <span className="p-float-label">
                      <InputText
                        id={field.name}
                        value={field.value}
                        className={classNames("w-full", {
                          "p-invalid": fieldState.error,
                        })}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      <label htmlFor={field.name}>Username</label>
                    </span>
                    {getFormErrorMessage(field.name)}
                  </>
                )}
              />

              {/* Password Field */}
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field, fieldState }) => (
                  <>
                    <label
                      htmlFor={field.name}
                      className={classNames({
                        "p-error": errors.value,
                      })}
                    ></label>
                    <span className="p-float-label">
                      <Password
                        id={field.name}
                        value={field.value}
                        feedback={false}
                        className={classNames("w-full", {
                          "p-invalid": fieldState.error,
                        })}
                        onChange={(e) => field.onChange(e.target.value)}
                        toggleMask
                      />
                      <label htmlFor={field.name}>Password</label>
                    </span>
                    {getFormErrorMessage(field.name)}
                  </>
                )}
              />

              {/* Buttons */}
              <div className="flex flex-col gap-3 pt-4">
                <Button 
                  label="Sign In" 
                  type="submit" 
                  className="w-full"
                  loading={isLoading}
                />
                <div className="text-center">
                  <span className="text-gray-600 text-sm">Don't have an account? </span>
                  <Button
                    label="Sign Up"
                    type="button"
                    className="p-button-text p-button-sm"
                    onClick={() => navigate("/register")}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
