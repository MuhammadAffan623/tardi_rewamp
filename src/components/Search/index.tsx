import "./searchBtn.css";

interface IProps {
  Onchange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  value: string;
  inputClassName?: string;
  containerClassName?: string;
}
const Search: React.FC<IProps> = ({
  Onchange,
  inputClassName,
  value,
  containerClassName,
}) => {
  return (
    <div
      style={{
        background: `url(/common/RedBox_Button.png)`,
        backgroundRepeat: "no-repeat",
      }}
      className={` search-btn ${containerClassName}`}
    >
      <input
        placeholder="SEARCH..."
        value={value}
        onChange={Onchange}
        className={` cus-input text-[#FFFFFF] text-[24px] font-[700] ${inputClassName}`}
      ></input>
    </div>
  );
};

export default Search;
