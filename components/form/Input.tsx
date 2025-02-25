export default function Input({
  type,
  placeholder,
  name,
  register,
  errors,
  rules,
  label,
  className,
  labelClassName,
  disabled = false,
  labelDisabled = false,
  onClick,
  onChange,
  ...rest
}: {
  type: string;
  placeholder: string;
  name: string;
  register: any;
  errors: any;
  rules?: any;
  className?: string;
  label?: string;
  labelClassName?: string;
  disabled?: boolean;
  labelDisabled?: boolean;
  onClick?: () => void;
  onChange?: Function;
}) {
  return (
    <div>
      {label && (
        <label
          className={` text-xs md:text-base ${labelDisabled ? "hidden md:block" : ""
            }`}
        >
          {label} {rules?.required && <span className="text-red-600">*</span>}

        </label>
      )}
      <input
        onClick={onClick}
        onChange={(e) => {
          if (onChange){
              console.log("inside imput")
            onChange(e)
          
          };
        }}

        type={type}
        placeholder={placeholder}
        className={`${errors[name] && "input-invalid"} ${className}`}
        disabled={disabled}
        {...register(name, rules)}
        {...rest}
      />
      {errors[name] && (
        <small className="mt-1.5 text-red-600 block">
          {errors[name].message || "This field is required"}
        </small>
      )}
    </div>
  );
}
