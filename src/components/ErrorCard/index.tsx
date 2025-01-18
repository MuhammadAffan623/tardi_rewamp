import Shapes from "../Shapes";
import dangerBG from "../../../public/common/errorCardd.png";
interface IProps {
  errorMsg?: string;
  buttonText?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
}
const ErrorCard: React.FC<IProps> = ({
  buttonText,
  errorMsg,
  onClick,
  className,
}) => {
  return (
    <Shapes
      bgShapeImg={dangerBG}
      className={`max-w-[400px] h-[300px] pl-[90px] ${className}`}
    >
      <div className="space-y-4 flex flex-col items-start  w-[90%] mx-auto">
        {errorMsg && (
          <p className="text-white font-extrabold text-lg mt-[70px] ">
            {errorMsg}
          </p>
        )}
        {buttonText && (
          <button
            onClick={onClick}
            className="w-full flex justify-end text-white font-extrabold text-lg py-2 px-4"
          >
            {buttonText}
          </button>
        )}
      </div>
    </Shapes>
  );
};

export default ErrorCard;
