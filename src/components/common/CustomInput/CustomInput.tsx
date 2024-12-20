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
      className={`w-full flex mb-8 ${
        type !== "checkbox" ? "flex-col border-b-2 border-dark" : "flex-row"
      }`}
    >
      <label className={`${type !== "checkbox" && "mb-2"}`} htmlFor={name}>
        {label}
      </label>
      {type === "textarea" && (
        <textarea
          className="p-2 w-full"
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
          className="p-2 w-full"
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
          className={`p-2 ${type !== "checkbox" ? "w-full" : " ml-2"}`}
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
