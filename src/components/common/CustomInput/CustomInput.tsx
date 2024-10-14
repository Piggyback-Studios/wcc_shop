import { InputField } from "@/src/shared/types";

const CustomInput = ({
  name,
  placeholder,
  type,
  onChange,
  forwardRef,
  onBlur,
}: InputField) => {
  if (type === "textarea")
    return (
      <textarea
        className="p-2 border-none border-b-2 border-black bg-primary-500 text-black mb-8 bg-white text-black rounded-lg w-full"
        name={name}
        placeholder={placeholder}
        rows={10}
        onChange={onChange}
        ref={forwardRef}
        onBlur={onBlur}
      />
    );
  else
    return (
      <input
        className="p-2 border-none border-b-2 border-black bg-primary-500 text-black mb-8 bg-white text-black rounded-lg w-full"
        name={name}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        ref={forwardRef}
        onBlur={onBlur}
      />
    );
};

export default CustomInput;
