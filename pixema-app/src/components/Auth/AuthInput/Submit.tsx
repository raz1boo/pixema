import { useLocation } from "react-router-dom"; 
import { useAppSelector } from "../../store/hooks/redux";

interface SubmitPrors {
  className: string;
  type: string;
  value: string;
  onClick?:any;
}

const Submit = ({ className, type, value }: SubmitPrors) => {
  const { theme } = useAppSelector((state) => state.themeReducer);
  const location = useLocation();
  return (
    <>
      <input 
      className={className} type={type} value={value} />
    </>
  );
};

export default Submit;
