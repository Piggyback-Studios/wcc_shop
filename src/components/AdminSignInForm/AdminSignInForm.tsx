"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import { SignInFormType } from "@/src/shared/types";
import CustomInput from "@/src/components/common/CustomInput";
import CustomButton from "@/src/components/common/CustomButton";
import { useRouter } from "next/navigation";

const AdminSignInForm = () => {
  const { handleSubmit, register } = useForm<SignInFormType>();
  const router = useRouter();

  const onSubmit: SubmitHandler<SignInFormType> = async (values) => {
    const { email, password } = values;
    const res = await fetch("/api/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const { session, ...rest } = await res.json();
    if (session) router.push("/admin/products");
    else console.log({ session, ...rest });
  };

  const { ref: emailRef, ...emailRest } = register("email");
  const { ref: passwordRef, ...passwordRest } = register("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        placeholder="jsmith@email.com"
        type="email"
        label="email"
        {...emailRest}
        forwardRef={emailRef}
      />
      <CustomInput
        placeholder="123456"
        type="password"
        label="password"
        {...passwordRest}
        forwardRef={passwordRef}
      />
      <CustomButton type="submit" label="Sign In" />
    </form>
  );
};

export default AdminSignInForm;
