import React, { useRef, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Password } from "primereact/password";
import "./login.css";
import { useLoginMutation } from "../../store/state/userApiSlice";
import { useDispatch } from "react-redux";

export default function Login() {
  const [useLogin, { isLoading, isError, error, data }] = useLoginMutation();
  const toast = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("hook effect");
    if (data?.data) {
      dispatch(setCredentials(data.data));
    }
  }, [data]);

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
    <div className="flex justify-center p-20">
      <Card title="Login" className="w-2/6">
        <div className="grid flex justify-center grid-col-2 gap-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-3 col-span-2">
              <Toast ref={toast} />
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
                        size={"30"}
                        className={classNames({
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
            </div>
            <div className="p-3 col-span-2">
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
                        size={"30"}
                        feedback={false}
                        className={classNames({
                          "p-invalid": fieldState.error,
                        })}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      <label htmlFor={field.name}>Password</label>
                    </span>
                    {getFormErrorMessage(field.name)}
                  </>
                )}
              />
            </div>
            <div className="flex justify-center col-span-2 pt-2">
              <Button label="Login" type="submit" />
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
