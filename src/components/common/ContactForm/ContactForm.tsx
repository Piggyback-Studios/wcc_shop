"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import CustomInput from "@/src/components/common/CustomInput";
import CustomButton from "@/src/components/common/CustomButton";

import {
  ContactFormFieldNamesType,
  ContactFormProps,
  ContactFormType,
} from "@/src/shared/data/types";
import { useState } from "react";

const ContactForm = ({
  fields,
  title,
  submitLabel,
  alignment,
}: ContactFormProps) => {
  const { handleSubmit, register, reset } = useForm<ContactFormType>();
  const [buttonDisabled, setButtonDisabled] = useState<boolean>();
  const [submitLabelValue, setSubmitLabelValue] = useState<string>(submitLabel);

  const handleAlignment = () => {
    switch (alignment) {
      case "left":
        return "justify-items-start";
      case "center":
        return "justify-items-center";
      case "right":
        return "justify-items-end";
      default:
        return "justify-items-start";
    }
  };

  const onSubmit: SubmitHandler<ContactFormType> = async (data) => {
    setButtonDisabled(true);
    setSubmitLabelValue("Submitting...");
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        ...data,
      }),
    });
    try {
      const resJson = await res.json();
      console.log(resJson.status);
      if (resJson.status === 200) {
        reset();
        setSubmitLabelValue("Success!");
      } else setSubmitLabelValue("Please try again...");
    } catch (err) {
      console.log({ err });
      setSubmitLabelValue("Please try again...");
    }
    setButtonDisabled(false);
  };

  const { ref: nameForwardRef } = register(
    fields[0].name as ContactFormFieldNamesType
  );

  const { ref: emailForwardRef } = register(
    fields[1].name as ContactFormFieldNamesType
  );

  return (
    <form
      className={`${handleAlignment()} relative grid bg-primary-500 px-14 py-16 rounded-lg`}
      onSubmit={handleSubmit(onSubmit)}
    >
      {title && <h2 className="absolute top-0 -translate-y-3/4">{title}</h2>}
      <div className="grid w-full md:grid-cols-2 md:gap-8">
        <CustomInput
          {...fields[0]}
          {...register(fields[0].name as ContactFormFieldNamesType)}
          forwardRef={nameForwardRef}
        />
        <CustomInput
          {...fields[1]}
          {...register(fields[1].name as ContactFormFieldNamesType)}
          forwardRef={emailForwardRef}
        />
      </div>
      {fields.slice(2).map((field, idx) => {
        const { ref } = register(field.name as ContactFormFieldNamesType);
        return (
          <CustomInput
            key={idx}
            {...field}
            {...register(field.name as ContactFormFieldNamesType)}
            forwardRef={ref}
          />
        );
      })}
      <CustomButton
        type="submit"
        label={submitLabelValue}
        disabled={buttonDisabled}
      />
    </form>
  );
};

export default ContactForm;
