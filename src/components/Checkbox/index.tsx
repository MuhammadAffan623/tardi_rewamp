import React from "react";
import "./checkbox.css";
interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center ">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className=" custom-checkbox "
      />
      <label
        htmlFor={id}
        className="ml-2 text-[16px] font-[700] font-['Source_Code_Pro'] text-[#FFFFFF]"
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
