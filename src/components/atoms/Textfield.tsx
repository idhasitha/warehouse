import { FC } from "react";

interface TextfieldProps {
  [x: string]: any;
  onChange?: any;
  placeholder?: string;
  type?: string;
  value?: any;
  title?: string;
  max?: number;
  min?: number
  maxLength?: number
}

const Textfield: FC<TextfieldProps> = ({
  onChange,
  placeholder,
  type,
  value,
  title,
  max,
  min,
  maxLength
}) => {
  return (
    <div className="flex w-full flex-col ">
      {title && <span className="text-xs text-gray-500">{title}</span>}
      <input
        className="focus:shadow-outline h-[32px] w-full appearance-none rounded border px-3 leading-tight text-gray-700 shadow focus:outline-none placeholder-slate-400"
        id="username"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        max={max}
        min={min}
        maxLength={maxLength}
      ></input>
    </div>
  );
};

Textfield.defaultProps = {
  type: "text",
  placeholder: "",
  value: "",
};

export default Textfield;
