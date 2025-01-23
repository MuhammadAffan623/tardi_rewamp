import Shapes from "../Shapes";
import "./shapeButton.css";

import successBG from "../../../public/common/greenbtn.png"
import dangerBG from "../../../public/common/red-btn.png"

interface IProps {
  buttonText?: any;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  isErrorBtn?: boolean;
  btnClassName?: string;
  containerClassName?: string;
}
const ShapeButton: React.FC<IProps> = ({
  buttonText,
  onClick,
  isErrorBtn = false,
  containerClassName,
  btnClassName,
}) => {
  return (
    <Shapes
      bgShapeImg={isErrorBtn ? dangerBG : successBG}
      className={`  ${containerClassName} font-['Source_Code_Pro']  pri-btn`}
    >
      <button
        onClick={onClick}
        className={` btn text-[#FFFFFF] sm:text-2xl lg:text-[30px] font-[800] ${btnClassName}`}
      >
        {buttonText}
      </button>
    </Shapes>
  );
};

export default ShapeButton;
