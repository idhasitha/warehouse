import { FC } from "react";
import ReactSelect, { StylesConfig } from "react-select";
import CN from "classnames";

interface SelectProps {
  value?: any;
  options: any[];
  className?: string;
  onChange?: any;
  placeholder?: string;
  onInputChange?: any;
  isLoading?: boolean;
}

const Select: FC<SelectProps> = ({
  value,
  options,
  className,
  onChange,
  placeholder,
  onInputChange,
  isLoading,
}) => {
  const colourStyles: any = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: "white",
      height: 32,
    }),
    input: (styles: any) => ({ ...styles, height: 20 }),
  };
  
  return (
    <div className={CN("w-full", className)}>
      <ReactSelect
        value={value}
        options={options}
        onChange={onChange}
        placeholder={placeholder}
        styles={colourStyles}
        onInputChange={onInputChange}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Select;
