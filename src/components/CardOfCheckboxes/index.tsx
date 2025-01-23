import React from "react";
import Shapes from "../Shapes";
import Checkbox from "../Checkbox";
import successBG from "../../../public/common/RedBox_Buttoncard.png";
import dangerBG from "../../../public/common/errorCardd.png";
interface CheckboxOption {
  id: string;
  label: string;
  checked: boolean;
}

interface CardOfCheckboxesProps {
  checkboxes: CheckboxOption[];
  onCheckboxChange: (id: string, checked: boolean) => void;
  onButtonClick: () => void;
  className?: string;
  setIsError: (item: string) => void
  isError: string | null
}

const CardOfCheckboxes: React.FC<CardOfCheckboxesProps> = ({
  checkboxes,
  onButtonClick,
  onCheckboxChange,
  className,
  setIsError,
  isError
}) => {
  console.log({ isError })
  return (
    <Shapes
      bgShapeImg={isError ? dangerBG : successBG}
      className={`object-cover custom-size sm:!bg-cover sm:w-full  sm:max-w-[400px] min-h-[310px] ${isError ? 'pl-[40px]' : 'pl-[65px]'} ${isError ? 'sm:pl-[60px]' : 'sm:pl-[80px]'} ${className}`}
    >
      <div className={`flex flex-col ${isError ? 'gap-8 mt-[75px]' : 'gap-2 mt-10'} items-start w-[290px] sm:w-[90%] mx-auto `}>
        <>{
          !isError ?
            (
              checkboxes.map((checkbox) => (
                <Checkbox
                  key={checkbox.id}
                  id={checkbox.id}
                  label={checkbox.label}
                  checked={checkbox.checked}
                  onChange={(e) => onCheckboxChange(checkbox.id, e.target.checked)}
                />)
              ))
            :
            <span className="text-lg sm:text-[20px] font-extrabold text-white uppercase">{isError}</span>
        }
        </>
        <button
          onClick={() => {
            isError ? setIsError(null) : onButtonClick()
          }}
          className="w-full flex justify-end uppercase text-white font-['Source_Code_Pro'] font-[800] text-[20px] py-2 px-4 "
        >
          {isError ? '[Retry]' : '[Login]'}
        </button>
      </div>
    </Shapes>
  );
};

export default CardOfCheckboxes;
