interface IProps {
  text: string;
  className?: string;
}
const Heading: React.FC<IProps> = ({ text, className }) => {
  return (
    <h1
      className={` text-center font-bold text-[#fff] sm:text-[40px] sm:leading-[52.71px] md:text-[45px] text-[30px] lg:text-[50px] ${className} `}
    >
      {text}
    </h1>
  );
};

export default Heading;
