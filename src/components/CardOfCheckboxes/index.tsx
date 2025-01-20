import React from "react";
import Shapes from "../Shapes";
import Checkbox from "../Checkbox";
import successBG from "../../../public/common/RedBox_Buttoncard.png";
interface CheckboxOption {
  id: string;
  label: string;
  checked: boolean;
}

interface CardOfCheckboxesProps {
  checkboxes: CheckboxOption[];
  onCheckboxChange: (id: string, checked: boolean) => void;
  onButtonClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
}

const CardOfCheckboxes: React.FC<CardOfCheckboxesProps> = ({
  checkboxes,
  onButtonClick,
  onCheckboxChange,
  className,
}) => {
  return (
    <Shapes
      bgShapeImg={successBG}
      className={`w-[420px] sm:w-full  sm:max-w-[400px] min-h-[310px] pl-[65px]  sm:pl-[80px] object-cover ${className}`}
    >
      <div className=" flex flex-col gap-2 items-start mt-10 w-[290px] sm:w-[90%] mx-auto ">
        {checkboxes.map((checkbox) => (
          <Checkbox
            key={checkbox.id}
            id={checkbox.id}
            label={checkbox.label}
            checked={checkbox.checked}
            onChange={(e) => onCheckboxChange(checkbox.id, e.target.checked)}
          />
        ))}
        <button
          onClick={onButtonClick}
          className="w-full flex justify-end text-white font-['Source_Code_Pro'] font-[800] text-[20px] py-2 px-4 "
        >
          [Login]
        </button>
      </div>
    </Shapes>
  );
};

export default CardOfCheckboxes;
