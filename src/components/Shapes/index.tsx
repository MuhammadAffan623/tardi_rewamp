import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  bgShapeImg: string;
  className?: string;
}
const Shapes: React.FC<IProps> = ({ children, bgShapeImg, className }) => {
  return (
    <div
      style={{
        background: `url(${bgShapeImg})`,
        backgroundRepeat: "no-repeat",
      }}
      className={`   flex items-center justify-between ${className} `}
    >
      {children}
    </div>
  );
};

export default Shapes;
