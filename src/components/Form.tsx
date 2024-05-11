"use client";
import {
  formDataType,
  formSchema,
  responseDataType,
  responseSchema,
} from "@/zodschema/zodschemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const inputs: {
  name: "email" | "name" | "phone" | "password" | "confirmPassword" | "age";
  type: "string" | "password" | "number";
}[] = [
  {
    name: "name",
    type: "string",
  },
  {
    name: "phone",
    type: "number",
  },
  {
    name: "email",
    type: "string",
  },
  {
    name: "password",
    type: "password",
  },
  {
    name: "confirmPassword",
    type: "password",
  },
  {
    name: "age",
    type: "number",
  },
];
export function Form() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitSuccessful, isSubmitting, isValid },
  } = useForm<formDataType>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: formDataType) => {
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const responseData = await response.json();
    const validResponseData = responseSchema.safeParse(responseData);
    if (!validResponseData.success) return;

    console.log(validResponseData.data.errors);
    if (validResponseData.data.errors) {
      const errors = responseData.errors;
      if (errors.email) {
        setError("email", {
          type: "server",
          message: errors.email,
        });
      } else if (errors.password) {
        setError("password", {
          type: "server",
          message: errors.password,
        });
      } else if (errors.confirmPassword) {
        setError("confirmPassword", {
          type: "server",
          message: errors.confirmPassword,
        });
      } else {
        alert("Something went wrong!");
      }
      // reset();
      console.log(data);
    }

    if (validResponseData.data.success) {
      toast.success(`Thanks for Register ${responseData.data.name}`);
    }
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-8 bg-gray-100 rounded-2xl shadow-xl flex flex-col gap-4 items-start justify-center"
    >
      {inputs.map((input, index) => {
        const inputName:
          | "email"
          | "name"
          | "phone"
          | "password"
          | "confirmPassword"
          | "age" = input.name;
        return (
          <div key={index} className="flex gap-1 flex-col items-start">
            <label htmlFor={input.name}>
              Enter {input.name}
              {errors[inputName] && <span className="text-red-600">*</span>}
            </label>
            <input
              className={`bg-gray-50 px-6 py-2 rounded-md shadow-lg outline-none focus:ring-1  ${
                errors[inputName]
                  ? "focus:ring-red-600 ring-1 ring-red-600"
                  : "focus:ring-blue-600"
              }${isSubmitting ? " opacity-50" : ""}`}
              {...register(inputName)}
              type={input.type}
              id={inputName}
              disabled={isSubmitting}
            />
            <span className="text-sm text-red-600">
              {errors[inputName]?.message && `${errors[inputName]?.message}`}
            </span>
          </div>
        );
      })}
      <div className="w-full">
        <button
          disabled={!isValid || isSubmitting}
          className={` text-white font-semibold w-full py-3 rounded-xl ${
            !isSubmitting && isValid
              ? "bg-blue-500 cursor-pointer"
              : "bg-gray-600 cursor-not-allowed"
          } `}
          type="submit"
        >
          {isSubmitting ? "......" : "Submit"}
        </button>
      </div>
      {isSubmitSuccessful && (
        <span className="text-sm bg-green-600/60 p-2 w-full text-white rounded-md text-center">
          your form Successfully submitted
        </span>
      )}
    </form>
  );
}
