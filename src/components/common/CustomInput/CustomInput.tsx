import { InputField } from "@/src/shared/types";

const CustomInput = ({
  name,
  placeholder,
  type,
  onChange,
  forwardRef,
  onBlur,
  label,
  ...rest
}: InputField) => {
  return (
    <div
      className={`w-full flex ${
        type !== "checkbox" ? "flex-col" : "flex-row mb-8"
      }`}
    >
      <label htmlFor={name}>{label}</label>
      {type === "textarea" && (
        <textarea
          className="p-2 border-none border-b-2 border-black mb-8 w-full"
          name={name}
          placeholder={placeholder}
          rows={10}
          onChange={onChange}
          ref={forwardRef}
          onBlur={onBlur}
          {...rest}
        />
      )}
      {type === "decimal" && (
        <input
          className="p-2 border-none border-b-2 border-black mb-8 w-full"
          name={name}
          placeholder={placeholder}
          type="number"
          step="0.01"
          onChange={onChange}
          ref={forwardRef}
          onBlur={onBlur}
          {...rest}
        />
      )}
      {type !== "textarea" && type !== "decimal" && (
        <input
          className={`p-2 border-none border-b-2 border-black ${
            type !== "checkbox" ? "mb-8 w-full" : " ml-2"
          }`}
          name={name}
          placeholder={placeholder}
          type={type}
          onChange={onChange}
          ref={forwardRef}
          onBlur={onBlur}
          {...rest}
        />
      )}
    </div>
  );
};

export default CustomInput;
