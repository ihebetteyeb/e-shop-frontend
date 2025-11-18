import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Password } from "primereact/password";
import "./login.css";
import { useRegisterMutation } from "../../store/state/userApiSlice";
export default function Register() {
  const toast = useRef(null);
  const [useRegister, { isLoading, isError, error, data }] =
    useRegisterMutation();

  const defaultValues = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    console.log(data);
    useRegister(data);
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
    <div className="flex justify-center p-20">
      <Card title="Register" className="w-2/6">
        <div className=" flex justify-center card">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Toast ref={toast} />
            <Controller
              name="firstname"
              control={control}
              rules={{ required: "First name is required." }}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor={field.name}
                    className={classNames({
                      "p-error": fieldState.error,
                    })}
                  ></label>
                  <span className="p-float-label">
                    <InputText
                      id={field.name}
                      value={field.value}
                      size={"40"}
                      className={classNames({
                        "p-invalid": fieldState.error,
                      })}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    <label htmlFor={field.name}>First name *</label>
                  </span>
                  {getFormErrorMessage(field.name)}
                </>
              )}
            />
            <Toast ref={toast} />
            <Controller
              name="lastname"
              control={control}
              rules={{ required: "Last name is required." }}
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
                      size={"40"}
                      className={classNames({
                        "p-invalid": fieldState.error,
                      })}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    <label htmlFor={field.name}>Last name *</label>
                  </span>
                  {getFormErrorMessage(field.name)}
                </>
              )}
            />
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
                      size={"40"}
                      className={classNames({
                        "p-invalid": fieldState.error,
                      })}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    <label htmlFor={field.name}>Username *</label>
                  </span>
                  {getFormErrorMessage(field.name)}
                </>
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is required." }}
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
                      size={"40"}
                      keyfilter={"email"}
                      className={classNames({
                        "p-invalid": fieldState.error,
                      })}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    <label htmlFor={field.name}>Email *</label>
                  </span>
                  {getFormErrorMessage(field.name)}
                </>
              )}
            />
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
                      size={"40"}
                      feedback={true}
                      className={classNames({
                        "p-invalid": fieldState.error,
                      })}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    <label htmlFor={field.name}>Password *</label>
                  </span>
                  {getFormErrorMessage(field.name)}
                </>
              )}
            />
            <div className="flex justify-center col-span-2 pt-2">
              <Button label="Sign Up" type="submit" />
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
